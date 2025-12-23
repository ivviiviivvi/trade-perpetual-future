#!/usr/bin/env bash
#
# Video Production Agent
# Autonomous video production system for generating MP4 videos from scripts
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  VIDEO PRODUCTION AGENT${NC}"
echo -e "${BLUE}  Autonomous MP4 generation from repository scripts${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo

# Detect script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "${SCRIPT_DIR}/../.." && pwd )"

# Set default environment variables if not set
export REPO_ROOT="${REPO_ROOT}"
export SCRIPT_DIR="${SCRIPT_DIR:-${REPO_ROOT}/docs/hiring-portfolio}"
export SCRIPT_PATTERN="${SCRIPT_PATTERN:-*.md}"
export VIDEO_OUT_DIR="${VIDEO_OUT_DIR:-${REPO_ROOT}/video_output}"
export VOICE_MODE="${VOICE_MODE:-local_tts}"
export VIDEO_RESOLUTION="${VIDEO_RESOLUTION:-1920x1080}"
export FPS="${FPS:-30}"
export HEADLESS="${HEADLESS:-true}"

echo -e "${GREEN}Configuration:${NC}"
echo "  REPO_ROOT:         $REPO_ROOT"
echo "  SCRIPT_DIR:        $SCRIPT_DIR"
echo "  SCRIPT_PATTERN:    $SCRIPT_PATTERN"
echo "  VIDEO_OUT_DIR:     $VIDEO_OUT_DIR"
echo "  DEMO_URL:          ${DEMO_URL:-<not set>}"
echo "  VOICE_MODE:        $VOICE_MODE"
echo "  VIDEO_RESOLUTION:  $VIDEO_RESOLUTION"
echo "  FPS:               $FPS"
echo "  HEADLESS:          $HEADLESS"
echo

# Check dependencies
echo -e "${YELLOW}Checking dependencies...${NC}"

check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "  ${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "  ${RED}✗${NC} $1"
        return 1
    fi
}

# Required dependencies
MISSING_DEPS=0

check_command python3 || MISSING_DEPS=$((MISSING_DEPS + 1))
check_command pip3 || MISSING_DEPS=$((MISSING_DEPS + 1))

# Optional but recommended
if ! check_command ffmpeg; then
    echo -e "    ${YELLOW}Warning: FFmpeg not found. Installing...${NC}"
    if command -v apt-get &> /dev/null; then
        sudo apt-get update -qq
        sudo apt-get install -y -qq ffmpeg
    else
        echo -e "    ${RED}Error: Cannot install FFmpeg automatically${NC}"
        MISSING_DEPS=$((MISSING_DEPS + 1))
    fi
fi

if ! check_command ffprobe; then
    echo -e "    ${YELLOW}Note: ffprobe missing (usually comes with FFmpeg)${NC}"
fi

# Check for TTS engines
echo
echo -e "${YELLOW}Checking text-to-speech engines...${NC}"
TTS_AVAILABLE=0

if check_command espeak-ng; then
    TTS_AVAILABLE=1
elif check_command pico2wave; then
    TTS_AVAILABLE=1
elif check_command festival; then
    TTS_AVAILABLE=1
fi

if [ $TTS_AVAILABLE -eq 0 ]; then
    echo -e "  ${YELLOW}No local TTS found. Installing espeak-ng...${NC}"
    if command -v apt-get &> /dev/null; then
        sudo apt-get update -qq
        sudo apt-get install -y -qq espeak-ng
    else
        echo -e "  ${YELLOW}Warning: Cannot install TTS automatically. Will use gTTS (requires internet).${NC}"
    fi
fi

if [ $MISSING_DEPS -gt 0 ]; then
    echo
    echo -e "${RED}Error: $MISSING_DEPS required dependencies are missing.${NC}"
    exit 1
fi

echo
echo -e "${GREEN}All required dependencies available.${NC}"

# Install Python dependencies
echo
echo -e "${YELLOW}Installing Python dependencies...${NC}"

PYTHON_DEPS="${SCRIPT_DIR}/video_production/requirements.txt"

if [ -f "$PYTHON_DEPS" ]; then
    pip3 install -q -r "$PYTHON_DEPS" 2>&1 | grep -v "Requirement already satisfied" || true
    echo -e "${GREEN}✓ Python dependencies installed${NC}"
else
    echo -e "${RED}Error: requirements.txt not found at $PYTHON_DEPS${NC}"
    exit 1
fi

# Install Playwright browsers if needed
if [ "$HEADLESS" = "true" ] && [ -n "$DEMO_URL" ]; then
    echo
    echo -e "${YELLOW}Installing Playwright browsers (this may take a few minutes on first run)...${NC}"
    python3 -m playwright install chromium --with-deps 2>&1 | tail -5
    echo -e "${GREEN}✓ Playwright browsers installed${NC}"
fi

# Create output directory
mkdir -p "$VIDEO_OUT_DIR"

# Run the orchestrator
echo
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  STARTING VIDEO PRODUCTION${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════════${NC}"
echo

cd "${SCRIPT_DIR}/video_production"
python3 orchestrator.py

EXIT_CODE=$?

echo
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  VIDEO PRODUCTION COMPLETED SUCCESSFULLY${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo
    echo -e "${GREEN}Output location:${NC} $VIDEO_OUT_DIR"
    echo
    echo "Generated files:"
    if [ -d "$VIDEO_OUT_DIR" ]; then
        find "$VIDEO_OUT_DIR" -name "*.mp4" -type f -exec echo "  - {}" \;
    fi
    echo
    echo "Logs:"
    if [ -d "$VIDEO_OUT_DIR/logs" ]; then
        find "$VIDEO_OUT_DIR/logs" -name "*.txt" -o -name "*.json" -type f -exec echo "  - {}" \;
    fi
else
    echo -e "${RED}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}  VIDEO PRODUCTION FAILED${NC}"
    echo -e "${RED}════════════════════════════════════════════════════════════════${NC}"
    echo
    echo "Check logs at: $VIDEO_OUT_DIR/logs"
fi

exit $EXIT_CODE
