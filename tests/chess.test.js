import test from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import { AI_LEVELS, parseBestMove } from '../src/engine.js';

test('initial position has twenty legal moves',()=>{const c=new Chess();assert.equal(c.moves().length,20);});
test('castling is legal when path is clear',()=>{const c=new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');assert.ok(c.moves().includes('O-O'));assert.ok(c.moves().includes('O-O-O'));});
test('en passant capture is generated and applied',()=>{const c=new Chess();for(const m of ['e4','a6','e5','d5'])c.move(m);assert.ok(c.moves({square:'e5',verbose:true}).some(m=>m.flags.includes('e')));c.move({from:'e5',to:'d6'});assert.equal(c.get('d5'),undefined);});
test('promotion choices are supported',()=>{const c=new Chess('8/P7/8/8/8/8/8/4k2K w - - 0 1');const m=c.move({from:'a7',to:'a8',promotion:'n'});assert.equal(m.promotion,'n');assert.equal(c.get('a8').type,'n');});
test('checkmate is recognized',()=>{const c=new Chess();for(const m of ['f3','e5','g4','Qh4#'])c.move(m);assert.equal(c.isCheckmate(),true);});
test('stalemate is recognized',()=>{const c=new Chess('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1');assert.equal(c.isStalemate(),true);});
test('threefold repetition is recognized',()=>{const c=new Chess();for(const m of ['Nf3','Nf6','Ng1','Ng8','Nf3','Nf6','Ng1','Ng8'])c.move(m);assert.equal(c.isThreefoldRepetition(),true);});
test('fifty move rule is recognized',()=>{const c=new Chess('8/8/8/8/8/8/4k3/4K2R w - - 100 51');assert.equal(c.isDraw(),true);});
test('AI profiles have increasing resource budgets',()=>{assert.equal(AI_LEVELS.length,8);assert.ok(AI_LEVELS[7].depth>AI_LEVELS[0].depth);assert.ok(AI_LEVELS[7].moveTime>AI_LEVELS[0].moveTime);});
test('UCI bestmove parser handles promotion and invalid output',()=>{assert.equal(parseBestMove('bestmove e7e8q ponder a2a4'),'e7e8q');assert.equal(parseBestMove('info depth 8'),'null'.replace('null', '')||null);});

test('insufficient material is drawn',()=>{const c=new Chess('8/8/8/8/8/8/4k3/4K3 w - - 0 1');assert.equal(c.isInsufficientMaterial(),true);assert.equal(c.isDraw(),true);});
test('legal move generator excludes moves that leave the king in check',()=>{const c=new Chess('4r1k1/8/8/8/8/8/8/4K3 w - - 0 1');assert.ok(c.isCheck());assert.ok(!c.moves().includes('Ke2'));});
test('castling through an attacked square is illegal',()=>{const c=new Chess('r3k2r/8/8/8/8/8/5r2/R3K2R w KQkq - 0 1');assert.ok(!c.moves().includes('O-O'));});
