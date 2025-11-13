# Fusion Starter

A production-ready full-stack React application template with integrated Express server.

## Quick Start

### Option 1: Using the batch file (Windows - Recommended)
Double-click `dev.bat` to start the development server.

### Option 2: Using Command Prompt (Windows)
```bash
# Open Command Prompt (cmd.exe) and run:
npm install
npm run dev
```

### Option 3: Fix PowerShell Execution Policy
If you want to use PowerShell, run this command **as Administrator**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then you can use `npm run dev` in PowerShell.

## Development

```bash
npm run dev        # Start dev server (client + server) on http://localhost:8080
npm run build      # Production build
npm start          # Start production server
npm run typecheck  # TypeScript validation
npm test           # Run Vitest tests
```

## Project Structure

```
/
├── pages/         # Route components
├── components/    # React components + UI library
├── hooks/         # React hooks
├── lib/           # Utilities
├── server/        # Express backend
├── shared/        # Shared types
└── public/        # Static assets
```

## Troubleshooting

### "vite is not recognized" error
1. Make sure dependencies are installed: `npm install`
2. Use `npx vite` instead of just `vite` (scripts are already updated)
3. Or use the `dev.bat` file provided

### PowerShell execution policy error
- Use Command Prompt instead of PowerShell
- Or fix the execution policy (see Option 3 above)
- Or use the `dev.bat` file

## Tech Stack

- **Frontend**: React 18 + React Router 6 + TypeScript + Vite + TailwindCSS
- **Backend**: Express server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS + Lucide React icons

