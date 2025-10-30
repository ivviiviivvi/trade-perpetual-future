# Planning Guide

A mock perpetual futures trading simulator with meme-style aesthetics that demonstrates trading UI patterns without real financial transactions.

**Experience Qualities**:
1. **Playful** - Meme-inspired design with fun animations and energetic colors that make trading feel accessible rather than intimidating
2. **Responsive** - Instant feedback on all interactions with smooth transitions that feel like a premium trading platform
3. **Clear** - Information hierarchy that makes complex trading concepts easy to understand at a glance

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple trading pairs, position management, and portfolio tracking with simulated balances and mock price feeds

## Essential Features

### Market Selection
- **Functionality**: Display available trading pairs (BTC-PERP, ETH-PERP, SOL-PERP) with current prices
- **Purpose**: Allow users to choose which asset to trade
- **Trigger**: On app load, market selector is visible
- **Progression**: View markets → Click market card → Selected market updates trading panel
- **Success criteria**: Market selection changes active trading pair and updates displayed price

### Long/Short Trading
- **Functionality**: Execute simulated long or short positions with size and leverage inputs
- **Purpose**: Demonstrate core perpetual futures trading mechanics
- **Trigger**: User clicks LONG or SHORT button after entering position size
- **Progression**: Enter position size → Select leverage → Click LONG/SHORT → Confirm → Position added to portfolio
- **Success criteria**: New position appears in positions list with correct parameters and simulated P&L

### Position Management
- **Functionality**: View open positions with real-time simulated P&L, close positions
- **Purpose**: Track active trades and manage portfolio
- **Trigger**: Automatically displayed when positions exist
- **Progression**: View positions → Monitor P&L → Click close button → Position removed
- **Success criteria**: Positions update with simulated price changes, closing updates balance

### Price Simulation
- **Functionality**: Mock price feed that randomly fluctuates within realistic bounds
- **Purpose**: Create realistic trading experience without real data
- **Trigger**: Runs automatically on interval
- **Progression**: Price updates → Position P&L recalculates → UI reflects changes
- **Success criteria**: Prices change smoothly, P&L updates correctly

### Portfolio Stats
- **Functionality**: Display total balance, unrealized P&L, total positions
- **Purpose**: Provide at-a-glance portfolio health
- **Trigger**: Always visible in header
- **Progression**: Open positions → Stats update → Close positions → Stats recalculate
- **Success criteria**: All stats accurately reflect current portfolio state

## Edge Case Handling
- **Insufficient Balance** - Disable trade button and show warning when position size exceeds available balance
- **Zero Position Size** - Require minimum position size of 0.01, disable trade button when empty
- **Maximum Leverage** - Cap leverage at 20x with visual indicator
- **No Positions** - Show friendly empty state with suggestion to open first trade
- **Negative Balance** - Allow trading simulator to go negative with warning banner (it's fake money)

## Design Direction
The design should feel like a meme stock trading app merged with pro trading terminal aesthetics - playful and approachable but functional. Think vibrant gradients, bold typography, and subtle animations that celebrate actions. A rich interface better serves the purpose since traders expect dense information displays.

## Color Selection
Triadic color scheme - Using the classic crypto trading palette with a playful twist featuring neon accents on dark backgrounds to feel energetic and modern.

- **Primary Color**: Deep purple (`oklch(0.25 0.15 285)`) - Represents the brand identity and main actions with a modern, tech-forward feel
- **Secondary Colors**: Dark slate (`oklch(0.15 0.02 260)`) for backgrounds, creating depth and focus
- **Accent Color**: Neon green (`oklch(0.75 0.20 145)`) for long positions and positive P&L, electric pink (`oklch(0.70 0.25 350)`) for short positions and negative P&L
- **Foreground/Background Pairings**:
  - Background (Dark slate `oklch(0.15 0.02 260)`): Light text (`oklch(0.95 0 0)`) - Ratio 13.2:1 ✓
  - Card (Slightly lighter slate `oklch(0.20 0.03 260)`): Light text (`oklch(0.95 0 0)`) - Ratio 10.8:1 ✓
  - Primary (Deep purple `oklch(0.25 0.15 285)`): White text (`oklch(1 0 0)`) - Ratio 8.5:1 ✓
  - Accent Long (Neon green `oklch(0.75 0.20 145)`): Dark text (`oklch(0.15 0.02 260)`) - Ratio 10.5:1 ✓
  - Accent Short (Electric pink `oklch(0.70 0.25 350)`): Dark text (`oklch(0.15 0.02 260)`) - Ratio 8.2:1 ✓

## Font Selection
Use Inter for its excellent legibility at all sizes and technical feel appropriate for a trading platform, paired with JetBrains Mono for numerical displays to ensure clear distinction between digits.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight tracking (-0.02em)
  - H2 (Section Headers): Inter SemiBold/20px/normal tracking
  - H3 (Market Names): Inter SemiBold/16px/normal tracking
  - Body (Labels): Inter Regular/14px/normal tracking
  - Price Display: JetBrains Mono Medium/24px/tight tracking
  - Position Numbers: JetBrains Mono Regular/14px/normal tracking
  - Small (Timestamps): Inter Regular/12px/normal tracking/muted color

## Animations
Animations should celebrate user actions and provide feedback - think quick, snappy transitions with occasional playful flourishes when positions are opened or closed to make trading feel rewarding.

- **Purposeful Meaning**: Use bounce animations when positions are opened, slide transitions for panel changes, and pulse effects on price updates to communicate activity and excitement
- **Hierarchy of Movement**: Primary actions (opening positions) get celebratory animations, price updates get subtle pulses, navigation gets smooth slides

## Component Selection
- **Components**: 
  - Card for market tiles and position cards with hover elevation
  - Button with variants (default for LONG in green, destructive for SHORT in pink)
  - Input for position size with clear focus states
  - Slider for leverage selection with visible markers
  - Badge for leverage display and position types
  - Separator for section divisions
  - ScrollArea for positions list when many trades exist
  - Tabs for switching between Open Positions / Closed Positions / History
  - Dialog for trade confirmation modals
  - Progress bars for leverage visualization
  
- **Customizations**: 
  - Custom gradient backgrounds for market cards
  - Animated number counters for P&L changes
  - Custom toggle component for Long/Short selection with smooth transition
  
- **States**: 
  - Buttons: Hover shows scale(1.02) transform, active shows scale(0.98), disabled shows reduced opacity
  - Inputs: Focus shows neon glow (ring color matches accent), error shows red ring
  - Cards: Hover shows elevated shadow, selected shows border glow
  
- **Icon Selection**: 
  - TrendUp/TrendDown for long/short indicators
  - X for closing positions
  - CaretUp/CaretDown for price movements
  - ChartLine for market selector
  - Wallet for balance display
  - Lightning for leverage indicator
  
- **Spacing**: Use 4px base unit - gaps of 4, 8, 16, 24 for consistent rhythm, generous 24px padding on cards, 16px for dense areas
- **Mobile**: Stack market selector vertically, collapse stats to 2-column grid, trading panel becomes full-width sheet from bottom, positions list takes full screen
