# Video Production Configuration Template

## Instructions
Copy this file to `.env.video` and fill in your specific values.
These environment variables will be used throughout the video production process.

---

## REPOSITORY CONFIGURATION

```bash
# Root path to your repository
REPO_ROOT="/home/runner/work/trade-perpetual-future/trade-perpetual-future"

# Repository URL for viewer reference
REPO_URL="https://github.com/ivviiviivvi/trade-perpetual-future"
```

---

## CANDIDATE INFORMATION

```bash
# Your full name as it should appear in the video
CANDIDATE_NAME="[Your Full Name]"

# Your target role(s) - be specific but not too narrow
CANDIDATE_ROLE_TARGET="Product Strategist | Technical Leader | Digital Systems Architect"

# Alternative options:
# CANDIDATE_ROLE_TARGET="Engineering Manager | Technical Product Manager"
# CANDIDATE_ROLE_TARGET="Full-Stack Developer | Systems Architect"
# CANDIDATE_ROLE_TARGET="Blockchain Engineer | Web3 Product Lead"
# CANDIDATE_ROLE_TARGET="Creative Technologist | Innovation Lead"
```

---

## AUDIENCE TARGETING

```bash
# Who will watch this video?
TARGET_AUDIENCE="Non-technical executives | Hiring managers | Business decision-makers"

# Alternative options:
# TARGET_AUDIENCE="Technical CTOs | Engineering VPs"
# TARGET_AUDIENCE="Startup founders | Early-stage teams"
# TARGET_AUDIENCE="Enterprise clients | Consulting prospects"
# TARGET_AUDIENCE="Investors | Board members"
```

---

## VIDEO SPECIFICATIONS

```bash
# Target video length
VIDEO_LENGTH_TARGET="3-5 minutes"

# Alternative options:
# VIDEO_LENGTH_TARGET="60-90 seconds" (social media teaser)
# VIDEO_LENGTH_TARGET="2-3 minutes" (shorter attention span)
# VIDEO_LENGTH_TARGET="5-7 minutes" (detailed presentation)

# Tone and style
TONE="Clear, confident, intelligent, non-jargony"

# Alternative tones:
# TONE="Warm, approachable, conversational"
# TONE="Bold, disruptive, innovative"
# TONE="Academic, thorough, authoritative"

# Narrative structure
NARRATIVE_FRAMEWORK="Problem → Insight → Solution → Impact → Why Me"
```

---

## BRANDING (Optional)

```bash
# Logo file path (relative to REPO_ROOT or absolute)
BRAND_LOGO_PATH="./assets/logo.png"
# Leave empty if no logo: BRAND_LOGO_PATH=""

# Primary brand color (hex code)
BRAND_COLOR_PRIMARY="#6366f1"
# Indigo (trust, technology) - default

# Secondary brand color
BRAND_COLOR_SECONDARY="#10b981"
# Green (growth, success) - default

# Accent color for warnings/highlights
BRAND_COLOR_ACCENT="#f59e0b"
# Amber (attention) - default

# Background color for graphics
BRAND_COLOR_BACKGROUND="#1f2937"
# Dark gray - default

# Text color
BRAND_COLOR_TEXT="#f9fafb"
# Off-white - default

# Primary font family
BRAND_FONT_PRIMARY="Inter"

# Alternative font options:
# BRAND_FONT_PRIMARY="Roboto"
# BRAND_FONT_PRIMARY="Helvetica Neue"
# BRAND_FONT_PRIMARY="Open Sans"
```

---

## DELIVERY STYLE

```bash
# Voice style for narration
VOICE_STYLE="Calm professional with warm authority"

# Alternative voice styles:
# VOICE_STYLE="Energetic and enthusiastic"
# VOICE_STYLE="Thoughtful and measured"
# VOICE_STYLE="Bold and confident"
# VOICE_STYLE="Warm and conversational"

# Avatar/talking head mode
AVATAR_MODE="Subtle talking-head at key moments (hook, why me, closing)"

# Alternative avatar modes:
# AVATAR_MODE="none" (voice-over only, no on-camera)
# AVATAR_MODE="full" (frequent on-camera presence throughout)
# AVATAR_MODE="minimal" (only in opening and closing)
# AVATAR_MODE="picture-in-picture" (small corner presence)
```

---

## CALL-TO-ACTION CONFIGURATION

```bash
# Desired outcome from viewer
CTA_OUTCOME="Book a 30-minute strategy call"

# Alternative CTA outcomes:
# CTA_OUTCOME="Request a detailed proposal"
# CTA_OUTCOME="Review my full resume and experience"
# CTA_OUTCOME="Explore collaboration opportunities"
# CTA_OUTCOME="Schedule an interview"
# CTA_OUTCOME="Discuss your project needs"

# Primary CTA URL (usually booking link)
CTA_URL="https://calendly.com/yourname/strategy-call"

# Contact information
CTA_EMAIL="your.name@email.com"
CTA_LINKEDIN="linkedin.com/in/yourname"
CTA_GITHUB="github.com/yourusername/trade-perpetual-future"
CTA_TWITTER="twitter.com/yourhandle"  # Optional
CTA_WEBSITE="https://yourportfolio.com"  # Optional
```

---

## PRODUCTION PREFERENCES

```bash
# Budget level
PRODUCTION_BUDGET="DIY"
# Options: "DIY" ($0-500), "PROFESSIONAL" ($2K-5K), "HIGH_END" ($10K-25K)

# Software preferences
VIDEO_EDITOR="DaVinci Resolve"
# Options: "Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "Filmora"

MOTION_GRAPHICS="After Effects"
# Options: "After Effects", "Blender", "Apple Motion", "Canva Pro"

DIAGRAM_TOOL="Figma"
# Options: "Figma", "Adobe Illustrator", "Canva", "PowerPoint"

# AI assistance
USE_AI_IMAGES="yes"
AI_IMAGE_TOOL="Midjourney"
# Options: "Midjourney", "DALL-E", "Stable Diffusion", "None"

USE_AI_VOICE="no"
AI_VOICE_TOOL="ElevenLabs"
# Options: "ElevenLabs", "Descript", "Murf.ai", "None"
```

---

## DISTRIBUTION STRATEGY

```bash
# Primary platform for sharing
PRIMARY_PLATFORM="LinkedIn"
# Options: "LinkedIn", "YouTube", "Personal Website", "Vimeo"

# Additional platforms (comma-separated)
SECONDARY_PLATFORMS="YouTube, Personal Website, Portfolio"

# SEO optimization
VIDEO_TITLE="[Your Name] - Strategic Technical Leader | Portfolio Video"
VIDEO_DESCRIPTION="How I built a non-custodial trading platform that solves the trust problem in a \$3T market. Strategic thinking, technical execution, clear communication."
VIDEO_TAGS="product strategy, technical leadership, fintech, blockchain, portfolio, hiring"

# Thumbnail style
THUMBNAIL_STYLE="Professional headshot with key text"
# Options: "Headshot", "Diagram", "Action shot", "Text overlay"
```

---

## TIMELINE & MILESTONES

```bash
# Production start date
START_DATE="2025-01-01"

# Target completion date
TARGET_COMPLETION="2025-01-15"

# Key milestones
MILESTONE_SCRIPT_COMPLETE="2025-01-03"
MILESTONE_ASSETS_READY="2025-01-07"
MILESTONE_ROUGH_CUT="2025-01-10"
MILESTONE_FINAL_RENDER="2025-01-14"
MILESTONE_PUBLISH="2025-01-15"
```

---

## QUALITY TARGETS

```bash
# Technical specifications
VIDEO_RESOLUTION="1920x1080"
# Options: "1920x1080" (1080p), "3840x2160" (4K)

VIDEO_FRAMERATE="24"
# Options: "24" (cinematic), "30" (standard), "60" (smooth)

VIDEO_ASPECT_RATIO="16:9"
# Options: "16:9" (widescreen), "1:1" (square), "9:16" (vertical)

VIDEO_FORMAT="MP4"
VIDEO_CODEC="H.264"

AUDIO_SAMPLERATE="48000"
AUDIO_BITDEPTH="24"

# Target file size
MAX_FILE_SIZE_MB="500"
```

---

## SPECIAL REQUIREMENTS

```bash
# Accessibility
INCLUDE_SUBTITLES="yes"
SUBTITLE_FORMAT="SRT"
# Options: "SRT", "VTT", "Burned-in"

# Localization
PRIMARY_LANGUAGE="English"
ADDITIONAL_LANGUAGES=""
# Example: ADDITIONAL_LANGUAGES="Spanish, French"

# Special considerations
SPECIAL_NOTES="Focus on non-technical explanation. Emphasize business impact over code."
```

---

## USAGE INSTRUCTIONS

1. **Copy this template**:
   ```bash
   cp VIDEO_CONFIG_TEMPLATE.md .env.video
   ```

2. **Edit values**: Fill in all fields marked with `[Your...]` or placeholders

3. **Source in scripts**: Production scripts can read these values:
   ```bash
   source .env.video
   echo "Producing video for: $CANDIDATE_NAME"
   ```

4. **Verify configuration**:
   ```bash
   # Check all required fields are set
   grep -E "^\[Your|^$" .env.video
   # Should return no results if all filled
   ```

5. **Keep private**: Add `.env.video` to `.gitignore` to avoid committing personal info

---

## EXAMPLE: FILLED CONFIGURATION

```bash
# Complete example for reference

REPO_ROOT="/home/runner/work/trade-perpetual-future/trade-perpetual-future"
REPO_URL="https://github.com/ivviiviivvi/trade-perpetual-future"

CANDIDATE_NAME="Alex Johnson"
CANDIDATE_ROLE_TARGET="Product Strategist | Technical Leader"
TARGET_AUDIENCE="Non-technical executives | Hiring managers"

VIDEO_LENGTH_TARGET="3-5 minutes"
TONE="Clear, confident, intelligent, non-jargony"
NARRATIVE_FRAMEWORK="Problem → Insight → Solution → Impact → Why Me"

BRAND_LOGO_PATH=""
BRAND_COLOR_PRIMARY="#6366f1"
BRAND_COLOR_SECONDARY="#10b981"
BRAND_FONT_PRIMARY="Inter"

VOICE_STYLE="Calm professional with warm authority"
AVATAR_MODE="Subtle talking-head at key moments"

CTA_OUTCOME="Book a 30-minute strategy call"
CTA_URL="https://calendly.com/alexjohnson/strategy"
CTA_EMAIL="alex.johnson@email.com"
CTA_LINKEDIN="linkedin.com/in/alexjohnson"
CTA_GITHUB="github.com/alexjohnson"

PRODUCTION_BUDGET="PROFESSIONAL"
VIDEO_EDITOR="DaVinci Resolve"
PRIMARY_PLATFORM="LinkedIn"

VIDEO_RESOLUTION="1920x1080"
VIDEO_FRAMERATE="24"
INCLUDE_SUBTITLES="yes"
```

---

## NOTES

- All paths can be relative to `REPO_ROOT` or absolute
- Color codes must be in hex format (#RRGGBB)
- URLs should be complete (include https://)
- Keep this file updated as preferences change
- Review before each production session

---

**Template Version**: 1.0  
**Last Updated**: 2025-12-20  
**Compatible With**: VIDEO_PRODUCTION_PACKAGE.md v1.0
