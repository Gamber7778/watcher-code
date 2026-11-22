const API='https://app.zeland.it.com/api/school/events';
const prefKey='zeland.journal.analytics';
function cookie(name){return document.cookie.split('; ').find(x=>x.startsWith(name+'='))?.slice(name.length+1);}
function setCookie(name,value){document.cookie=name+'='+value+'; Path=/; Max-Age=7776000; SameSite=Lax'+(location.hostname.endsWith('zeland.it.com')?'; Domain=zeland.it.com; Secure':'');}
export function consent(){const value=cookie('zeland_analytics');if(value==='yes'||value==='no')return value;try{return localStorage.getItem(prefKey);}catch{return null;}}
export function setConsent(value){setCookie('zeland_analytics',value);try{localStorage.setItem(prefKey,value);}catch{}if(value==='no'){document.cookie='zeland_device=; Path=/; Max-Age=0; Domain=zeland.it.com; Secure; SameSite=Lax';}}
export function trackSchool(type,properties={}){
 if(consent()!=='yes')return;
 setCookie('zeland_analytics','yes');
 let deviceId=cookie('zeland_device');if(!deviceId){deviceId=crypto.randomUUID();setCookie('zeland_device',deviceId);}
 const attribution={};const query=new URLSearchParams(location.search);
 for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_id']){const val=query.get(key);if(val&&/^[\p{L}\p{N}_. -]{1,100}$/u.test(val))attribution[key]=val;}
 try{if(document.referrer)attribution.referrer_host=new URL(document.referrer).hostname;}catch{}
 fetch(API,{method:'POST',credentials:'include',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({id:crypto.randomUUID(),deviceId,type,properties:{...attribution,...properties,page_path:location.pathname}})}).catch(()=>{});
}
