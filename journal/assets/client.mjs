import {observeReading} from './reading-meter.mjs';
import {consent as telemetryConsent,setConsent,trackSchool} from './telemetry.mjs';
import {normalizeText,searchMatches} from './lib.mjs';

const base=document.body.dataset.base||'/';
let storeKey='zeland.journal.v1';
const authApi='https://app.zeland.it.com/api/auth';
let schoolUser=null,schoolSaved=[],authReady=Promise.resolve();
async function accountRequest(path,options={}){const response=await fetch(authApi+path,{credentials:'include',cache:'no-store',signal:AbortSignal.timeout(15000),...options,headers:{'Content-Type':'application/json',...options.headers}});const data=await response.json();if(!response.ok)throw new Error(data.error||'Не удалось выполнить запрос');return data;}
function returnLink(path,reason){return 'https://app.zeland.it.com/'+path+'?returnTo='+encodeURIComponent(reason==='learning'?'https://app.zeland.it.com/course':location.href);}
const consentKey='zeland.journal.analytics';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
let toastTimeout, state={saved:[],completed:[],notes:{},lesson:[],routes:[]};
const toast=(message)=>{const el=$('.toast');if(!el)return;el.textContent=message;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.hidden=true,4500);};
const safeKey=s=>typeof s==='string'&&/^(article|practice|lesson|route):[a-z0-9-]+(?::\d+)?$/.test(s);
function cleanState(raw={}){
 const clean={saved:[],completed:[],notes:{},lesson:[],routes:[]};
 for(const key of ['saved','completed','routes'])clean[key]=Array.isArray(raw[key])?[...new Set(raw[key].filter(safeKey))].slice(0,500):[];
 clean.lesson=Array.isArray(raw.lesson)?[...new Set(raw.lesson.filter(x=>['idea','practice','action'].includes(x)))]:[];
 if(raw.notes&&typeof raw.notes==='object'&&!Array.isArray(raw.notes))for(const [key,value]of Object.entries(raw.notes))if(safeKey(key)&&typeof value==='string')clean.notes[key]=value.slice(0,12000);
 return clean;
}

function persist(next){state=next;return true;}
function update(changes){if(!schoolUser&&Object.keys(changes).length){openAuth('register','progress');return false;}const previous=state;if(!persist({...state,...changes}))return false;queueProgress(previous,state);refreshPersonalProgress();return true;}
function toggleValue(key,value){const next=state[key].includes(value)?state[key].filter(x=>x!==value):[...state[key],value];return update({[key]:next});}
let progressOwner=null,progressPending={},progressSyncing=false,progressAvailable=false;
function progressStatus(message){for(const el of $$('[data-progress-storage]'))el.textContent=message||(!schoolUser?'Чтобы сохранять попытки и записи, войдите или создайте бесплатный аккаунт.':!progressAvailable?'Не удалось загрузить прогресс. Обновите страницу для повторной попытки.':Object.keys(progressPending).length?'Сохраняем изменения…':'Прогресс сохранён в аккаунте');}
function rememberPending(){}
function queueProgress(previous,next){
 if(!schoolUser)return;
 const entries=value=>new Set([...value.completed,...value.routes,...value.lesson.map(step=>'lesson:pauza-i-vybor:'+['idea','practice','action'].indexOf(step))]);
 const before=entries(previous),after=entries(next),keys=new Set([...before,...after,...Object.keys(previous.notes),...Object.keys(next.notes)]);
 for(const material of keys){if(!/^(practice|lesson|route):/.test(material))continue;const patch={};if(before.has(material)!==after.has(material))patch.completed=after.has(material);if(previous.notes[material]!==next.notes[material])patch.note=next.notes[material]||'';if(Object.keys(patch).length)progressPending[material]={...progressPending[material],...patch};}
 rememberPending();void flushProgress();
}
async function flushProgress(){
 if(progressSyncing||!schoolUser||!progressAvailable)return;progressSyncing=true;const owner=progressOwner;progressStatus();
 try{for(const material of Object.keys(progressPending)){if(owner!==progressOwner)break;const patch=progressPending[material];await accountRequest('/progress',{method:'PUT',body:JSON.stringify({material,...patch})});if(owner!==progressOwner)break;if(progressPending[material]===patch)delete progressPending[material];rememberPending();}}
 catch{progressStatus('Не удалось сохранить в аккаунте. Не закрывайте страницу и повторите сохранение.');for(const b of $$('[data-progress-retry]'))b.hidden=false;return;}
 finally{progressSyncing=false;}
 progressStatus();for(const b of $$('[data-progress-retry]'))b.hidden=true;
 if(Object.keys(progressPending).length)void flushProgress();
}
function renderProgressState(){refreshCompletion();refreshRoutes();refreshLesson();refreshPersonalProgress();if(!unsavedNotes)for(const field of $$('[data-note]'))field.value=state.notes[field.dataset.note]||'';progressStatus();}
async function loadAccountProgress(user){
 const owner=user?String(user.id):'guest';
 if(owner!==progressOwner){progressOwner=owner;progressAvailable=false;state=cleanState();progressPending={};unsavedNotes=false;renderProgressState();}
 if(!user){progressAvailable=false;return;}
 try{const data=await accountRequest('/progress');if(progressOwner!==owner)return;progressAvailable=true;
 if(!progressSyncing&&!unsavedNotes){const completed=[],notes={},routeSteps=[],lessonSteps=[];
 const merged=new Map(data.items.map(item=>[item.material,{completed:!!item.completed,note:item.note}]));
 for(const [key,patch]of Object.entries(progressPending))merged.set(key,{...merged.get(key),...patch});
 for(const [key,item]of merged){if(item.completed){if(key.startsWith('route:'))routeSteps.push(key);else if(/^lesson:pauza-i-vybor:\d$/.test(key)){const step=['idea','practice','action'][Number(key.split(':')[2])];if(step)lessonSteps.push(step);}else completed.push(key);}if(item.note)notes[key]=item.note;}
 persist({...state,completed,notes,routes:routeSteps,lesson:lessonSteps});renderProgressState();}

 await flushProgress();
 }catch{progressStatus('Не удалось загрузить прогресс аккаунта. Проверьте соединение и обновите страницу.');}
}
window.addEventListener('online',()=>void flushProgress());
for(const b of $$('[data-progress-retry]'))b.addEventListener('click',()=>void flushProgress());
function consentValue(){return telemetryConsent();}
let analyticsReady=false;
const gaId=document.body.dataset.analyticsId;
function safeLocation(url){try{const v=new URL(url);return v.origin+v.pathname;}catch{return '';}}
let schoolAnalyticsStarted=false;
function startAnalytics(){
 if(consentValue()!=='yes')return;
 if(/^G-[A-Z0-9]+$/.test(gaId||'')){
  window['ga-disable-'+gaId]=false;
  if(analyticsReady)window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  else{
   window.dataLayer=window.dataLayer||[];
   window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
   window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
   window.gtag('js',new Date());
   window.gtag('config',gaId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:safeLocation(location.href),page_referrer:safeLocation(document.referrer)});
   const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(gaId);document.head.append(script);analyticsReady=true;
  }
 }
 if(schoolAnalyticsStarted)return;
 schoolAnalyticsStarted=true;
 const params=new URLSearchParams(location.search),attribution={};
 for(const [key,name]of [['utm_source','campaign_source'],['utm_medium','campaign_medium'],['utm_campaign','campaign_name'],['utm_content','campaign_content'],['utm_id','campaign_id']]){const value=params.get(key);if(value&&/^[\p{L}\p{N}_. -]{1,100}$/u.test(value))attribution[name]=value;}
 event('page_view',{...attribution,page_title:document.title});
 const material=$('[data-material]')?.dataset.material;
 if(material)event(material.startsWith('practice:')?'practice_open':'article_open',{material_id:material});
 if(location.pathname.replace(/\/$/,'')==='/course')event('course_view');
 if($('[data-lesson]'))event('lesson_start',{lesson_id:'pauza-i-vybor'});
 const player=$('[data-library-player]');
 if(player)event('video_open',{material_id:'video:'+player.dataset.libraryPlayer,topic:player.dataset.videoTopic});
}
function event(name,params={}){if(consentValue()!=='yes')return;trackSchool(name,params);const payload={...params,page_location:safeLocation(location.href),page_path:location.pathname};window.dispatchEvent(new CustomEvent('zeland:analytics',{detail:{event:name,...payload}}));if(analyticsReady)window.gtag('event',name,payload);}
startAnalytics();

const menuDialog=$('#school-menu'),authDialog=$('#school-auth');
function syncDialogScroll(){document.body.style.overflow=menuDialog?.open||authDialog?.open?'hidden':'';}
function closeMenu(){menuDialog?.close();for(const b of $$('[data-menu-open]'))b.setAttribute('aria-expanded','false');syncDialogScroll();}
for(const b of $$('[data-menu-open]'))b.addEventListener('click',()=>{menuDialog.showModal();b.setAttribute('aria-expanded','true');syncDialogScroll();});
for(const b of $$('[data-menu-close]'))b.addEventListener('click',closeMenu);
menuDialog?.addEventListener('close',()=>{for(const b of $$('[data-menu-open]'))b.setAttribute('aria-expanded','false');syncDialogScroll();});
function authTab(tab){
 for(const b of $$('[data-auth-tab]')){const selected=b.dataset.authTab===tab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;}
 for(const panel of $$('[data-auth-panel]'))panel.hidden=panel.dataset.authPanel!==tab;
}
function openAuth(tab='register',reason=''){
 if(schoolUser){if(reason==='learning')location.href='https://app.zeland.it.com/course';else if(reason==='forum')openForumComposer();else location.href=base+'account/';return;}
 if(reason==='forum'&&!forumDraft())forumDraft({thread:'',resume:true});
 closeMenu();authTab(tab);
 for(const link of $$('a[href]',authDialog)){if(link.href.startsWith('https://app.zeland.it.com/login'))link.href=returnLink('login',reason);if(link.href.startsWith('https://app.zeland.it.com/register'))link.href=returnLink('register',reason);}
 const context=$('#auth-context');
 const messages={progress:'Создайте бесплатный аккаунт или войдите, чтобы сохранять заметки, попытки практик и маршруты. После входа вы вернётесь сюда.',forum:'Войдите, чтобы опубликовать тему или ответить. После входа вы вернётесь к обсуждению.',learning:'Войдите, чтобы перейти к доступным урокам.',save:'Войдите или создайте аккаунт. После входа вы вернётесь к материалу, и он появится в сохранённом.'};
 if(context)context.textContent=messages[reason]||'Один аккаунт для школы и учебного кабинета. После входа вы вернётесь на эту страницу.';
 authDialog.showModal();syncDialogScroll();$('.auth-tabs [aria-selected="true"]')?.focus();
}
for(const b of $$('[data-auth-open]'))b.addEventListener('click',async()=>{await authReady;openAuth(b.dataset.authOpen==='register'?'register':'login',b.dataset.authReason);});
for(const b of $$('[data-auth-close]'))b.addEventListener('click',()=>authDialog.close());
for(const b of $$('[data-auth-tab]')){
 b.addEventListener('click',()=>authTab(b.dataset.authTab));
 b.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tab=event.key==='Home'?'login':event.key==='End'?'register':b.dataset.authTab==='login'?'register':'login';authTab(tab);$('[data-auth-tab="'+tab+'"]').focus();});
}
authDialog?.addEventListener('close',syncDialogScroll);
for(const dialog of [menuDialog,authDialog])dialog?.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
const searchPanel=$('#school-search-panel'), searchToggle=$('[data-search-open]');
function openSearch(){if(!searchPanel)return;searchPanel.hidden=false;searchToggle?.setAttribute('aria-expanded','true');$('#header-query')?.focus();}
searchToggle?.addEventListener('click',()=>{const opening=searchPanel.hidden;searchPanel.hidden=!opening;searchToggle.setAttribute('aria-expanded',String(opening));if(opening)$('#header-query')?.focus();});
$('#header-query')?.addEventListener('keydown',event=>{if(event.key==='Escape'){searchPanel.hidden=true;searchToggle?.setAttribute('aria-expanded','false');searchToggle?.focus();}});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();const input=$('#search');if(input)input.focus();else openSearch();}});

function renderBookmarks(){for(const btn of $$('[data-save]')){btn.setAttribute('aria-pressed',String(schoolSaved.includes(btn.dataset.save)));const label=$('span',btn);if(label)label.textContent=schoolSaved.includes(btn.dataset.save)?'Сохранено':'Сохранить';}libraryFilter?.();}
async function saveMaterial(material,saved){await accountRequest('/bookmarks',{method:'PUT',body:JSON.stringify({material,saved})});schoolSaved=saved?[...new Set([...schoolSaved,material])]:schoolSaved.filter(x=>x!==material);renderBookmarks();toast(saved?'Материал сохранён в вашем аккаунте':'Материал удалён из сохранённого');}
for(const btn of $$('[data-save]'))btn.addEventListener('click',async()=>{
 btn.disabled=true;try{await authReady;if(!schoolUser){try{sessionStorage.setItem('zeland.pending-save',btn.dataset.save);}catch{}openAuth('register','save');return;}await saveMaterial(btn.dataset.save,!schoolSaved.includes(btn.dataset.save));}catch(error){toast(error.message);}finally{btn.disabled=false;}
});
for(const btn of $$('[data-share]'))btn.addEventListener('click',async()=>{const clean=new URL(location.href);clean.search='';clean.hash='';try{if(navigator.share){await navigator.share({title:document.title,url:clean.href});}else{await navigator.clipboard.writeText(clean.href);toast('Ссылка скопирована');}}catch(err){if(err.name!=='AbortError')toast('Не удалось скопировать. Адрес можно скопировать из строки браузера.');}});
for(const textarea of $$('[data-note]'))textarea.value=state.notes[textarea.dataset.note]||'';
for(const btn of $$('[data-save-note]'))btn.addEventListener('click',async()=>{await authReady;if(!schoolUser){openAuth('register','progress');return;}const field=$$('[data-note]').find(x=>x.dataset.note===btn.dataset.saveNote);if(field&&update({notes:{...state.notes,[btn.dataset.saveNote]:field.value.trim()}})){unsavedNotes=false;toast('Запись отправлена на сохранение в аккаунт');}});
let unsavedNotes=false;
for(const textarea of $$('[data-note]'))textarea.addEventListener('input',()=>unsavedNotes=true);
for(const btn of $$('[data-save-note]'))btn.addEventListener('click',()=>{unsavedNotes=$$('[data-note]').some(f=>f.value.trim()!==(state.notes[f.dataset.note]||''));});
window.addEventListener('beforeunload',e=>{if(unsavedNotes||Object.keys(progressPending).length){e.preventDefault();e.returnValue='';}});
function refreshCompletion(){for(const btn of $$('[data-complete]')){const done=state.completed.includes(btn.dataset.complete);btn.setAttribute('aria-pressed',String(done));btn.textContent=done?'Попытка отмечена — отменить':'Я попробовал(а)';}}
refreshCompletion();
for(const btn of $$('[data-complete]'))btn.addEventListener('click',async()=>{await authReady;if(!schoolUser){openAuth('register','progress');return;}const key=btn.dataset.complete,done=state.completed.includes(key),completed=state.completed.filter(k=>k!==key);if(!done)completed.push(key);const field=$$('[data-note]').find(x=>x.dataset.note===key),notes=field?{...state.notes,[key]:field.value.trim()}:state.notes;if(!update({completed,notes}))return;unsavedNotes=false;refreshCompletion();toast(done?'Отметка попытки снята':'Попытка отмечена — сохраняем в аккаунт');event('practice_completion_marked',{material_id:key,completed:!done});});
function refreshRoutes(){for(const btn of $$('[data-route-complete]')){const done=state.routes.includes(btn.dataset.routeComplete);btn.setAttribute('aria-pressed',String(done));btn.textContent=done?'Шаг отмечен — отменить':'Отметить шаг пройденным';}}
refreshRoutes();for(const btn of $$('[data-route-complete]'))btn.addEventListener('click',async()=>{await authReady;if(!schoolUser){openAuth('register','progress');return;}if(toggleValue('routes',btn.dataset.routeComplete))refreshRoutes();});
function refreshLesson(){const checkboxes=$$('[data-lesson-step]');if(!checkboxes.length)return;for(const cb of checkboxes)cb.checked=state.lesson.includes(cb.dataset.lessonStep);$('#lesson-progress').value=state.lesson.length;$('#lesson-count').textContent=state.lesson.length+' из 3 шагов отмечено';$('.lesson-finish').hidden=state.lesson.length!==3;}
refreshLesson();for(const cb of $$('[data-lesson-step]'))cb.addEventListener('change',async()=>{const checked=cb.checked;await authReady;if(!schoolUser){refreshLesson();openAuth('register','progress');return;}cb.checked=checked;const next=cb.checked?[...new Set([...state.lesson,cb.dataset.lessonStep])]:state.lesson.filter(x=>x!==cb.dataset.lessonStep);if(!update({lesson:next})){refreshLesson();return;}refreshLesson();event('lesson_step_marked',{lesson_id:'pauza-i-vybor',step_id:cb.dataset.lessonStep,completed:cb.checked});if(next.length===3)event('lesson_completion_marked',{lesson_id:'pauza-i-vybor'});});

const reader=$('.reading-progress');
if(reader){let scheduled=false,reported=false;const progress=()=>{scheduled=false;const el=$('.article-body'),rect=el.getBoundingClientRect(),total=Math.max(1,el.scrollHeight-innerHeight);const value=Math.min(100,Math.max(0,(-rect.top)/total*100));reader.value=value;if(value>=90&&!reported&&consentValue()==='yes'){reported=true;event('article_scroll_depth',{depth_percent:90,material_id:el.dataset.material});}};addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress);}},{passive:true});progress();}

let libraryFilter=null;
function refreshPersonalProgress(){
 const section=$('[data-personal-progress]');if(!section)return;let visible=0;
 for(const row of $$('[data-progress-key]',section)){const key=row.dataset.progressKey,note=Boolean(state.notes[key]?.trim()),done=state.completed.includes(key),lesson=key.startsWith('lesson:')?state.lesson.length:0,steps=state.completed.filter(x=>x.startsWith(key+':')).length;row.hidden=!note&&!done&&!lesson&&!steps;if(!row.hidden)visible++;$('[data-progress-label]',row).textContent=[steps&&!done?'Есть предыдущая попытка':'',note?'Есть личная запись':'',done?'Попытка отмечена':'',lesson?lesson+' из 3 шагов':''].filter(Boolean).join(' · ');}
 section.hidden=visible===0;
}
refreshPersonalProgress();
const library=$('#library');
if(library){
 const input=$('#search'),format=$('#format'),cards=$$('[data-item]',library),params=new URLSearchParams(location.search),topicButtons=$$('[data-topic-filter]');
 const allowedTopics=['all','basics','choice','attention','life'];let selectedTopic=allowedTopics.includes(params.get('topic'))?params.get('topic'):'all';
 let selectedFormat=library.dataset.practiceOnly==='true'?'practice':['all','article','practice','video'].includes(params.get('format'))?params.get('format'):'all';
 input.value=(params.get('q')||'').slice(0,200);if(format)format.value=selectedFormat;
 const map=new Map(cards.map(el=>[el.dataset.item,{title:$('h3',el).textContent,description:$('p',el).textContent,text:$('h3',el).textContent+' '+$('p',el).textContent}]));
 let fullTextLoaded=false;
 const apply=({url=true}={})=>{let count=0;const query=input.value.trim();for(const el of cards){const item=map.get(el.dataset.item),visible=(selectedTopic==='all'||selectedTopic===el.dataset.topic)&&(selectedFormat==='all'||selectedFormat===el.dataset.format)&&(library.dataset.savedOnly!=='true'||schoolSaved.includes(el.dataset.item))&&searchMatches(item,query);el.hidden=!visible;if(visible)count++;}$('#result-count').textContent='Найдено материалов: '+count;$('.empty-state',library).hidden=count!==0;for(const b of topicButtons){const active=b.dataset.topicFilter===selectedTopic;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}if(url){const next=new URL(location.href);for(const key of ['q','topic','format'])next.searchParams.delete(key);if(query)next.searchParams.set('q',query);if(selectedTopic!=='all')next.searchParams.set('topic',selectedTopic);if(selectedFormat!=='all'&&library.dataset.practiceOnly!=='true')next.searchParams.set('format',selectedFormat);history.replaceState(null,'',next.pathname+next.search+next.hash);}};
 libraryFilter=apply;apply({url:false});
 fetch(base+'assets/search-index.json').then(r=>{if(!r.ok)throw new Error('Search unavailable');return r.json();}).then(items=>{for(const item of items)map.set(item.type+':'+item.slug,item);fullTextLoaded=true;apply({url:false});}).catch(()=>{$('.search-error').hidden=false;});
 let debounce;input.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(()=>apply(),90);});
 $('.search-form').addEventListener('submit',e=>{e.preventDefault();clearTimeout(debounce);apply();event('library_search',{query_length:input.value.length,full_text:fullTextLoaded});});
 for(const btn of topicButtons)btn.addEventListener('click',()=>{selectedTopic=btn.dataset.topicFilter;apply();event('library_filter',{topic:selectedTopic,format:selectedFormat});});
 format?.addEventListener('change',()=>{selectedFormat=format.value;apply();event('library_filter',{topic:selectedTopic,format:selectedFormat});});
 $('[data-clear-filters]').addEventListener('click',()=>{input.value='';selectedTopic='all';selectedFormat=library.dataset.practiceOnly==='true'?'practice':'all';if(format)format.value='all';apply();input.focus();});
 addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);input.value=(p.get('q')||'').slice(0,200);selectedTopic=allowedTopics.includes(p.get('topic'))?p.get('topic'):'all';selectedFormat=library.dataset.practiceOnly==='true'?'practice':['all','article','practice','video'].includes(p.get('format'))?p.get('format'):'all';if(format)format.value=selectedFormat;apply({url:false});});
}

for(const btn of $$('[data-q-filter]'))btn.addEventListener('click',()=>{for(const b of $$('[data-q-filter]')){const active=btn===b;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}for(const row of $$('[data-question-category]'))row.hidden=btn.dataset.qFilter!=='all'&&btn.dataset.qFilter!==row.dataset.questionCategory;});

$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const field=$('#question-text'),body=field.value.trim();if(!body){field.setCustomValidity('Напишите, пожалуйста, ваш вопрос.');field.reportValidity();return;}field.setCustomValidity('');const message='Здравствуйте! Вопрос из журнала Zeland.\nТема: '+$('#question-topic').value+'\n\n'+body;$('#contact-link').href='https://t.me/vadim_ze?text='+encodeURIComponent(message);$('#contact-result').hidden=false;$('#contact-link').focus();});
$('#question-text')?.addEventListener('input',e=>e.target.setCustomValidity(''));
$('#contact-link')?.addEventListener('click',()=>event('team_question_open',{channel:'telegram'}));
for(const link of $$('[data-event]'))link.addEventListener('click',()=>event(link.dataset.event));

const video=$('[data-video]');
$('.video-trigger')?.addEventListener('click',()=>{const player=document.createElement('video');player.controls=true;player.playsInline=true;player.preload='metadata';player.src=video.dataset.video;player.poster=video.dataset.poster;player.setAttribute('aria-label','Вводное видео о практикуме «Код Смотрителя»');$('.video-trigger').replaceWith(player);const description=$('.local-note',video);description.textContent='Вводное видео с действующего сайта практикума.';player.addEventListener('error',()=>{description.textContent='Видео не загрузилось. Его можно открыть на zeland.it.com.';const link=document.createElement('a');link.className='text-link';link.href='https://zeland.it.com/#video';link.textContent='Открыть видео на сайте практикума';if(!$('a',video))video.append(link);});player.play().catch(()=>{});event('course_intro_play');});

const consentPanel=$('#consent-panel');let previousFocus;
function closeConsent(){if(!consentPanel)return;consentPanel.hidden=true;document.body.style.overflow='';previousFocus?.focus();}
for(const btn of $$('[data-consent-open]'))btn.addEventListener('click',()=>{previousFocus=document.activeElement;consentPanel.hidden=false;document.body.style.overflow='hidden';$('[data-consent="no"]').focus();});
$('[data-consent-close]')?.addEventListener('click',closeConsent);
consentPanel?.addEventListener('click',e=>{if(e.target===consentPanel)closeConsent();});
consentPanel?.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeConsent();}if(e.key==='Tab'){const list=$$('button,a',consentPanel),first=list[0],last=list.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
for(const btn of $$('[data-consent]'))btn.addEventListener('click',()=>{try{setConsent(btn.dataset.consent);document.querySelector('[data-statistics-banner]')?.remove();}catch{toast('Не удалось сохранить выбор. Статистика останется выключенной.');return;}if(btn.dataset.consent==='yes')startAnalytics();else{window['ga-disable-'+gaId]=true;if(window.gtag)window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}closeConsent();toast(btn.dataset.consent==='yes'?'Статистика включена по вашему согласию':'Отправка статистики выключена');});
window.addEventListener('storage',e=>{if(e.key===consentKey){if(e.newValue==='yes')startAnalytics();else window['ga-disable-'+gaId]=true;}});
// Search the complete demonstration feed; no profile or post is sent to a server.
const forumSearch=$('#forum-search');let forumThreads=$$('[data-forum-category]');
let forumTag='all';
function filterForum(){
 const query=normalizeText(forumSearch?.value||'').split(' ').filter(Boolean);let count=0;
 for(const thread of forumThreads){const text=normalizeText(thread.textContent);const visible=(forumTag==='all'||thread.dataset.forumCategory===forumTag)&&query.every(word=>text.includes(word));thread.hidden=!visible;if(visible)count++;}
 for(const b of $$('[data-forum-filter]')){const active=b.dataset.forumFilter===forumTag;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
 const selectedLabel=$('[data-forum-selected]');if(selectedLabel)selectedLabel.textContent=forumTag==='all'?'Все темы':forumTag;
 if($('.forum-count'))$('.forum-count').textContent='Темы: '+count;
 if($('.forum-empty'))$('.forum-empty').hidden=count!==0;
}
for(const b of $$('[data-forum-filter]'))b.addEventListener('click',()=>{forumTag=b.dataset.forumFilter;filterForum();});
forumSearch?.addEventListener('input',filterForum);
$('[data-forum-reset]')?.addEventListener('click',()=>{forumTag='all';forumSearch.value='';filterForum();forumSearch.focus();});
function revealTopic(){if(!/^#topic-[a-z0-9-]+$/.test(location.hash))return;const topic=document.getElementById(location.hash.slice(1));if(!topic?.matches('[data-forum-category]'))return;forumTag='all';if(forumSearch)forumSearch.value='';filterForum();topic.open=true;topic.scrollIntoView({block:'start'});}
if(forumThreads.length){filterForum();revealTopic();window.addEventListener('hashchange',revealTopic);}


// Forum ordering and discovery remain local to the page; no fabricated activity.
$('#forum-sort')?.addEventListener('change',e=>{
 const sorted=[...forumThreads].sort((a,b)=>e.target.value==='replies'?Number(b.dataset.forumReplies)-Number(a.dataset.forumReplies)||Number(a.dataset.forumOrder)-Number(b.dataset.forumOrder):Number(a.dataset.forumOrder)-Number(b.dataset.forumOrder));
 const parent=$('.forum-threads'),empty=$('.forum-empty');for(const thread of sorted)parent.insertBefore(thread,empty);
});
$('[data-forum-collapse]')?.addEventListener('click',()=>{for(const thread of forumThreads)thread.open=false;toast('Обсуждения свёрнуты. Выберите интересующий вопрос.');});
for(const b of $$('[data-forum-person]'))b.addEventListener('click',()=>{forumTag='all';forumSearch.value=b.dataset.forumPerson;filterForum();forumSearch.focus();forumSearch.scrollIntoView({block:'center'});});
for(const b of $$('[data-note-template]'))b.addEventListener('click',()=>{const field=$('[data-note]');if(!field)return;const template=b.dataset.noteTemplate;if(!field.value.includes(template)){field.value=(field.value.trim()?field.value.trim()+'\n\n':'')+template;field.dispatchEvent(new Event('input',{bubbles:true}));}field.focus();toast('Вопросы добавлены. Заполните запись и нажмите «Сохранить наблюдение».');});

// The session cookie belongs only to App Zeland. The school reads it through its authenticated API.
async function refreshSchoolSession(){
 const {user}=await accountRequest('/session');schoolUser=user;schoolSaved=[];
 await loadAccountProgress(user);
 if(user){schoolSaved=(await accountRequest('/bookmarks')).saved;}
 for(const el of $$('[data-progress-guest]'))el.hidden=!!user;
 if($('#forum-mine'))void loadMyForumPosts();

 for(const link of $$('[data-course-register]')){link.href=user?'https://app.zeland.it.com/course':'https://app.zeland.it.com/register?next=course';link.textContent=user?'Продолжить обучение':'Зарегистрироваться и начать';}
 for(const link of $$('[data-course-enter]'))link.hidden=!!user;
 for(const b of $$('[data-auth-open]')){
  if(b.dataset.authReason)continue;
  const label=$('span',b);if(label)label.textContent=user?'Кабинет':'Вход';
  else if(b.dataset.authOpen==='register')b.textContent=user?'Мой профиль':'Создать аккаунт';
 }
 const status=$('[data-account-status]');if(status)status.textContent=user?('Вы вошли как '+(user.name||user.login)):'Войдите, чтобы видеть свой профиль и сохранённые материалы.';
 for(const el of $$('[data-account-member]'))el.hidden=!user;
 for(const el of $$('[data-account-guest]'))el.hidden=!!user;
 const email=$('[data-email-status]');if(email&&user)email.textContent=user.emailVerified?'Email подтверждён':'Email пока не подтверждён';
 const verify=$('[data-verify-email]');if(verify&&user&&!user.emailVerified){const capabilities=await accountRequest('/capabilities');verify.hidden=!capabilities.emailVerification;}
 renderBookmarks();
 if(user){let pending;try{pending=sessionStorage.getItem('zeland.pending-save');}catch{}if(pending&&$$('[data-save]').some(b=>b.dataset.save===pending)){await saveMaterial(pending,true);sessionStorage.removeItem('zeland.pending-save');}}
}
authReady=refreshSchoolSession().catch(()=>{const status=$('[data-account-status]');if(status)status.textContent='Не удалось проверить вход. Обновите страницу или откройте учебный кабинет.';});
authReady.then(()=>{progressStatus();resumeForumDraft();});
window.addEventListener('pageshow',event=>{if(event.persisted)authReady=refreshSchoolSession().catch(()=>{});});
window.addEventListener('focus',()=>{authReady=refreshSchoolSession().catch(()=>{});});
for(const btn of $$('[data-school-logout]'))btn.addEventListener('click',async()=>{btn.disabled=true;try{await accountRequest('/logout',{method:'POST',body:'{}'});await refreshSchoolSession();toast('Вы вышли из аккаунта');}catch(error){toast(error.message);}finally{btn.disabled=false;}});
for(const btn of $$('[data-verify-email]'))btn.addEventListener('click',async()=>{btn.disabled=true;try{await accountRequest('/email/verify-request',{method:'POST',body:JSON.stringify({returnTo:location.href})});toast('Письмо отправлено. Проверьте почту и папку «Спам».');}catch(error){toast(error.message);}finally{btn.disabled=false;}});

// Statistics are optional and can be enabled in privacy settings; no automatic popup.
document.addEventListener('click',e=>{const link=e.target.closest('a[href]');if(!link)return;try{const url=new URL(link.href);if(url.origin==='https://app.zeland.it.com'&&['/course','/register','/login'].includes(url.pathname))event(url.pathname==='/register'?'registration_start':url.pathname==='/login'?'login_start':'course_enter',{destination_path:url.pathname});}catch{}});

const readingArticle=document.querySelector('.article-body[data-material]');
if(readingArticle)observeReading({element:readingArticle,send:event,allowed:()=>consentValue()==='yes'});

// Only the sign-in return target is kept in session storage; message drafts stay in memory.
let memoryForumDraft=null;
function forumDraft(value){if(value!==undefined){memoryForumDraft=value;if(value?.resume)try{sessionStorage.setItem('zeland.forum-intent',JSON.stringify({thread:value.thread||'',replyTo:value.replyTo||'',replyToName:value.replyToName||'',resume:true}));}catch{}return;}if(memoryForumDraft)return memoryForumDraft;try{return JSON.parse(sessionStorage.getItem('zeland.forum-intent')||'null');}catch{return null;}}
function resumeForumDraft(){if(schoolUser&&forumDraft()?.resume){if(!$('#forum-compose')){location.href=base+'questions/';return;}const draft=forumDraft();try{sessionStorage.removeItem('zeland.forum-intent');}catch{}openForumComposer(draft.thread||'',draft.replyTo||'',draft.replyToName||'');}}
async function openForumComposer(thread='',replyTo='',replyToName=''){
 const draft=forumDraft();
 if(!$('#forum-compose')){forumDraft({thread,replyTo,replyToName,resume:true});location.href=base+'questions/';return;}
 if(!schoolUser){forumDraft({...draft,thread,replyTo,replyToName,resume:true});openAuth('login','forum');return;}
 const host=$('#forum-compose'),topic=thread?document.getElementById('topic-'+thread):null;
 if(topic){topic.open=true;$('.thread-content',topic).append(host);}else $('.forum-toolbar').before(host);
 host.hidden=false;host.replaceChildren();const form=document.createElement('form');form.className='forum-compose';
 form.innerHTML=`<h2>${thread?'Ответить в обсуждении':'Новая тема'}</h2><p data-reply-target class="reply-to"></p><label>Имя или псевдоним<input name="displayName" required minlength="2" maxlength="60" autocomplete="nickname" placeholder="Как вас показывать на форуме"></label>${thread?'':'<label>Заголовок<input name="title" required minlength="5" maxlength="160" placeholder="В чём ваш вопрос?"></label><label>Раздел<select name="category"><option>Практика</option><option>Важность</option><option>Отношения</option><option>Выбор</option><option>Внимание</option><option>Обучение</option><option>Другой вопрос</option></select></label>'}<label>${thread?'Ваш ответ':'Ваша ситуация'}<textarea name="body" required minlength="${thread?2:10}" maxlength="6000" placeholder="Расскажите своими словами…"></textarea></label><p class="local-note">Все сообщения проходят модерацию. После одобрения ${thread?'ответ появится в этом обсуждении':'тема появится на форуме'} под указанным именем.</p><p data-compose-status role="status"></p><div class="button-row"><button class="button gold" type="submit">Отправить на модерацию</button><button class="button" type="button" data-compose-close>Закрыть</button></div>`;
 host.append(form);$('[data-reply-target]',form).textContent=replyToName?'В ответ: '+replyToName:'';
 if(draft?.thread===thread&&draft?.replyTo===replyTo){for(const key of ['displayName','title','body','category'])if(form.elements[key]&&draft[key])form.elements[key].value=draft[key];}
 if(!form.elements.displayName.value){try{const profile=await accountRequest('/forum/profile');if(form.isConnected&&!form.elements.displayName.value)form.elements.displayName.value=profile.displayName||'';}catch{}}
 let nonce=draft?.thread===thread&&draft?.replyTo===replyTo&&draft.nonce?draft.nonce:crypto.randomUUID();
 const save=()=>forumDraft({thread,replyTo,replyToName,displayName:form.elements.displayName.value,title:form.elements.title?.value,body:form.elements.body.value,category:form.elements.category?.value,nonce,resume:false});
 form.addEventListener('input',save);$('[data-compose-close]',form).addEventListener('click',()=>{save();host.hidden=true;});
 form.addEventListener('submit',async ev=>{ev.preventDefault();if(!form.reportValidity())return;const btn=$('[type=submit]',form),status=$('[data-compose-status]',form);btn.disabled=true;save();status.textContent='Отправляем на проверку…';
 try{await accountRequest(thread?'/forum/replies':'/forum/topics',{method:'POST',body:JSON.stringify({thread,replyTo:replyTo||undefined,displayName:form.elements.displayName.value,title:form.elements.title?.value,category:form.elements.category?.value,body:form.elements.body.value,nonce})});memoryForumDraft=null;try{sessionStorage.removeItem('zeland.forum-intent');}catch{}host.replaceChildren();const notice=document.createElement('div');notice.className='forum-moderation-notice';notice.setAttribute('role','status');notice.tabIndex=-1;const h=document.createElement('h3');h.textContent='Сообщение на модерации';const p=document.createElement('p');p.textContent=thread?'Спасибо! После проверки и одобрения ваш ответ появится в этом обсуждении. Сейчас его видите только вы и модератор.':'Спасибо! После проверки и одобрения ваша тема появится на форуме. Статус можно посмотреть в разделе «Мои сообщения».';notice.append(h,p);host.append(notice);host.scrollIntoView({block:'center'});notice.focus({preventScroll:true});await loadMyForumPosts();}
 catch(error){status.textContent=error.message;btn.disabled=false;if(/Войдите/.test(error.message)){forumDraft({...forumDraft(),resume:true});schoolUser=null;openAuth('login','forum');}}
 });
 host.scrollIntoView({block:'center'});(form.elements.displayName.value?(form.elements.title||form.elements.body):form.elements.displayName).focus({preventScroll:true});
}
function forumPostElement(post,thread){
 const row=document.createElement('div');row.className='forum-post';row.id='post-'+post.id;
 const avatar=document.createElement('span');avatar.className='forum-avatar avatar-0';avatar.setAttribute('aria-hidden','true');avatar.textContent=post.author.trim().split(/\s+/).slice(0,2).map(s=>s[0]).join('').toUpperCase();
 const body=document.createElement('div');body.className='forum-post-body';const person=document.createElement('div');person.className='forum-person';const heading=document.createElement('strong');heading.textContent=post.author;person.append(heading);body.append(person);
 if(post.reply_to_name){const to=document.createElement('p');to.className='reply-to';to.textContent='В ответ: '+post.reply_to_name;body.append(to);}
 const text=document.createElement('p');text.textContent=post.body;body.append(text);
 const reply=document.createElement('button');reply.className='text-link forum-post-reply';reply.textContent='Ответить';reply.dataset.forumReply=thread;reply.dataset.replyToId=post.id;reply.dataset.replyToName=post.author;body.append(reply);row.append(avatar,body);return row;
}
let forumNextOffset=0,forumLoading=false;
async function loadForumTopics(reset=false){
 if(!$('.forum-threads')||forumLoading)return;forumLoading=true;const status=$('#forum-status');
 try{const data=await accountRequest('/forum/topics?offset='+(reset?0:forumNextOffset));if(reset)for(const el of $$('[data-live-topic]'))el.remove();
 for(const t of data.topics){if(document.getElementById('topic-'+t.id))continue;const el=document.createElement('details');el.className='forum-thread';el.id='topic-'+t.id;el.dataset.liveTopic='true';el.dataset.forumOrder=String(-100000+$$('[data-live-topic]').length);el.dataset.forumReplies=String(t.replies);el.dataset.forumCategory=t.category;
 const summary=document.createElement('summary'),heading=document.createElement('div');heading.className='thread-heading';const tag=document.createElement('span');tag.className='thread-tags';tag.textContent=t.category;const h=document.createElement('h2');h.textContent=t.title;const meta=document.createElement('p');meta.className='thread-meta';meta.textContent=t.author+' · Ответов: '+t.replies;heading.append(tag,h,meta);summary.append(heading);const content=document.createElement('div');content.className='thread-content';const original=forumPostElement(t,t.id);original.querySelector('[data-forum-reply]').dataset.replyToId='';content.append(original);const replies=document.createElement('div');replies.dataset.threadReplies=t.id;replies.className='forum-replies';content.append(replies);el.append(summary,content);$('.forum-threads').insertBefore(el,$('.forum-thread:not([data-live-topic])')||$('.forum-empty'));watchForumThread(el);}
 forumNextOffset=data.nextOffset;let more=$('[data-forum-more]');if(!more){more=document.createElement('button');more.className='button';more.dataset.forumMore='';more.textContent='Загрузить ещё темы';more.addEventListener('click',()=>loadForumTopics());$('.forum-threads').append(more);}more.hidden=forumNextOffset===null;forumThreads=$$('[data-forum-category]');filterForum();status.textContent='';revealTopic();
 }catch{status.textContent='Не удалось загрузить новые обсуждения. ';const retry=document.createElement('button');retry.className='text-link';retry.textContent='Повторить';retry.onclick=()=>loadForumTopics(reset);status.append(retry);}
 finally{forumLoading=false;}
}
async function loadForumReplies(thread,reset=false,offset=0){
 const host=$$('[data-thread-replies]').find(el=>el.dataset.threadReplies===thread);if(!host||host.dataset.loading==='true'||(!reset&&offset===0&&host.dataset.loaded==='true'))return;host.dataset.loading='true';
 try{const data=await accountRequest('/forum/replies?thread='+encodeURIComponent(thread)+'&offset='+offset);if(reset||offset===0)host.replaceChildren();host.querySelector('[data-replies-more]')?.remove();for(const post of data.replies)host.append(forumPostElement(post,thread));host.dataset.loaded='true';if(data.nextOffset!==null){const more=document.createElement('button');more.dataset.repliesMore='';more.className='text-link';more.textContent='Ещё ответы';more.onclick=()=>loadForumReplies(thread,false,data.nextOffset);host.append(more);}}
 catch{host.replaceChildren();const retry=document.createElement('button');retry.className='text-link';retry.textContent='Не удалось загрузить ответы. Повторить';retry.onclick=()=>loadForumReplies(thread,true);host.append(retry);}
 finally{host.dataset.loading='false';}
}
async function loadMyForumPosts(){
 const host=$('#forum-mine');if(!host)return;host.hidden=!schoolUser;if(!schoolUser){host.replaceChildren();return;}
 try{const {items}=await accountRequest('/forum/mine');host.replaceChildren();if(!items.length){host.hidden=true;return;}const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Мои сообщения · на проверке: '+items.filter(p=>p.status==='pending').length;details.append(summary);
 for(const post of items){const row=document.createElement('div');row.className='forum-mine-post';const h=document.createElement('strong');h.textContent=({pending:'На модерации',approved:'Опубликовано',rejected:'Не опубликовано'})[post.status]+' · '+post.threadTitle;const p=document.createElement('p');p.textContent=post.body;row.append(h,p);if(post.moderation_note){const note=document.createElement('p');note.textContent='Комментарий модератора: '+post.moderation_note;row.append(note);}if(post.status==='approved'){const a=document.createElement('a');a.className='text-link';a.href='#topic-'+post.thread;a.textContent='Перейти к обсуждению';row.append(a);}details.append(row);}host.append(details);
 }catch{host.textContent='Не удалось загрузить статусы ваших сообщений.';}
}
function watchForumThread(el){el.addEventListener('toggle',()=>{if(el.open){event('forum_topic_open',{thread_id:el.id.slice(6)});void loadForumReplies(el.id.slice(6));}});if(el.open)void loadForumReplies(el.id.slice(6));}
for(const el of forumThreads)watchForumThread(el);
document.addEventListener('click',async event=>{const reply=event.target.closest('[data-forum-reply]');if(reply){await authReady;void openForumComposer(reply.dataset.forumReply,reply.dataset.replyToId||'',reply.dataset.replyToName||'');}});
if($('.forum-threads'))void loadForumTopics(true);

// Track section-to-section choices without sending free text or query strings.
document.addEventListener('click',e=>{const link=e.target.closest('a[href]');if(!link)return;try{const url=new URL(link.href);if(url.origin===location.origin&&/^\/(articles|practices|books|questions|start|course|learn|library)(\/|$)/.test(url.pathname))event('school_navigation',{destination_path:url.pathname,source:location.pathname});}catch{}});

// Topic discovery stays in the library, with no personal browsing data persisted locally.
const videoLibrary=$('[data-video-library]');
if(videoLibrary){const input=$('#video-search'),cards=$$('[data-video-card]',videoLibrary),params=new URLSearchParams(location.search);let topic=params.get('topic')||'all';if(!$$('[data-video-filter]').some(b=>b.dataset.videoFilter===topic))topic='all';input.value=(params.get('q')||'').slice(0,120);
 const apply=()=>{let count=0;const words=normalizeText(input.value).split(' ').filter(Boolean);for(const card of cards){card.hidden=!(topic==='all'||card.dataset.videoTopic===topic)||!words.every(w=>normalizeText(card.textContent).includes(w));if(!card.hidden)count++;}for(const b of $$('[data-video-filter]')){const active=b.dataset.videoFilter===topic;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}$('[data-video-count]').textContent='Видео в подборке: '+count;$('[data-video-empty]').hidden=count>0;const url=new URL(location.href);url.searchParams.delete('topic');url.searchParams.delete('q');if(topic!=='all')url.searchParams.set('topic',topic);if(input.value.trim())url.searchParams.set('q',input.value.trim());history.replaceState(null,'',url.pathname+url.search);};
 for(const b of $$('[data-video-filter]'))b.addEventListener('click',()=>{topic=b.dataset.videoFilter;apply();event('video_filter',{topic,format:'video'});});input.addEventListener('input',apply);apply();
}
const libraryPlayer=$('[data-library-player]');
if(libraryPlayer){const material='video:'+libraryPlayer.dataset.libraryPlayer;let started=false,last=null,reported=0;const watched=new Set();
 libraryPlayer.addEventListener('play',()=>{if(consentValue()==='yes'&&!started){event('video_started',{material_id:material,topic:libraryPlayer.dataset.videoTopic});started=true;}last=null;});
 libraryPlayer.addEventListener('seeking',()=>{last=null;});libraryPlayer.addEventListener('pause',()=>{last=null;});document.addEventListener('visibilitychange',()=>{last=null;});
 libraryPlayer.addEventListener('timeupdate',()=>{if(consentValue()!=='yes'){last=null;return;}if(!started&&!libraryPlayer.paused){event('video_started',{material_id:material,topic:libraryPlayer.dataset.videoTopic});started=true;}const now=libraryPlayer.currentTime;if(!libraryPlayer.paused&&!libraryPlayer.seeking&&!document.hidden&&last!==null&&now>=last&&now-last<2){for(let n=Math.floor(last*4);n<Math.floor(now*4);n++)watched.add(n);}last=libraryPlayer.paused||document.hidden?null:now;const duration=libraryPlayer.duration;if(!Number.isFinite(duration)||duration<=0)return;const coverage=Math.min(1,watched.size/4/duration),threshold=coverage>=.9?90:Math.floor(coverage*4)*25;if(threshold>reported){reported=threshold;event(threshold>=90?'video_completed':'video_progress',{material_id:material,coverage,duration,progress_percent:threshold,topic:libraryPlayer.dataset.videoTopic});}});
 $('[data-video-retry]')?.addEventListener('click',()=>{$('[data-video-error]').hidden=true;libraryPlayer.load();libraryPlayer.play().catch(()=>{$('[data-video-error]').hidden=false;});});
 libraryPlayer.addEventListener('error',()=>{const error=$('[data-video-error]');if(error)error.hidden=false;event('video_unavailable',{material_id:material});});
 // video_open is sent when analytics consent becomes active.
}
for(const link of $$('[data-video-next]'))link.addEventListener('click',()=>event('video_next_step',{material_id:'video:'+link.dataset.videoId,format:link.dataset.videoNext,destination_path:new URL(link.href).pathname}));

// Page depth describes scrolling, never verified reading. Once per threshold per visit.
const pageDepthReported=new Set();let depthQueued=false;
function reportPageDepth(){depthQueued=false;if(consentValue()!=='yes')return;const height=document.documentElement.scrollHeight;if(height<=innerHeight)return;const depth=Math.min(100,100*(scrollY+innerHeight)/height);for(const percent of [25,50,75,90])if(depth>=percent&&!pageDepthReported.has(percent)){pageDepthReported.add(percent);event('page_scroll_depth',{depth_percent:percent});}}
addEventListener('scroll',()=>{if(!depthQueued){depthQueued=true;requestAnimationFrame(reportPageDepth);}},{passive:true});
