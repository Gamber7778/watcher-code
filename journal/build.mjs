import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {templates} from './templates.mjs';
import {articles,practices,routes,questions,createdAt} from './content/index.mjs';
import {parseBase,validateContent,escapeHTML} from './lib.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const args=process.argv.slice(2);
const arg=(name,fallback)=>{const index=args.indexOf(name);if(index===-1)return fallback;if(!args[index+1]||args[index+1].startsWith('--'))throw new Error('Missing value for '+name);return args[index+1];};
const out=path.resolve(arg('--out',path.join(root,'dist')));
const base=parseBase(arg('--base','/'));
const origin=new URL(arg('--origin','https://app.zeland.it.com')).origin;
const published=args.includes('--published');
if(out===root||root.startsWith(out+path.sep))throw new Error('Output may not overwrite source');
validateContent(articles,practices,routes);
const t=templates({base,origin,published});
const pages=new Map([
 ['',t.home()],['library/',t.library()],['practices/',t.library({practiceOnly:true})],
 ['saved/',t.library({saved:true})],['start/',t.start()],['books/',t.books()],
 ['questions/',t.questionsPage()],['learn/',t.learn()],['learn/pauza-i-vybor/',t.lessonPage()],
 ['account/',t.account()],['learn/first-module/',t.firstModule()],['course/',t.course()],['about/',t.about()],['contact/',t.contact()],['privacy/',t.privacy()],['terms/',t.terms()]
]);
for(const item of articles)pages.set('articles/'+item.slug+'/',t.material(item));
for(const item of practices)pages.set('practices/'+item.slug+'/',t.material(item));
for(const route of routes)pages.set('start/'+route.slug+'/',t.routePage(route));
await fs.mkdir(out,{recursive:true});
for(const [route,html]of pages){const dir=path.join(out,route);await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'index.html'),html);}
await fs.cp(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
await fs.copyFile(path.join(root,'lib.mjs'),path.join(out,'assets/lib.mjs'));
const index=[...articles,...practices].map(item=>({slug:item.slug,type:item.type,title:item.title,description:item.description,topic:item.topic,text:[item.title,item.description,...(item.tags||[]),...(item.sections||[]).flat(),item.goal||'',item.intro||'',...(item.steps||[]).flat(),...(item.questions||[]),...Object.values(item.workbook||{}).flat()].join(' ')}));
await fs.writeFile(path.join(out,'assets/search-index.json'),JSON.stringify(index));
const publicPages=[...pages.keys()].filter(r=>!['saved/','account/'].includes(r));
await fs.writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+(published?publicPages.map(route=>'<url><loc>'+escapeHTML(origin+base+route)+'</loc><lastmod>'+createdAt+'</lastmod></url>').join(''):'')+'</urlset>');
await fs.writeFile(path.join(out,'robots.txt'),published?'User-agent: *\nAllow: '+base+'\nDisallow: '+base+'saved/\nDisallow: '+base+'account/\nSitemap: '+origin+base+'sitemap.xml\n':'User-agent: *\nDisallow: /\n');
await fs.writeFile(path.join(out,'404.html'),t.missing());
await fs.writeFile(path.join(out,'_headers'),`${base}assets/*\n  Cache-Control: public, max-age=3600\n${base}*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);
await fs.writeFile(path.join(out,'build-manifest.json'),JSON.stringify({builtAt:new Date().toISOString(),contentDate:createdAt,base,origin,published,pages:pages.size,articles:articles.length,practices:practices.length,editorialQuestions:questions.length,routes:[...pages.keys()]},null,2));
console.log(JSON.stringify({out,base,pages:pages.size,articles:articles.length,practices:practices.length,published}));
