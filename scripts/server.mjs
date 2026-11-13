import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.argv.includes('--preview') ? 'dist' : '.');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml','.wasm':'application/wasm'};
http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname); if(p==='/')p='/index.html'; const f=path.resolve(root,'.'+p); if(!f.startsWith(root)){res.writeHead(403).end();return;} fs.readFile(f,(e,b)=>{if(e){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(b);});}).listen(4173,()=>console.log(`Z:Chess at http://localhost:4173 (${root})`));
