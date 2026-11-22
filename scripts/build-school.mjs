import {execFileSync} from 'node:child_process';
import {rmSync,readFileSync,writeFileSync} from 'node:fs';
import postcss from 'postcss';
rmSync('public/school',{recursive:true,force:true});
execFileSync(process.execPath,['journal/build.mjs','--out','public/school','--base','/','--origin','https://zeland.it.com'],{stdio:'inherit'});
const html=readFileSync('public/school/learn/index.html','utf8');
const header=html.slice(html.indexOf('<a class="skip-link"'),html.indexOf('<main id="main"'));
const footer=html.slice(html.indexOf('<footer class="footer"'),html.indexOf('</body>'));
writeFileSync('public/school/chrome.json',JSON.stringify({header,footer}));
// Scope the school's exact styles to its header/footer, preserving the course content styles.
let css='';
for(const file of ['site.css','platform.css','depth.css','simple.css']){
 const root=postcss.parse(readFileSync('journal/assets/'+file,'utf8'));
 root.walkRules(rule=>{
  if(rule.parent.type==='atrule' && /keyframes$/.test(rule.parent.name))return;
  rule.selectors=rule.selectors.map(selector=>{
   if(selector.startsWith(':root'))return selector.replace(':root','.school-chrome');
   if(/^(body|html)(?=[ .:#[]|$)/.test(selector))return selector.replace(/^(body|html)/,'.school-chrome');
   return '.school-chrome '+selector;
  });
 });
 css+=root.toString();
}
css+='\n.school-chrome{font-family:Manrope,Arial,sans-serif;font-size:16px;line-height:1.7;color:#e0d6c8;background:#121110}.course-platform-content{background:#121110}.course-platform-content>section:first-child{min-height:640px;padding-top:70px}.course-local-nav{display:flex;flex-wrap:wrap;gap:12px 24px;max-width:1280px;margin:auto;padding:18px 25px;color:#b4aca0;font:14px Manrope,Arial,sans-serif;border-bottom:1px solid #3b362d}.course-local-nav a:hover{color:#ffcc66}@media(max-width:600px){.course-platform-content>section:first-child{min-height:560px;padding-top:42px}.course-local-nav{gap:12px 18px;padding:16px 20px;font-size:13px}}';
writeFileSync('public/school/assets/course-chrome.css',css);
