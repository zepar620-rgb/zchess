# Z:Chess — The Art of Strategy

Z:Chess is a responsive, installable chess web application with a dark espresso interface, warm wood board, verified legal-move indicators, local two-player matches, a Stockfish opponent, puzzles, move notation, match history, and persistent game state.

> **Platform decision:** no source repository was attached to the initial request and no Android SDK/Gradle installation was available in the build environment. This delivery is therefore a browser-first PWA. It can be installed from a supported browser on desktop or Android. It is not a native Android APK.

## Features

- **Full chess rules:** legal move validation, check/checkmate, stalemate, castling on both sides, en passant, promotion, threefold repetition, the fifty-move rule, and insufficient material are delegated to `chess.js`.
- **Computer opponent:** Stockfish.js 19 Lite Single-Threaded runs in a Web Worker. Eight profiles vary engine skill level, search depth, and move-time budget.
- **Local play:** two players share one device. The board can be flipped manually or automatically after each move.
- **Board interaction:** legal target dots are generated from `chess.js` verbose legal moves, with capture rings, selection, last-move and check highlights.
- **Clocks:** unlimited, 1+0, 3+0, 5+0, 10+0 and 15+10. The clock updates independently of engine search.
- **Move history:** SAN notation, move count, last-move highlighting, undo, and replay of completed matches.
- **Puzzles:** three sample positions with solution validation and hints.
- **Persistence:** settings, resumable games, and up to 60 completed matches are stored locally in browser storage.
- **Audio:** original Web Audio tones for selection, movement, captures, check, checkmate, and UI actions. Volume and sound can be disabled.
- **Installability:** PWA manifest, application artwork, splash screen, and service worker caching.

## Technology

| Area | Technology |
|---|---|
| UI | HTML, CSS, JavaScript modules |
| Chess rules | `chess.js` 1.4.0 |
| Engine | Stockfish.js 19.0.1 Lite Single-Threaded (WebAssembly) |
| Persistence | Local Storage |
| Audio | Web Audio API |
| Tests | Node.js built-in test runner |
| Build | Vite production bundler plus pinned engine asset copy |
| CI | GitHub Actions |

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A modern browser with Web Workers, WebAssembly, and Local Storage

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4173`.

The development command builds the static application and starts the included Node preview server. It serves the WebAssembly engine with the `application/wasm` MIME type.

## Test and build

```bash
npm test
npm run check
npm run build
npm run preview
```

`npm test` exercises castling, en passant, promotion, checkmate, stalemate, repetition, fifty-move draw, and AI profile / UCI parsing. `npm run build` copies the application shell, the ESM rules module, and Stockfish's JavaScript/WASM files into `dist/` and verifies the pinned dependency versions.

## GitHub Actions

The workflow at `.github/workflows/build.yml` runs on pushes, pull requests, and manual dispatch. It installs pinned dependencies, runs tests and static checks, builds the PWA, and uploads `dist/` as the `zchess-web-build` artifact.

To retrieve the result:

1. Open the repository's **Actions** tab.
2. Select the latest **Z:Chess Build** run.
3. Under **Artifacts**, download `zchess-web-build`.
4. Deploy the contents of `dist/` to any static host that serves JavaScript and WebAssembly with their correct MIME types.

## AI difficulty notes

The eight profiles are implemented in `src/engine.js`. They use progressively higher Stockfish Skill Level, depth, and move-time limits. The final two profiles use Skill Level 20, with Grandmaster and Are You Sure? increasing the search budget. The packaged lite network is considerably smaller than Stockfish's full build, so the upper levels are bounded by this engine build and the available device CPU.

## Data and privacy

Match history, current game, and preferences remain in the browser's Local Storage. The app does not require an account or send match data to a server. Stockfish is downloaded as part of the application build, not fetched from a remote engine service at match time.

## Licensing

The project is distributed under GPL-3.0-or-later because the bundled Stockfish.js engine is GPL-3.0. `chess.js` is BSD-2-Clause. See the upstream package metadata and licenses when redistributing the application. The generated Z:Chess application artwork is included in `public/assets/` and the install icons in `public/icons/`.

## Known scope limits

- This is a PWA, not a Kotlin/Android native project. Android APK/AAB signing and emulator instrumentation are not part of this build.
- The included puzzle set is a small starter library; it is not an online puzzle service or a rated puzzle database.
- Stockfish Lite is single-threaded to avoid cross-origin isolation requirements. Search depth and duration are capped to protect responsiveness on mid-range devices.
- Browser storage is device-local. Clearing browser data removes saved matches and preferences.
