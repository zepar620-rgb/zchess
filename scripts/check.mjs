import fs from 'node:fs';
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
if(pkg.dependencies['chess.js']!=='1.4.0') throw new Error('chess.js must remain pinned to 1.4.0');
if(pkg.dependencies.stockfish!=='19.0.1') throw new Error('Stockfish must remain pinned to 19.0.1');
if(pkg.devDependencies.vite!=='6.4.6') throw new Error('Vite must remain pinned to the supported 6.4.6 line');
for(const f of ['index.html','styles.css','src/app.js','src/engine.js','tests/chess.test.js','.github/workflows/build.yml','manifest.webmanifest','sw.js']) if(!fs.existsSync(f)) throw new Error(`Missing ${f}`);
const workflow=fs.readFileSync('.github/workflows/build.yml','utf8');
for(const trigger of ['push:','pull_request:','workflow_dispatch:']) if(!workflow.includes(trigger)) throw new Error(`Missing workflow trigger ${trigger}`);
console.log('Static project checks passed. Runtime dependency and chess-rule tests require npm install.');
