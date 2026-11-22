export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function normalizeText(text) { return String(text).toLocaleLowerCase('ru').replace(/ё/g,'е').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim(); }
export function searchMatches(item, query) {
 const tokens=normalizeText(query).split(' ').filter(Boolean);
 const title=normalizeText(item.title); const body=normalizeText(item.text ?? item.description);
 return tokens.every(token => title.includes(token) || body.includes(token));
}
export function parseBase(value='/') {
 if(!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(value)) throw new Error('Base must be an absolute directory path ending in /');
 return value;
}
export function publicPath(item,base='/') { return base + (item.type==='practice'?'practices/':'articles/') + item.slug + '/'; }
export function readMinutes(text) {return Math.max(1,Math.ceil(text.split(/\s+/).filter(Boolean).length/155));}
export function validateContent(articles,practices,routes) {
 const slugs=new Set();
 for(const item of [...articles,...practices]){
  if(!/^[a-z0-9-]+$/.test(item.slug)||slugs.has(item.slug))throw new Error('Invalid or duplicate slug: '+item.slug);
  slugs.add(item.slug);
  if(!item.title||!item.description)throw new Error('Missing content: '+item.slug);
 }
 const a=new Set(articles.map(x=>x.slug)),p=new Set(practices.map(x=>x.slug));
 for(const item of [...articles,...practices]){
  if(item.practice&&!p.has(item.practice))throw new Error('Missing practice '+item.practice);
  for(const link of item.related??[])if(!a.has(link))throw new Error('Missing related article '+link);
 }
 for(const r of routes)for(const [type,slug]of r.items)if(!(type==='article'?a:p).has(slug))throw new Error('Missing route item '+slug);
}
