export const AI_LEVELS = [
  { name:'Easy', skill:0, depth:4, moveTime:120 },
  { name:'Normal', skill:3, depth:6, moveTime:250 },
  { name:'Medium', skill:7, depth:9, moveTime:450 },
  { name:'Hard', skill:11, depth:12, moveTime:800 },
  { name:'Expert', skill:15, depth:15, moveTime:1300 },
  { name:'Master', skill:18, depth:18, moveTime:2200 },
  { name:'Grandmaster', skill:20, depth:20, moveTime:3500 },
  { name:'Are You Sure?', skill:20, depth:22, moveTime:5000 }
];
export function parseBestMove(line) { const match = /^bestmove\s+([a-h][1-8][a-h][1-8][qrbn]?)/.exec(String(line)); return match?.[1] ?? null; }
