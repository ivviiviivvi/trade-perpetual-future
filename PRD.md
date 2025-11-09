# Planning Guide

A sentiment-driven market analysis tool that projects multiple parallel market realities based on social sentiment, provides downtrend alerts, and analyzes real-time hashtag trends to help traders understand where markets might be heading.

**Experience Qualities**:
1. **Predictive & Insightful** - Multiple parallel reality projections showing different potential market outcomes with probability weights, helping users understand the range of possibilities rather than a single prediction
2. **Vigilant & Responsive** - Automated alert system that watches sentiment shifts and notifies users immediately when negative trends emerge, acting as an early warning system
3. **Transparent & Data-Rich** - Clear visualization of sentiment sources, hashtag trends, and social momentum with full transparency on data sources and analysis methodology

**Complexity Level**: Light Application (multiple features with basic state)
  - Real-time sentiment tracking, multi-timeline projection engine, alert system, hashtag trending analysis, and visual data presentation without complex user accounts

## Essential Features

### Multi-Reality Market Projections
- **Functionality**: Display 3+ parallel timelines showing different possible market outcomes (bullish, bearish, neutral, volatility scenarios) with probability weightings based on current sentiment
- **Purpose**: Help users understand the full range of market possibilities rather than a single prediction
- **Trigger**: App loads with default stocks/crypto; user can add symbols
- **Progression**: Symbol selected → AI analyzes current sentiment → Projects 3-5 potential realities → Each timeline shows price path with probability % → Updates every 5 minutes
- **Success criteria**: Multiple timelines render clearly, probabilities sum to ~100%, scenarios are distinct and realistic, visual hierarchy emphasizes most likely path

### Downtrend Alert System
- **Functionality**: Monitor sentiment scores continuously; trigger visual and notification alerts when sentiment crosses negative thresholds
- **Purpose**: Early warning system to help users avoid losses or prepare for market moves
- **Trigger**: Sentiment score drops below user-defined threshold or rapid negative shift detected
- **Progression**: Sentiment tracked → Threshold crossed → Alert banner appears → Toast notification fires → Symbol highlighted in red → Alert history logged
- **Success criteria**: Alerts fire within 30 seconds of threshold breach, no false positives, clear indication of severity, alert history is accessible

### Hashtag Trend Sentiment Analysis
- **Functionality**: Track popular stock/crypto hashtags, analyze sentiment of mentions, show trending topics with sentiment scores
- **Purpose**: Surface what traders are talking about and whether sentiment is bullish or bearish
- **Trigger**: Hashtags/mentions analyzed every minute from simulated social data
- **Progression**: Hashtags collected → AI sentiment analysis → Scored positive/negative/neutral → Ranked by volume and sentiment shift → Displayed with trend arrows
- **Success criteria**: Hashtags update in real-time, sentiment accurately reflects tone, trending topics visible at a glance, historical sentiment tracked

### Real-Time Sentiment Dashboard
- **Functionality**: Central view showing current sentiment scores, trend direction, volume, and momentum for tracked symbols
- **Purpose**: Quick overview of market mood across multiple assets
- **Trigger**: Dashboard loads on app start
- **Progression**: Symbols load → Sentiment scores calculated → Dashboard grid displays → Color-coded by sentiment → Updates continuously
- **Success criteria**: All tracked symbols visible, sentiment scores accurate, color coding intuitive, responsive to changes

### Symbol Watchlist Management
- **Functionality**: Add/remove stock and crypto symbols to track, persist watchlist across sessions
- **Purpose**: Let users customize which assets they monitor
- **Trigger**: User clicks "Add Symbol" button
- **Progression**: Click add → Enter symbol → Validate symbol → Add to watchlist → Sentiment analysis begins → Symbol appears in dashboard
- **Success criteria**: Symbols persist across sessions, invalid symbols rejected gracefully, removal is instant, common symbols suggested

## Edge Case Handling
- **Invalid Symbol Entry** - Show autocomplete suggestions, validate against known tickers, display helpful error for unknown symbols
- **No Sentiment Data Available** - Display "Analyzing..." state with skeleton loader, show last known sentiment with timestamp
- **API/Data Failures** - Gracefully degrade to cached data, show warning banner indicating stale data
- **Extreme Volatility** - Cap probability ranges to prevent unrealistic projections, show volatility warning
- **All Realities Converge** - When scenarios are too similar, reduce to 3 distinct timelines with explanatory note
- **Alert Fatigue** - Group rapid alerts, implement cooldown period, allow users to adjust sensitivity
- **Conflicting Signals** - When sentiment is mixed, show uncertainty range and highlight conflicting indicators

## Design Direction
The design should feel like a sophisticated intelligence dashboard - calm, confident, and data-focused with subtle sci-fi undertones. Think Bloomberg Terminal meets modern data visualization with parallel timeline aesthetics. Clean, minimal interface that lets data breathe while maintaining urgency through strategic use of alerts and color. Interface should feel analytical yet accessible.

## Color Selection
Complementary color scheme with data visualization focus - Deep space blues for calm analysis complemented by warm alerts for urgency, maintaining analytical professionalism while ensuring alert hierarchy.

- **Primary Color**: Deep Ocean Blue (`oklch(0.45 0.15 240)`) - Represents analytical depth, trust, and calm data exploration
- **Secondary Colors**: 
  - Slate Blue (`oklch(0.30 0.08 250)`) for card backgrounds and containers
  - Soft Blue Gray (`oklch(0.65 0.05 240)`) for secondary elements
- **Accent Colors**:
  - Alert Red (`oklch(0.55 0.22 25)`) for downtrend alerts and negative sentiment
  - Success Green (`oklch(0.65 0.18 145)`) for positive sentiment and uptrends
  - Warning Amber (`oklch(0.70 0.15 65)`) for caution states and volatility
  - Cyan Highlight (`oklch(0.70 0.12 210)`) for selected realities and focus states
  - Purple Accent (`oklch(0.60 0.18 290)`) for AI/projection indicators
- **Foreground/Background Pairings**:
  - Background (Dark Space `oklch(0.15 0.02 250)`): Light text (`oklch(0.95 0 0)`) - Ratio 13.5:1 ✓
  - Card (Slate Blue `oklch(0.30 0.08 250)`): Light text (`oklch(0.95 0 0)`) - Ratio 8.2:1 ✓
  - Primary (Deep Ocean `oklch(0.45 0.15 240)`): White text (`oklch(1 0 0)`) - Ratio 5.8:1 ✓
  - Alert (Alert Red `oklch(0.55 0.22 25)`): White text (`oklch(1 0 0)`) - Ratio 5.2:1 ✓
  - Success (Success Green `oklch(0.65 0.18 145)`): Dark text (`oklch(0.15 0.02 250)`) - Ratio 9.8:1 ✓
  - Warning (Amber `oklch(0.70 0.15 65)`): Dark text (`oklch(0.15 0.02 250)`) - Ratio 11.2:1 ✓
  - Accent (Cyan `oklch(0.70 0.12 210)`): Dark text (`oklch(0.15 0.02 250)`) - Ratio 10.5:1 ✓

## Font Selection
Inter for all interface text to maintain consistency and excellent legibility, with IBM Plex Mono for financial data and symbol tickers to ensure numerical clarity and professional data display.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight tracking (-0.02em)
  - H2 (Section Headers): Inter SemiBold/24px/normal tracking
  - H3 (Card Titles): Inter SemiBold/18px/normal tracking
  - Body (Descriptions): Inter Regular/14px/relaxed line-height (1.6)
  - Data Labels: Inter Medium/13px/normal tracking
  - Symbol Tickers: IBM Plex Mono Bold/16px/tight tracking
  - Sentiment Scores: IBM Plex Mono SemiBold/varies/tabular-nums
  - Probabilities: IBM Plex Mono Medium/14px for percentage displays
  - Timestamps: Inter Regular/11px/60% opacity for metadata

## Animations
Animations should communicate data changes, guide attention to alerts, and provide smooth transitions between projection states without being distracting or slowing comprehension.

- **Purposeful Meaning**: Reality timelines fade in sequentially to tell a story, sentiment scores pulse on update with color flash, alerts slide in from top with urgent motion, trend arrows animate direction change, probability bars grow from zero on load
- **Hierarchy of Movement**: Critical downtrend alerts use bold slide-down with bounce, sentiment updates use subtle scale pulse (1.05x), reality transitions use smooth crossfade (300ms), chart data animates along path, hashtag trends shuffle with stagger effect

## Component Selection
- **Components**: 
  - Card for reality projections, sentiment summaries, hashtag trends, alert history
  - Badge for sentiment labels (Bullish/Bearish/Neutral), probability percentages, trend indicators
  - Button variants (primary for add symbol, destructive for remove, ghost for filters)
  - Tabs for switching between Realities/Sentiment/Hashtags/Alerts views
  - Alert/Banner for downtrend notifications at top of page
  - Progress bars for probability distributions and sentiment strength
  - Scroll Area for alert history and hashtag feed
  - Separator for content divisions between sections
  - Tooltip for explaining probability calculations and sentiment methodology
  - Chart components from recharts for timeline projections
  - Toast for real-time alert notifications
  - Input for symbol search with autocomplete
  
- **Customizations**: 
  - Multi-timeline chart showing parallel reality paths with diverging lines
  - Sentiment meter with gradient color fill based on score
  - Hashtag cloud with size based on volume and color based on sentiment
  - Alert panel with severity indicators and expandable details
  - Symbol card grid with real-time sentiment updates
  - Probability distribution bars with percentage labels
  
- **States**: 
  - Cards: Hover elevation increase (4px to 8px shadow), selected state with cyan border glow, pulse animation on data update
  - Buttons: Hover lift with scale (1.02x), active press (scale 0.98), loading state with spinner
  - Alerts: Enter with slide-down + bounce, exit with fade-up, severity affects animation speed
  - Sentiment scores: Color transition on change (red↔neutral↔green), scale pulse on significant shift
  - Reality timelines: Opacity changes for probability focus, selected timeline highlights with glow
  
- **Icon Selection**: 
  - TrendUp/TrendDown for sentiment direction and price movement
  - Bell/BellRinging for alerts and notifications
  - ChartLine for reality projections
  - Hash (#) for hashtag trends
  - Eye for watchlist
  - Plus/Minus for add/remove symbols
  - ArrowsClockwise for refresh/update
  - Warning for alert states
  - Brain/Sparkle for AI analysis indicators
  - CaretUp/CaretDown for trend arrows
  
- **Spacing**: Base 4px system with generous breathing room - 8/16/24/32px gaps, cards with 24px padding, sections with 40px vertical spacing, tight 8px gaps for related data points
- **Mobile**: 
  - Stack realities vertically instead of side-by-side
  - Sentiment dashboard becomes scrollable card list
  - Hashtag trends in compact list view
  - Bottom sheet for symbol addition
  - Alerts stack with swipe-to-dismiss
  - Collapsible sections for better space usage
  - Touch-friendly tap targets (48px minimum)
