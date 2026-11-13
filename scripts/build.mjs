import fs from 'node:fs'; import path from 'node:path'; import { build as viteBuild } from 'vite';
const pkg=JSON.parse(fs.readFileSync('node_modules/stockfish/package.json','utf8'));
if(pkg.version!=='19.0.1') throw new Error(`Unexpected Stockfish version ${pkg.version}`);
await viteBuild({base:'./',build:{outDir:'dist',emptyOutDir:true}});
for(const f of fs.readdirSync('public')) fs.cpSync(path.join('public',f),path.join('dist',f),{recursive:true});
const engine='stockfish-19-lite-single';
for(const ext of ['js','wasm']) { const src=path.join('node_modules/stockfish/bin',`${engine}.${ext}`); if(!fs.existsSync(src)) throw new Error(`Missing Stockfish asset: ${src}`); fs.copyFileSync(src,path.join('dist',`${engine}.${ext}`)); }
if(fs.existsSync('sw.js')) fs.copyFileSync('sw.js',path.join('dist','sw.js'));
console.log('Built PWA and pinned Stockfish engine into dist/');
