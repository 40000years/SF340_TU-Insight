#!/bin/bash
# Build script for TU-Insight Backend
# Usage: ./build.sh [windows|linux|darwin|all]

set -e

echo ""
echo "========================================"
echo " TU-Insight Backend - Build Script"
echo "========================================"
echo ""

# Default to Linux if no argument
TARGET=${1:-linux}

# Get version
VERSION=$(date +%Y.%m.%d)
BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/backend" && pwd)"
BUILD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/dist"
BINARY_NAME="backend"

echo "[*] Building for $TARGET..."
echo "[*] Version: $VERSION"

# Create build directory
mkdir -p "$BUILD_DIR"

# Set environment variables
export CGO_ENABLED=0

# Function to build for a target
build_for_target() {
    local target=$1
    local goos=""
    local goarch="amd64"
    local output=""

    case $target in
        windows)
            goos="windows"
            output="$BUILD_DIR/${BINARY_NAME}.exe"
            ;;
        linux)
            goos="linux"
            output="$BUILD_DIR/${BINARY_NAME}"
            ;;
        darwin)
            goos="darwin"
            output="$BUILD_DIR/${BINARY_NAME}-macos"
            ;;
        *)
            echo "[ERROR] Unknown target: $target"
            echo "Usage: $0 [windows|linux|darwin|all]"
            exit 1
            ;;
    esac

    echo "[*] Building for $target..."
    echo "[*] Output: $output"

    cd "$BACKEND_DIR"
    GOOS=$goos GOARCH=$goarch CGO_ENABLED=0 go build -o "$output" -v main.go

    if [ $? -eq 0 ]; then
        echo "[OK] Build successful for $target!"
    else
        echo "[ERROR] Build failed for $target!"
        exit 1
    fi
}

# Build based on argument
if [ "$TARGET" = "all" ]; then
    build_for_target "windows"
    build_for_target "linux"
    build_for_target "darwin"
else
    build_for_target "$TARGET"
fi

echo ""

# Copy frontend
if [ -d "frontend" ]; then
    echo "[*] Copying frontend files..."
    mkdir -p "$BUILD_DIR/frontend"
    cp -r frontend/* "$BUILD_DIR/frontend/"
    echo "[OK] Frontend copied"
fi

# Copy .env example
if [ -f "$BACKEND_DIR/.env.example" ]; then
    echo "[*] Copying .env.example..."
    cp "$BACKEND_DIR/.env.example" "$BUILD_DIR/.env.example"
    echo "[OK] .env.example copied"
fi

echo ""
echo "========================================"
echo " Build Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. cd dist"
echo "2. cp .env.example .env"
echo "3. Edit .env with your settings"
echo "4. Run: ./$BINARY_NAME"
echo ""
