# Video Production Agent

Autonomous video production system that generates finished MP4 videos from repository scripts.

## Overview

This agent scans for narration scripts in the repository, generates professional videos with synchronized audio and visuals, and outputs production-ready MP4 files suitable for portfolio presentations and hiring decision-makers.

## Features

- **Automatic Script Discovery**: Scans directories for markdown/text scripts
- **Scene Detection**: Intelligently parses scripts to identify scenes, timestamps, and visual cues
- **Local TTS**: Generates narration audio using local text-to-speech engines (espeak-ng, pico2wave, festival)
- **Visual Generation**: Creates visuals with multiple fallback strategies:
  - Live demo capture from deployed apps (using Playwright)
  - Repository visualizations and diagrams
  - Professional title cards
- **Audio-Visual Sync**: Synchronizes narration with visuals into coherent timeline
- **Video Rendering**: Produces MP4 videos at specified resolution and framerate using FFmpeg
- **Comprehensive Logging**: Detailed logs and render reports for each video

## Requirements

### System Dependencies

- **Python 3.8+**
- **FFmpeg** and **ffprobe** (for video encoding and processing)
- **Text-to-Speech engine** (one of):
  - espeak-ng (recommended)
  - pico2wave
  - festival
  - gTTS (fallback, requires internet)

### Python Dependencies

Automatically installed by the agent:
- pyttsx3 (TTS wrapper)
- gtts (Google TTS fallback)
- playwright (browser automation)
- Pillow (image processing)
- moviepy (video processing)
- python-dotenv (config management)

## Usage

### Quick Start

```bash
# Run with defaults (scans docs/hiring-portfolio/)
./scripts/video-production-agent.sh
```

### With Environment Variables

```bash
# Specify custom configuration
export SCRIPT_DIR="docs/hiring-portfolio"
export SCRIPT_PATTERN="*.md"
export VIDEO_OUT_DIR="video_output"
export DEMO_URL="https://your-app.com"
export VIDEO_RESOLUTION="1920x1080"
export FPS="30"
export VOICE_MODE="local_tts"
export HEADLESS="true"

./scripts/video-production-agent.sh
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REPO_ROOT` | Repository root path | Auto-detected |
| `SCRIPT_DIR` | Directory containing scripts | `docs/hiring-portfolio` |
| `SCRIPT_PATTERN` | Glob pattern for scripts | `*.md` |
| `VIDEO_OUT_DIR` | Output directory for videos | `video_output` |
| `DEMO_URL` | Optional demo URL to capture | None |
| `VOICE_MODE` | TTS mode (`local_tts`, `gtts`) | `local_tts` |
| `VIDEO_RESOLUTION` | Video resolution | `1920x1080` |
| `FPS` | Frames per second | `30` |
| `HEADLESS` | Run browser headless | `true` |

## Script Format

The agent supports multiple script formats:

### Timecoded Sections

```markdown
### **[00:00-00:30] THE HOOK**

> "Your narration text goes here..."

[ON SCREEN: Description of visual]
```

### Section Headings

```markdown
### Introduction

> "Narration for this section..."
```

### Unstructured

The agent will intelligently split by paragraph breaks if no structure is detected.

### Visual Cues

Use these markers to specify visuals:
- `[ON SCREEN: ...]`
- `[VISUAL: ...]`
- `[SHOT 1: ...]`

Narration text should be in quote blocks starting with `>`.

## Output Structure

```
video_output/
├── ScriptName.mp4              # Final video
├── audio/                      # Audio files per scene
│   ├── ScriptName_scene01.wav
│   └── ScriptName_scene02.wav
├── visuals/                    # Visual assets per scene
│   ├── ScriptName_scene01_title.png
│   └── ScriptName_scene02_visual.png
└── logs/                       # Production logs
    ├── ScriptName_log.txt
    ├── production_summary.txt
    └── production_summary.json
```

## Workflow

1. **Scan**: Find all scripts matching pattern in script directory
2. **Parse**: Extract scenes, timestamps, headings, and visual cues
3. **Generate Audio**: Convert narration text to speech using local TTS
4. **Generate Visuals**: Create or capture visuals for each scene
5. **Synchronize**: Match audio duration with visuals
6. **Assemble**: Concatenate scenes into final video
7. **Render**: Output MP4 at specified resolution/FPS

## Fallback Hierarchy

### Audio Generation
1. espeak-ng (local, fast)
2. pico2wave (local, natural)
3. festival (local, older)
4. gTTS (requires internet)

### Visual Generation
1. Live demo capture from `DEMO_URL`
2. Local app launch and capture
3. Diagram generation from visual cues
4. Static title cards

## Error Handling

- **Audio failure**: Retries with smaller text chunks
- **Visual failure**: Falls back to simpler visual types
- **Rendering failure**: Outputs partial artifacts and detailed logs
- **Missing scenes**: Logs substitutions and continues

## Quality Constraints

- Non-technical viewer comprehension
- No code editors or terminals (unless script requires)
- Clean transitions and readable text
- Stable audio levels
- Professional production value

## Troubleshooting

### No audio generated
- Check TTS engine installation: `espeak-ng --version`
- Try installing: `sudo apt-get install espeak-ng`
- Check logs in `VIDEO_OUT_DIR/logs/`

### No visuals generated
- Check Pillow installation: `python3 -c "import PIL; print(PIL.__version__)"`
- For demo capture, ensure Playwright browsers installed
- Check logs for specific errors

### Video assembly fails
- Verify FFmpeg installation: `ffmpeg -version`
- Check disk space in output directory
- Review scene component logs

### Permission errors
- Ensure output directory is writable
- Run with appropriate permissions

## Development

### Project Structure

```
scripts/
└── video_production/
    ├── __init__.py
    ├── requirements.txt
    ├── orchestrator.py          # Main coordinator
    ├── script_scanner.py        # Script discovery
    ├── script_parser.py         # Scene extraction
    ├── audio_generator.py       # TTS generation
    ├── visual_generator.py      # Visual creation
    └── video_assembler.py       # Video compilation
```

### Running Tests

```bash
# Test script scanner
python3 -m scripts.video_production.script_scanner

# Test with specific script
export SCRIPT_DIR="docs/hiring-portfolio"
export SCRIPT_PATTERN="EXECUTIVE_SUMMARY.md"
./scripts/video-production-agent.sh
```

## Examples

### Process all markdown files in docs/hiring-portfolio
```bash
./scripts/video-production-agent.sh
```

### Process specific script with demo capture
```bash
export SCRIPT_PATTERN="VIDEO_PRODUCTION_PACKAGE.md"
export DEMO_URL="https://yourdemo.com"
./scripts/video-production-agent.sh
```

### High-resolution output
```bash
export VIDEO_RESOLUTION="3840x2160"
export FPS="60"
./scripts/video-production-agent.sh
```

## License

MIT License - see repository LICENSE file

## Support

For issues or questions:
1. Check logs in `VIDEO_OUT_DIR/logs/production_summary.txt`
2. Review error messages in console output
3. Verify all dependencies are installed
4. Open an issue on the repository

---

**Version**: 1.0.0  
**Created**: 2025-12-23  
**Purpose**: Autonomous video production from repository scripts
