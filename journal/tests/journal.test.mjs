import {videos} from '../videos.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {articles,practices,routes} from '../content/index.mjs';
import {parseBase,normalizeText,searchMatches,escapeHTML,validateContent} from '../lib.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const tmp=await fs.mkdtemp(path.join(os.tmpdir(),'zeland-journal-test-'));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
test.after(()=>fs.rm(tmp,{recursive:true,force:true}));

test('content references remain valid and routes contain existing material',()=>{
 assert.equal(articles.length,24);assert.equal(practices.length,6);
 validateContent(articles,practices,routes);
 assert.throws(()=>validateContent([{...articles[0],practice:'missing'}],practices,[]),/Missing practice/);
 assert.equal(new Set(articles.map(a=>a.title)).size,24);
 for(const article of articles){assert.ok(article.sections.length>=4,article.slug);assert.ok(article.sections.flat().join(' ').length>1000,article.slug);}
});
test('Russian full text search handles casing, punctuation, ё and multiple terms',()=>{
 assert.equal(normalizeText('ЕЩЁ, свой — выбор!'),'еще свой выбор');
 assert.equal(searchMatches({title:'Маятник',text:'Ещё одна устойчивая реакция'},'ЕЩЕ реакц'),true);
 assert.equal(searchMatches({title:'Маятник',text:'Ещё одна устойчивая реакция'},'реакция деньги'),false);
 assert.equal(searchMatches(articles[1],''),true);
});
test('paths and output text reject unsafe values',()=>{
 for(const bad of ['journal/','//example.com/','/../','/journal','/<script>/'])assert.throws(()=>parseBase(bad));
 assert.equal(parseBase('/journal/'),'/journal/');
 assert.equal(escapeHTML('<script>"&\''),'&lt;script&gt;&quot;&amp;&#39;');
});

for(const config of [{base:'/',published:false},{base:'/journal/',published:false},{base:'/journal/',published:true}]){
 test(`all pages, assets and internal fragments resolve (${config.base}, published=${config.published})`,async()=>{
  const out=path.join(tmp,(config.base==='/'?'root':'nested')+(config.published?'-public':''));
  execFileSync(process.execPath,[path.join(root,'build.mjs'),'--out',out,'--base',config.base,'--origin','https://example.org',...(config.published?['--published']:[])],{stdio:'pipe'});
  const manifest=JSON.parse(await fs.readFile(path.join(out,'build-manifest.json'),'utf8'));
  assert.equal(manifest.pages,50+videos.length);
  const pages=new Map();
  for(const route of manifest.routes)pages.set(config.base+route,await fs.readFile(path.join(out,route,'index.html'),'utf8'));
  for(const [url,html]of pages){
   assert.equal((html.match(/<h1\b/g)||[]).length,1,url);
   assert.ok(/<html lang="ru"/.test(html),url);
   assert.ok(html.includes('name="viewport"'),url);
   assert.ok(html.includes('rel="canonical"'),url);
   if(!config.published||url.endsWith('/saved/'))assert.match(html,/noindex/);
   for(const field of html.matchAll(/<input[^>]*type="password"[^>]*>/g))assert.ok(field[0].includes('disabled'),'preview must not collect credentials');
   assert.ok(!/<script[^>]+src="https?:/.test(html),'external analytics is not preloaded');
   for(const tag of html.matchAll(/<video\b[^>]*>/g)){assert.match(tag[0],/preload="none"/,'video must wait for play');assert.ok(!tag[0].includes('autoplay'));}
   for(const m of html.matchAll(/(?:href|src|action)="([^"]+)"/g)){
    const target=decode(m[1]);
    if(/^(https?:|mailto:|data:|tel:)/.test(target))continue;
    const parsed=new URL(target,'https://example.org'+url);
    assert.ok(parsed.pathname.startsWith(config.base),`${url}: escaped base ${target}`);
    if(pages.has(parsed.pathname)){
     if(parsed.hash){const id=decodeURIComponent(parsed.hash.slice(1));assert.ok(pages.get(parsed.pathname).includes(`id="${id}"`),`${url}: missing fragment ${target}`);}
    }else{const local=path.join(out,parsed.pathname.slice(config.base.length));await assert.doesNotReject(()=>fs.access(local),`${url}: missing asset ${target}`);}
   }
  }
  const index=JSON.parse(await fs.readFile(path.join(out,'assets/search-index.json'),'utf8'));
  assert.equal(index.length,30+videos.length);
  assert.ok(index.find(x=>x.slug==='mayatniki').text.length>1000);
  const map=await fs.readFile(path.join(out,'sitemap.xml'),'utf8');
  assert.ok(!map.includes('/saved/'));
  if(config.published)assert.ok(map.includes('https://example.org/journal/articles/mayatniki/'));else assert.ok(!map.includes('<url>'));
  assert.match(await fs.readFile(path.join(out,'404.html'),'utf8'),/noindex/);
 });
}
