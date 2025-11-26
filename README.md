# Golden88 Clone - Next.js Version

This is a Next.js conversion of the Golden88 casino website clone, migrated from the original Vite + React implementation.

## Features

- **Next.js 14** with App Router
- **React 18** for UI components
- **Server-Side Rendering (SSR)** ready
- **Responsive Design** with mobile-first approach
- **Live Features:**
  - Progressive jackpot ticker
  - Live transaction feed
  - Real-time RTP tracking
- **Game Categories:** Event, Slot, Live, Sport, Other
- **User Authentication** (Login/Logout)
- **Game Modal** with detailed information
- **Multiple Pages:** Home, Promotions, History, Settings

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd nextjs-version
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
nextjs-version/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Main app component (converted from App.jsx)
│   └── globals.css        # Global styles (converted from index.css)
├── public/                # Static assets
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Key Differences from Vite Version

### 1. **'use client' Directive**
The main page component uses `'use client'` at the top because it relies on React hooks (`useState`, `useEffect`) and browser-only features.

### 2. **Image Optimization**
Next.js is configured to allow external images from:
- `golden88a.com`
- `inskingdom8.com`
- `ridgydidgebets.com`

You can optionally convert `<img>` tags to Next.js `<Image>` components for better optimization.

### 3. **Routing**
Currently using client-side state management for navigation. Can be enhanced with Next.js App Router for true multi-page navigation.

### 4. **No StrictMode Wrapper**
Next.js handles React StrictMode internally in development.

### 5. **Metadata**
SEO metadata is configured in `layout.js` instead of `index.html`.

## Build for Production

```bash
npm run build
npm start
```

This will create an optimized production build and start the production server.

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your-api-url
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure the root directory to `nextjs-version`
4. Deploy!

### Other Platforms

You can also deploy to:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Self-hosted** with Node.js

## Future Enhancements

- [ ] Convert to TypeScript for better type safety
- [ ] Implement Next.js App Router for real page navigation
- [ ] Add API routes for backend functionality
- [ ] Optimize images with Next.js `<Image>` component
- [ ] Add authentication with NextAuth.js
- [ ] Implement server-side data fetching
- [ ] Add database integration
- [ ] Implement progressive web app (PWA) features

## License

This is a demonstration project for educational purposes.

## Support

For issues or questions, please open an issue in the repository.
