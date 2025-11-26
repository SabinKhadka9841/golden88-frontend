# Next.js Project Structure

## Directory Tree

```
nextjs-version/
├── app/
│   ├── globals.css          # All styles (merged from index.css + App.css)
│   ├── layout.js            # Root layout with metadata
│   └── page.js              # Main app component (converted from App.jsx)
│
├── public/                  # Static assets (empty for now)
│
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration (external images)
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependencies
├── README.md               # Full documentation
├── QUICKSTART.md           # Quick start guide
└── PROJECT-STRUCTURE.md    # This file
```

## File Sizes

```
app/globals.css     ~7.5 KB   (all styling)
app/layout.js       ~250 B    (minimal layout)
app/page.js         ~13.5 KB  (all components and logic)
next.config.js      ~300 B    (config)
package.json        ~400 B    (deps)
```

**Total Source Code:** ~21.7 KB (excluding node_modules)

## Key Files Explained

### `app/layout.js`
Root layout component that wraps all pages. Contains:
- HTML structure
- Metadata (title, description)
- Global CSS import

### `app/page.js`
Main application component containing:
- All React components (Header, SideNav, Footer, etc.)
- Game data and categories
- State management
- Event handlers
- `'use client'` directive (required for browser features)

### `app/globals.css`
All styling merged from:
- Original `index.css` (main styles)
- Original `App.css` (additional styles)
- Plus some additions for new features

### `next.config.js`
Next.js configuration:
- External image domains whitelisted
- Can add more settings here (redirects, rewrites, etc.)

### `package.json`
Dependencies:
- `next` (14.2.0) - Next.js framework
- `react` (18.3.1) - React library
- `react-dom` (18.3.1) - React DOM
- `react-icons` (5.5.0) - Icon library
- `eslint` + `eslint-config-next` - Linting

## Component Structure (in page.js)

```
App (Main Component)
├── Header
│   ├── Menu Button
│   ├── Logo
│   └── User Info / Login Button
│
├── SideNav (Sliding Menu)
│   └── Navigation Links
│
├── Content
│   ├── LeftSidebar
│   │   ├── Info Posters
│   │   ├── Live RTP
│   │   ├── Social Follow
│   │   ├── LiveTransactions (auto-rotating)
│   │   └── Game List Preview
│   │
│   ├── Middle Column (Main Content)
│   │   ├── JackpotTicker (auto-incrementing)
│   │   ├── Game Categories Tabs
│   │   ├── Provider Grid
│   │   ├── Game Container (filtered by category)
│   │   ├── Testimonials
│   │   ├── TrustBadges
│   │   └── ResponsibleGamingSection
│   │
│   └── RightSidebar
│       ├── Partnership Video
│       ├── UserLoginPanel / UserDashboard (conditional)
│       └── Bottom Posters
│
├── Footer (Navigation)
│   └── 5 Navigation Items
│
└── GameDetailModal (conditional)
```

## State Management

```javascript
// Main App State
const [isSideNavOpen, setSideNavOpen] = useState(false);
const [activePage, setActivePage] = useState('home');
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [username, setUsername] = useState('');
const [balance, setBalance] = useState(0);
const [selectedGame, setSelectedGame] = useState(null);

// HomePage State
const [activeCategory, setActiveCategory] = useState(10);

// LiveTransactions State
const [transactions, setTransactions] = useState(...);

// JackpotTicker State
const [jackpot, setJackpot] = useState(123456.78);

// UserDashboard State
const [checkedInDays, setCheckedInDays] = useState(...);
```

## Data Structure

### Game Categories
```javascript
[
  { id: 10, name: "Event", icon: '...', selectedIcon: '...' },
  { id: 11, name: "Slot", icon: '...', selectedIcon: '...' },
  { id: 12, name: "Live", icon: '...', selectedIcon: '...' },
  { id: 13, name: "Sport", icon: '...', selectedIcon: '...' },
  { id: 14, name: "Other", icon: '...', selectedIcon: '...' },
]
```

### Games
```javascript
[
  {
    name: 'Gates of Olympus',
    category: 10,
    image: '...',
    provider: 'Pragmatic Play',
    rtp: '96.5%'
  },
  // ... 9 more games
]
```

### Transactions
```javascript
[
  {
    depositUser: '61******270',
    depositAmount: 'AUD 83.00',
    withdrawUser: '61******239',
    withdrawAmount: 'AUD 15.00',
    game: 'JOKER'
  },
  // ... more transactions
]
```

## Features

### Interactive Elements
- ✨ Sliding side navigation
- ✨ Category tabs for game filtering
- ✨ Game click → detail modal
- ✨ Login/logout system
- ✨ Footer page navigation
- ✨ Auto-rotating transaction feed
- ✨ Auto-incrementing jackpot
- ✨ Check-in calendar system

### Animations
- 🎯 Jackpot glow effect
- 🎯 Live dot blink
- 🎯 Ticker scroll
- 🎯 Game image hover zoom
- 🎯 Tab hover effects
- 🎯 Side nav slide transition

### Responsive Design
- 📱 Mobile-first approach
- 📱 Flexible grid layouts
- 📱 Media queries for tablets
- 📱 Column reordering on small screens

## Performance

### Build Output
```
Route (app)              Size     First Load JS
┌ ○ /                    5.27 kB        92.5 kB
└ ○ /_not-found          873 B          88.1 kB
```

### Optimization Opportunities
- Convert `<img>` to `<Image>` (save ~10-15 KB)
- Code split components (dynamic imports)
- Lazy load game images
- Add loading states
- Implement virtualization for game grid

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Next.js Features Used

✅ App Router (directory-based routing)
✅ Server Components (layout.js)
✅ Client Components (page.js with 'use client')
✅ Metadata API (SEO)
✅ CSS Modules support (using globals.css)
✅ Fast Refresh (hot module reload)
✅ Image domain configuration

## Next.js Features Available (Not Yet Used)

- [ ] Server Actions
- [ ] API Routes
- [ ] Dynamic Routes
- [ ] Middleware
- [ ] Image Optimization
- [ ] Font Optimization
- [ ] Script Optimization
- [ ] Internationalization

## Scalability Path

1. **Separate Components** → Create `app/components/` directory
2. **Add TypeScript** → Rename `.js` to `.tsx`
3. **API Routes** → Create `app/api/` directory
4. **Database** → Add Prisma/Drizzle ORM
5. **Authentication** → Add NextAuth.js
6. **State Management** → Add Zustand/Redux
7. **Forms** → Add React Hook Form
8. **Validation** → Add Zod

This structure is production-ready and can scale to a full casino platform! 🎰
