# Quick Start Guide: Video Production

**Ready to produce your hiring portfolio video?** Follow these steps.

---

## ⚡ 5-Minute Quick Start

### 1. Configure Your Information (2 minutes)

```bash
# Copy the configuration template
cp docs/hiring-portfolio/VIDEO_CONFIG_TEMPLATE.md .env.video

# Edit with your personal information
nano .env.video  # or use your preferred editor

# Required fields to fill:
# - CANDIDATE_NAME
# - CTA_EMAIL
# - CTA_LINKEDIN
# - CTA_GITHUB
# - CTA_URL (your booking/contact link)
```

### 2. Review the Full Package (3 minutes)

```bash
# Read the complete production package
cat docs/hiring-portfolio/VIDEO_PRODUCTION_PACKAGE.md

# Key sections to review:
# - Section 2: Main Narration Script (your voiceover)
# - Section 3: Visual Plan (what viewers see)
# - Section 4: B-Roll Prompts (cinematic footage)
```

---

## 📋 Full Production Workflow

### Phase 1: Pre-Production (2-3 days)

#### Step 1: Customize the Script
- [ ] Read the complete narration script (Section 2)
- [ ] Personalize with your specific details
- [ ] Adjust tone to match your style
- [ ] Time yourself reading it (target: 4-5 minutes)
- [ ] Cut or expand sections as needed

**Location**: `VIDEO_PRODUCTION_PACKAGE.md` → Section 2

#### Step 2: Create Diagrams
- [ ] Review diagram specifications (Section 3.3)
- [ ] Choose your tool (Figma, Illustrator, Canva)
- [ ] Create the 4 core diagrams:
  - Non-custodial architecture
  - Traditional vs. non-custodial comparison
  - Revenue flow
  - Decision framework
- [ ] Export as PNG (transparent background, 1920x1080)

**Tools**: Figma (recommended), Canva Pro, Adobe Illustrator

#### Step 3: Record Voiceover
- [ ] Find quiet recording space
- [ ] Set up microphone (condenser mic recommended)
- [ ] Do 2-3 warm-up reads
- [ ] Record full script (save multiple takes)
- [ ] Listen back and note any issues
- [ ] Re-record problem sections
- [ ] Edit for pacing and clarity

**Tools**: Audacity (free), Adobe Audition, GarageBand

#### Step 4: Gather B-Roll
- [ ] Review B-roll prompts (Section 4)
- [ ] Generate AI images (Midjourney, DALL-E) OR
- [ ] Source stock footage (Pexels, Pixabay, premium stock)
- [ ] Organize in folder: `assets/broll/`
- [ ] Label clearly (e.g., `chaos-to-order.mp4`)

**AI Tools**: Midjourney, Runway ML, Pika Labs
**Stock**: Pexels (free), Artgrid (premium)

#### Step 5: Screen Recording
- [ ] Clean up your desktop
- [ ] Open the trading platform
- [ ] Record key interactions:
  - Wallet connection flow
  - Trading interface
  - Order placement
  - Portfolio view
- [ ] Record at 1080p or higher
- [ ] Keep each clip 5-10 seconds

**Tools**: OBS Studio (free), ScreenFlow (Mac), Camtasia

#### Step 6: Optional On-Camera Filming
- [ ] Set up three-point lighting
- [ ] Frame yourself (medium close-up, rule of thirds)
- [ ] Test camera and audio
- [ ] Record 3 segments:
  - Hook/opening (30 sec)
  - "Why Me" section (45 sec)
  - Closing CTA (30 sec)
- [ ] Record multiple takes of each

**Setup**: Camera at eye level, blurred background, professional attire

---

### Phase 2: Production (3-5 days)

#### Step 7: Create Animations
- [ ] Import diagrams into motion graphics software
- [ ] Animate each diagram per specifications (Section 3.4)
- [ ] Keep animations subtle (0.5-1.5 sec each)
- [ ] Export as video files or composites
- [ ] Review timing with voiceover

**Tools**: After Effects, Blender, Apple Motion

#### Step 8: Assemble Rough Cut
- [ ] Import all assets into video editor
- [ ] Lay down voiceover track
- [ ] Add visual elements synced to narration
- [ ] Follow scene-by-scene breakdown (Section 3.2)
- [ ] Create basic transitions (fades, slides)
- [ ] Watch through completely
- [ ] Note issues and timing problems

**Tools**: DaVinci Resolve (free), Premiere Pro, Final Cut Pro

#### Step 9: Refine Edit
- [ ] Adjust pacing (cut dead space)
- [ ] Tighten transitions
- [ ] Add motion graphics
- [ ] Insert B-roll footage
- [ ] Add on-camera segments (if applicable)
- [ ] Ensure flow and coherence

#### Step 10: Add Music & Sound
- [ ] Select background music track
- [ ] Add music to timeline
- [ ] Duck volume during narration (-20 to -25dB)
- [ ] Add subtle sound effects (whooshes, clicks)
- [ ] Mix audio levels
- [ ] Test on different devices (laptop speakers, headphones)

**Music Sources**: Artlist, Epidemic Sound, YouTube Audio Library (free)

---

### Phase 3: Post-Production (4-6 days)

#### Step 11: Polish Visuals
- [ ] Color grade for consistency
- [ ] Adjust brightness/contrast
- [ ] Enhance colors (saturation, vibrance)
- [ ] Apply subtle vignette or film grain (optional)
- [ ] Ensure brand colors are accurate

**Tools**: Color grading in DaVinci Resolve, Premiere Pro Lumetri

#### Step 12: Add Text & Graphics
- [ ] Create lower thirds for key points
- [ ] Add call-out text for emphasis
- [ ] Design call-to-action card (Section 6.4)
- [ ] Add contact information overlays
- [ ] Ensure text is readable at 1080p

#### Step 13: Create Subtitles
- [ ] Auto-generate subtitles in editor OR
- [ ] Use subtitle service (Rev, Happy Scribe)
- [ ] Review and correct errors
- [ ] Style subtitles (white text, black background, centered)
- [ ] Export as SRT file and burned-in version

#### Step 14: Audio Mastering
- [ ] Normalize audio levels (-3dB to -6dB peak)
- [ ] Apply light compression
- [ ] Add subtle EQ (boost clarity, reduce mud)
- [ ] Remove mouth clicks and breaths (if distracting)
- [ ] Final listen on multiple devices

#### Step 15: Render Final Video
- [ ] Export settings:
  - Resolution: 1920x1080 (or 4K)
  - Frame rate: 24fps or 30fps
  - Format: MP4 (H.264)
  - Bitrate: 10-15 Mbps (VBR)
  - Audio: AAC, 48kHz, 24-bit
- [ ] Render high-quality version (for archive)
- [ ] Render optimized version (for web)
- [ ] Check file size (target: <500MB)

#### Step 16: Create Variations
- [ ] Export full version (3-5 min)
- [ ] Export short version (60-90 sec) for social media
- [ ] Export teaser (30 sec) for ads
- [ ] Export square format (1:1) for LinkedIn/Instagram
- [ ] Export vertical format (9:16) for stories/TikTok

---

### Phase 4: Quality Assurance (1 day)

#### Step 17: Review Checklist
- [ ] Watch full video start to finish
- [ ] Check against quality checklist (Section 9)
- [ ] Test on different devices and browsers
- [ ] Get feedback from 2-3 trusted colleagues
- [ ] Note any issues or improvements
- [ ] Make final adjustments

#### Step 18: Final Checks
- [ ] Verify all contact info is correct
- [ ] Ensure CTA link works
- [ ] Check for typos in text overlays
- [ ] Confirm audio is clear throughout
- [ ] Verify video plays on target platforms
- [ ] Create thumbnail image

---

### Phase 5: Publishing (1 day)

#### Step 19: Upload to Platforms
- [ ] **YouTube**:
  - Upload video
  - Add title, description, tags (Section 11.1)
  - Create custom thumbnail
  - Add end screen and cards
  - Set to public/unlisted
- [ ] **LinkedIn**:
  - Upload native video (better reach)
  - Write compelling post (use template in Section 10.2)
  - Add relevant hashtags
  - Tag relevant people/companies
- [ ] **Personal Website**:
  - Embed video prominently
  - Add written context
  - Include clear CTA
- [ ] **Vimeo** (optional):
  - Upload for professional showcase
  - Set privacy as needed

#### Step 20: Promote & Share
- [ ] Share with warm network personally
- [ ] Post on LinkedIn with context
- [ ] Send to email list (if applicable)
- [ ] Share in relevant communities (respectfully)
- [ ] Add to email signature
- [ ] Include in job applications

---

## 🛠️ Required Tools & Resources

### Essential (Free Options Available)
- **Video editor**: DaVinci Resolve (free), iMovie (Mac), Kdenlive (Linux)
- **Audio editor**: Audacity (free), GarageBand (Mac)
- **Screen recorder**: OBS Studio (free), QuickTime (Mac)
- **Diagram tool**: Figma (free tier), Canva (free tier)

### Professional (Paid)
- **Video editor**: Adobe Premiere Pro ($21/mo), Final Cut Pro ($300 one-time)
- **Motion graphics**: After Effects ($21/mo), Apple Motion ($50)
- **Audio**: Adobe Audition ($21/mo), Descript ($12/mo)
- **Music**: Artlist ($9/mo), Epidemic Sound ($15/mo)

### Optional (AI-Assisted)
- **AI images**: Midjourney ($10/mo), DALL-E (pay-per-use)
- **AI video**: Runway ML ($12/mo), Pika Labs (beta)
- **AI voice**: ElevenLabs ($5/mo) - only if not recording yourself

---

## 📅 Suggested Timeline

### Fast Track (1 week)
- **Day 1**: Pre-production (script, diagrams, recording)
- **Day 2**: Gather assets (B-roll, screen recordings)
- **Day 3-4**: Rough cut assembly
- **Day 5-6**: Polish and refine
- **Day 7**: QA and publish

### Standard (2 weeks)
- **Week 1**: Pre-production and asset gathering
- **Week 2**: Editing, polishing, and publishing

### Professional (3-4 weeks)
- **Week 1**: Pre-production (script refinement, professional recording)
- **Week 2**: Production (editing, motion graphics)
- **Week 3**: Post-production (color grading, audio mastering)
- **Week 4**: Revisions, QA, and launch

---

## 💡 Pro Tips

### Do's ✅
- **Start simple**: Your first version doesn't need to be perfect
- **Test early**: Show rough cuts to friends for feedback
- **Focus on audio**: Clear audio is more important than perfect visuals
- **Use templates**: Leverage free motion graphics templates
- **Plan transitions**: Know how each scene flows to the next
- **Back up everything**: Save project files and assets in multiple locations

### Don'ts ❌
- **Don't over-edit**: Subtle is better than flashy
- **Don't use bad music**: Cheesy music ruins credibility
- **Don't rush voiceover**: A calm pace is easier to understand
- **Don't ignore feedback**: Test audiences catch issues you miss
- **Don't forget mobile**: Most viewers watch on phones
- **Don't skip subtitles**: 85% of social video is watched muted

---

## 🆘 Troubleshooting

### "I'm not comfortable on camera"
**Solution**: Use voice-over only format. Many successful portfolio videos never show the creator's face. Focus on strong diagrams and visuals instead.

### "I don't have video editing skills"
**Solution**: Start with templates. Canva Pro has video templates. Or hire a freelance editor on Fiverr/Upwork ($100-300 for basic editing).

### "My voice recording sounds bad"
**Solution**: 
1. Record in a closet (clothes absorb echo)
2. Use a USB microphone ($50-100)
3. Apply noise reduction in Audacity
4. Consider professional voice talent ($300-600)

### "I don't have time for this"
**Solution**: Create in phases. A 60-second version with screen recordings and voiceover can be done in 2-3 hours. Start small and expand later.

### "I'm not sure what to say"
**Solution**: The script in VIDEO_PRODUCTION_PACKAGE.md is ready to use. Personalize the placeholders and record. You can customize more in future versions.

---

## 📊 Success Metrics

Track these to measure video effectiveness:

### Engagement
- View count (target: 500+ first month)
- Watch time / completion rate (target: >60%)
- Likes, comments, shares (target: 5% engagement rate)
- Click-through on CTA (target: 2-5%)

### Outcomes
- Calendar bookings from video
- Email inquiries mentioning video
- Job interview requests
- Unsolicited reach-outs from recruiters
- Shares by hiring managers

### Feedback
- "This was very clear" = Good communication verified
- "I didn't know you could do that" = Demonstrates new capability
- "This is different from other portfolios" = Differentiation achieved
- "Can you explain more about X?" = Opportunity to follow up

---

## 📚 Additional Resources

### Tutorials
- **DaVinci Resolve**: Casey Faris YouTube channel
- **After Effects**: Motion Design School
- **Premiere Pro**: Premiere Gal YouTube channel
- **General**: Film Riot for production techniques

### Inspiration
- Search YouTube: "Portfolio video for [your role]"
- Look at: TED-Ed explainer videos (clear, visual)
- Reference: Y Combinator startup pitches (concise, impact-focused)

### Communities
- r/videography
- r/editors
- Video Editing & Production (LinkedIn group)
- ProductHunt maker stories

---

## 🎯 Remember: Done is Better Than Perfect

Your first version doesn't need to be flawless. The goal is to:
1. ✅ Communicate your value clearly
2. ✅ Differentiate yourself from others
3. ✅ Motivate viewers to reach out

Everything else is secondary. Ship it, get feedback, iterate.

---

## Next Steps

1. [ ] Copy and fill `VIDEO_CONFIG_TEMPLATE.md`
2. [ ] Read full `VIDEO_PRODUCTION_PACKAGE.md`
3. [ ] Set production timeline
4. [ ] Start with script customization
5. [ ] Record test voiceover
6. [ ] Create first diagram
7. [ ] Build momentum and keep going!

**Questions?** Review the full VIDEO_PRODUCTION_PACKAGE.md for detailed guidance on every aspect.

---

**Good luck with your video production!** 🎬

**Document Version**: 1.0  
**Last Updated**: 2025-12-20  
**Next Steps**: See VIDEO_PRODUCTION_PACKAGE.md for complete specifications
