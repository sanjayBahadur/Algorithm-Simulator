# Algorithm Simulator - Retro Arcade Edition

A production-ready Next.js application that visualizes algorithms with a 1980s neon arcade aesthetic.

## Features
- **Retro UI**: CRT scanlines, neon glows, and pixel-inspired components.
- **Modular Architecture**: Easy to add new algorithms by creating a new folder and registering it.
- **Interactive Controls**: Play, Pause, Reset, Step-by-step, and Speed control.
- **Initial Algorithms**:
  - **BFS (Breadth-First Search)**: Graph traversal using a queue.
  - **DFS (Depth-First Search)**: Graph traversal using a stack.
  - **Binary Search**: Fast searching in a sorted array.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Custom `useRunner` hook for playback logic.

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Adding a New Algorithm

The project is designed to be extensible. To add a new algorithm (e.g., `QuickSort`):

1.  **Create Folder**: `src/algorithms/quicksort/`
2.  **Define Runner**: Create `runner.ts` that exports a `createSteps` function. This function should return an array of `Step<TState>` objects.
3.  **Define View**: Create `View.tsx` which is a React component that takes the current state and renders the visualization.
4.  **Export Config**: Create `index.ts` exporting an `AlgorithmConfig` object.
5.  **Register**: Add your config to `src/algorithms/registry.ts`.

## Folder Structure
- `src/app`: Next.js pages and global styles.
- `src/components`: Reusable UI components (ArcadeFrame, Controls).
- `src/algorithms`: All algorithm-specific logic and views.
- `src/lib`: Core hooks and utilities (e.g., `useRunner`).

## Deployment
This app is ready to be deployed on **Vercel**. Just push your code to GitHub and connect the repository.

---
Built with ❤️ for Algorithm Enthusiasts.
