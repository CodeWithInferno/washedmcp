#!/bin/bash
# WashedMCP Setup for Claude Code
# Usage: curl -fsSL https://raw.githubusercontent.com/clarsbyte/washedmcp/main/setup-claude.sh | bash

echo "═══════════════════════════════════════════════════════"
echo "       WashedMCP Setup for Claude Code"
echo "═══════════════════════════════════════════════════════"
echo ""

# Detect OS
OS="unknown"
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ -f /etc/os-release ]]; then
    . /etc/os-release
    OS="$ID"
fi

echo "Detected OS: $OS"

# Find suitable Python (3.10-3.13)
find_python() {
    for py in python3.12 python3.11 python3.10 python3.13 python3; do
        if command -v $py &> /dev/null; then
            version=$($py -c 'import sys; print(sys.version_info.minor)' 2>/dev/null || echo "0")
            if [ "$version" -ge 10 ] && [ "$version" -lt 14 ]; then
                echo $py
                return 0
            fi
        fi
    done
    return 1
}

# Install Python automatically based on OS
install_python() {
    echo ""
    echo "Installing Python 3.12..."
    echo ""

    case "$OS" in
        macos)
            if command -v brew &> /dev/null; then
                brew install python@3.12
            else
                echo "ERROR: Homebrew not found."
                echo ""
                echo "Install Homebrew first:"
                echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
                echo ""
                echo "Then run this script again."
                exit 1
            fi
            ;;
        ubuntu|debian|pop|linuxmint)
            echo "Adding deadsnakes PPA for Python 3.12..."
            sudo apt-get update -qq
            sudo apt-get install -y software-properties-common
            sudo add-apt-repository -y ppa:deadsnakes/ppa
            sudo apt-get update -qq
            sudo apt-get install -y python3.12 python3.12-venv python3.12-distutils curl
            echo "Installing pip for Python 3.12..."
            curl -sS https://bootstrap.pypa.io/get-pip.py | sudo python3.12
            ;;
        fedora)
            sudo dnf install -y python3.12 python3.12-pip
            ;;
        rhel|centos|rocky|almalinux)
            sudo dnf install -y epel-release
            sudo dnf install -y python3.12 python3.12-pip
            ;;
        arch|manjaro|endeavouros)
            sudo pacman -Sy --noconfirm python python-pip
            ;;
        opensuse*)
            sudo zypper install -y python312 python312-pip
            ;;
        *)
            echo "ERROR: Cannot auto-install Python on $OS"
            echo ""
            echo "Please install Python 3.10-3.13 manually:"
            echo "  https://www.python.org/downloads/"
            echo ""
            echo "Then run this script again."
            exit 1
            ;;
    esac
}

# Check for Python
PYTHON=$(find_python || echo "")

if [ -z "$PYTHON" ]; then
    echo "Python 3.10-3.13 not found."

    # Show what Python IS available
    if command -v python3 &> /dev/null; then
        current_version=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
        echo "Current Python: $current_version (not compatible, need 3.10-3.13)"
    fi

    # Auto-install Python
    install_python

    # Try finding Python again
    PYTHON=$(find_python || echo "")

    if [ -z "$PYTHON" ]; then
        echo ""
        echo "ERROR: Python installation failed."
        echo "Please install Python 3.10-3.13 manually and run this script again."
        exit 1
    fi
fi

echo "Using: $PYTHON ($($PYTHON --version 2>&1))"

# Ensure pip is available
if ! $PYTHON -m pip --version &> /dev/null; then
    echo ""
    echo "Installing pip..."
    curl -sS https://bootstrap.pypa.io/get-pip.py | $PYTHON --user 2>/dev/null || \
    curl -sS https://bootstrap.pypa.io/get-pip.py | sudo $PYTHON 2>/dev/null || true
fi

# Install washedmcp
echo ""
echo "Installing washedmcp..."

# Try different installation methods (suppress verbose output)
installed=false

if command -v pipx &> /dev/null; then
    echo "Using pipx..."
    if pipx install washedmcp --python $PYTHON 2>/dev/null || pipx upgrade washedmcp 2>/dev/null; then
        installed=true
    fi
fi

if [ "$installed" = false ]; then
    echo "Using pip..."
    if $PYTHON -m pip install --user washedmcp -q 2>/dev/null; then
        installed=true
    elif $PYTHON -m pip install washedmcp -q 2>/dev/null; then
        installed=true
    elif sudo $PYTHON -m pip install washedmcp -q 2>/dev/null; then
        installed=true
    fi
fi

if [ "$installed" = false ]; then
    echo "ERROR: Failed to install washedmcp"
    echo ""
    echo "Try manually:"
    echo "  $PYTHON -m pip install washedmcp"
    exit 1
fi

echo "washedmcp installed!"

# Configure Claude Code
CLAUDE_CONFIG="$HOME/.claude.json"

echo ""
echo "Configuring Claude Code..."

# Use full path to python for reliability
PYTHON_PATH=$(command -v $PYTHON)

if [ -f "$CLAUDE_CONFIG" ]; then
    cp "$CLAUDE_CONFIG" "$CLAUDE_CONFIG.backup"

    if grep -q "washedmcp" "$CLAUDE_CONFIG"; then
        echo "washedmcp already in Claude config"
    else
        $PYTHON << PYEOF
import json
import os

config_path = os.path.expanduser("~/.claude.json")
with open(config_path, "r") as f:
    config = json.load(f)

if "mcpServers" not in config:
    config["mcpServers"] = {}

config["mcpServers"]["washedmcp"] = {
    "command": "$PYTHON_PATH",
    "args": ["-m", "washedmcp.mcp_server"]
}

with open(config_path, "w") as f:
    json.dump(config, f, indent=2)

print("Added washedmcp to Claude config")
PYEOF
    fi
else
    cat > "$CLAUDE_CONFIG" << EOF
{
  "mcpServers": {
    "washedmcp": {
      "command": "$PYTHON_PATH",
      "args": ["-m", "washedmcp.mcp_server"]
    }
  }
}
EOF
    echo "Created Claude config"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "            Setup complete!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  1. Restart Claude Code"
echo "  2. Say: 'Index this codebase'"
echo "  3. Say: 'Search for user authentication'"
echo ""
