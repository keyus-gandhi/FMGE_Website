# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **NPM**: Package manager
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
/                        # Root directory
├── pages/               # Route components (Index.tsx = home)
├── components/          # React components
│   └── ui/             # Pre-built UI component library
├── hooks/               # React hooks
├── lib/                 # Utility functions
├── App.tsx              # App entry point with SPA routing setup
├── main.tsx             # Application entry point
├── global.css           # TailwindCSS 3 theming and global styles
├── index.html           # HTML template

server/                  # Express API backend
├── index.ts             # Main server setup (express config + routes)
└── node-build.ts        # Server build configuration

shared/                  # Types used by both client & server
└── api.ts               # Example of how to share api interfaces

public/                  # Static assets
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `pages/Index.tsx` represents the home page.
- Routes are defined in `App.tsx` using the `react-router-dom` import
- Route files are located in the `pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `global.css` 
- **UI components**: Pre-built library in `components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api  

### Shared Types
Import consistent types in both client and server:
```typescript
import { MyResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Root directory (for components, pages, hooks, lib, etc.)

## Development Commands

```bash
npm run dev        # Start dev server (client + server)
npm run build      # Production build
npm start          # Start production server
npm run typecheck  # TypeScript validation
npm test           # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Add the route handler directly in `server/index.ts` or create a separate file:
```typescript
// Option 1: Add directly in server/index.ts
app.get("/api/my-endpoint", (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
});

// Option 2: Create a separate handler file (server/handlers/my-route.ts)
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api";

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};

// Then import and use in server/index.ts:
import { handleMyRoute } from "./handlers/my-route";
app.get("/api/my-endpoint", handleMyRoute);
```

3. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api';

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `pages/MyPage.tsx`
2. Add route in `App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `npm run build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Deploy to any platform that supports Node.js (Vercel, Railway, Render, etc.)

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces
