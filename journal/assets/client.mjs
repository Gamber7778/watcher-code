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
let toastTimeout, state={saved:[],completed:[],notes:{},lesson:[],routes:[],theme:'light'};
const toast=(message)=>{const el=$('.toast');if(!el)return;el.textContent=message;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.hidden=true,4500);};
const safeKey=s=>typeof s==='string'&&/^(article|practice|lesson|route):[a-z0-9-]+(?::\d+)?$/.test(s);
function cleanState(raw={}){
 const clean={saved:[],completed:[],notes:{},lesson:[],routes:[],theme:'light'};
 for(const key of ['saved','completed','routes'])clean[key]=Array.isArray(raw[key])?[...new Set(raw[key].filter(safeKey))].slice(0,500):[];
 clean.lesson=Array.isArray(raw.lesson)?[...new Set(raw.lesson.filter(x=>['idea','practice','action'].includes(x)))]:[];
 if(raw.notes&&typeof raw.notes==='object'&&!Array.isArray(raw.notes))for(const [key,value]of Object.entries(raw.notes))if(safeKey(key)&&typeof value==='string')clean.notes[key]=value.slice(0,12000);
 clean.theme=raw.theme==='dark'?'dark':'light'; return clean;
}
try{state=cleanState(JSON.parse(localStorage.getItem(storeKey)||'{}'));}catch{}
function persist(next){try{localStorage.setItem(storeKey,JSON.stringify(next));state=next;return true;}catch{toast('Не удалось сохранить в браузере. Проверьте доступное место и настройки хранения.');return false;}}
function update(changes){const previous=state;if(!persist({...state,...changes}))return false;queueProgress(previous,state);refreshPersonalProgress();return true;}
function toggleValue(key,value){const next=state[key].includes(value)?state[key].filter(x=>x!==value):[...state[key],value];return update({[key]:next});}
let progressOwner=null,progressPending={},progressSyncing=false,progressAvailable=false;
function progressStatus(message){for(const el of $$('[data-progress-storage]'))el.textContent=message||(!schoolUser?'Отметки сохраняются на этом устройстве. Войдите, чтобы сохранить их в аккаунте.':!progressAvailable?'Не удалось загрузить прогресс. Обновите страницу для повторной попытки.':Object.keys(progressPending).length?'Сохраняем изменения…':'Прогресс сохранён в аккаунте');}
function rememberPending(){if(progressOwner)try{localStorage.setItem(storeKey+'.pending',JSON.stringify(progressPending));}catch{}}
function queueProgress(previous,next){
 if(!schoolUser)return;
 const keys=new Set([...previous.completed,...next.completed,...Object.keys(previous.notes),...Object.keys(next.notes)]);
 for(const material of keys){if(!/^(practice|lesson):/.test(material))continue;const patch={};if(previous.completed.includes(material)!==next.completed.includes(material))patch.completed=next.completed.includes(material);if(previous.notes[material]!==next.notes[material])patch.note=next.notes[material]||'';if(Object.keys(patch).length)progressPending[material]={...progressPending[material],...patch};}
 rememberPending();void flushProgress();
}
async function flushProgress(){
 if(progressSyncing||!schoolUser||!progressAvailable)return;progressSyncing=true;const owner=progressOwner;progressStatus();
 try{for(const material of Object.keys(progressPending)){if(owner!==progressOwner)break;const patch=progressPending[material];await accountRequest('/progress',{method:'PUT',body:JSON.stringify({material,...patch})});if(owner!==progressOwner)break;if(progressPending[material]===patch)delete progressPending[material];rememberPending();}}
 catch{progressStatus('Не удалось сохранить в аккаунте. Изменения остались на этом устройстве. Повторите сохранение.');for(const b of $$('[data-progress-retry]'))b.hidden=false;return;}
 finally{progressSyncing=false;}
 progressStatus();for(const b of $$('[data-progress-retry]'))b.hidden=true;
 if(Object.keys(progressPending).length)void flushProgress();
}
function renderProgressState(){refreshPracticeSteps();refreshCompletion();refreshPersonalProgress();if(!unsavedNotes)for(const field of $$('[data-note]'))field.value=state.notes[field.dataset.note]||'';progressStatus();}
async function loadAccountProgress(user){
 const owner=user?String(user.id):'guest';
 if(owner!==progressOwner){progressOwner=owner;progressAvailable=false;storeKey=user?'zeland.journal.user.'+user.id:'zeland.journal.v1';try{state=cleanState(JSON.parse(localStorage.getItem(storeKey)||'{}'));progressPending=user?JSON.parse(localStorage.getItem(storeKey+'.pending')||'{}'):{};}catch{state=cleanState();progressPending={};}unsavedNotes=false;renderProgressState();}
 if(!user){progressAvailable=false;return;}
 try{const data=await accountRequest('/progress');if(progressOwner!==owner)return;progressAvailable=true;
 if(!progressSyncing&&!unsavedNotes){const completed=state.completed.filter(k=>! /^(practice|lesson):/.test(k)),notes={...state.notes};for(const k of Object.keys(notes))if(/^(practice|lesson):/.test(k))delete notes[k];for(const item of data.items){if(item.completed)completed.push(item.material);if(item.note)notes[item.material]=item.note;}for(const [key,patch]of Object.entries(progressPending)){if(patch.completed!==undefined){const i=completed.indexOf(key);if(i>=0)completed.splice(i,1);if(patch.completed)completed.push(key);}if(patch.note!==undefined)notes[key]=patch.note;}persist({...state,completed,notes});renderProgressState();}
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
function startSchoolAnalytics(){
 if(consentValue()!=='yes'||schoolAnalyticsStarted)return;schoolAnalyticsStarted=true;
 trackSchool('page_view');
 const material=$('[data-material]')?.dataset.material;
 if(material)trackSchool(material.startsWith('practice:')?'practice_open':'article_open',{material_id:material});
 if(location.pathname.replace(/\/$/,'')==='/course')trackSchool('course_view');
}
function startAnalytics(){
 startSchoolAnalytics();
 if(consentValue()!=='yes'||!/^G-[A-Z0-9]+$/.test(gaId||''))return;
 window['ga-disable-'+gaId]=false;
 if(analyticsReady){window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});return;}
 window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
 window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 window.gtag('js',new Date());
 window.gtag('config',gaId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:safeLocation(location.href),page_referrer:safeLocation(document.referrer)});
 const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(gaId);document.head.append(script);analyticsReady=true;
 const params=new URLSearchParams(location.search),attribution={};
 for(const [key,name]of [['utm_source','campaign_source'],['utm_medium','campaign_medium'],['utm_campaign','campaign_name'],['utm_content','campaign_content'],['utm_id','campaign_id']]){const value=params.get(key);if(value&&/^[\p{L}\p{N}_. -]{1,100}$/u.test(value))attribution[name]=value;}
 event('page_view',{...attribution,page_title:document.title});
 if($('[data-material]'))event($('[data-material]').dataset.material.startsWith('practice:')?'practice_open':'article_open',{material_id:$('[data-material]').dataset.material});
 if(document.body.dataset.page==='course/')event('course_view');
 if($('[data-lesson]'))event('lesson_start',{lesson_id:'pauza-i-vybor'});
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
 const messages={forum:'Войдите, чтобы опубликовать тему или ответить. После входа вы вернётесь к обсуждению.',learning:'Войдите, чтобы перейти к доступным урокам.',save:'Войдите или создайте аккаунт. После входа вы вернётесь к материалу, и он появится в сохранённом.'};
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
const themeButton=$('[data-reading-theme]');
function refreshTheme(){if(!document.body.classList.contains('reading-page'))return;document.body.classList.toggle('reading-light',state.theme==='light');if(themeButton){themeButton.setAttribute('aria-pressed',String(state.theme==='light'));$('span',themeButton).textContent=state.theme==='light'?'Тёмный фон':'Светлый фон';}}
refreshTheme();themeButton?.addEventListener('click',()=>{if(update({theme:state.theme==='light'?'dark':'light'}))refreshTheme();});

for(const textarea of $$('[data-note]'))textarea.value=state.notes[textarea.dataset.note]||'';
for(const btn of $$('[data-save-note]'))btn.addEventListener('click',async()=>{await authReady;const field=$$('[data-note]').find(x=>x.dataset.note===btn.dataset.saveNote);if(field&&update({notes:{...state.notes,[btn.dataset.saveNote]:field.value.trim()}})){unsavedNotes=false;toast(schoolUser?'Запись сохранена на устройстве и отправляется в аккаунт':'Личная запись сохранена на этом устройстве');}});
let unsavedNotes=false;
for(const textarea of $$('[data-note]'))textarea.addEventListener('input',()=>unsavedNotes=true);
for(const btn of $$('[data-save-note]'))btn.addEventListener('click',()=>{unsavedNotes=$$('[data-note]').some(f=>f.value.trim()!==(state.notes[f.dataset.note]||''));});
window.addEventListener('beforeunload',e=>{if(unsavedNotes){e.preventDefault();e.returnValue='';}});
function refreshCompletion(){for(const btn of $$('[data-complete]')){const done=state.completed.includes(btn.dataset.complete);btn.setAttribute('aria-pressed',String(done));btn.textContent=done?'Практика пройдена — снять отметки':'Отметить практику выполненной';}}
refreshCompletion();
for(const btn of $$('[data-complete]'))btn.addEventListener('click',async()=>{await authReady;const key=btn.dataset.complete,done=state.completed.includes(key),stepKeys=$$('[data-practice-step]').map(b=>b.dataset.practiceStep);const completed=state.completed.filter(k=>k!==key&&!stepKeys.includes(k));if(!done)completed.push(key,...stepKeys);if(!update({completed}))return;refreshPracticeSteps();refreshCompletion();toast(state.completed.includes(btn.dataset.complete)?(schoolUser?'Выполнение отмечено — сохраняем в аккаунт':'Выполнение отмечено на этом устройстве'):'Отметка выполнения снята');event('practice_completion_marked',{material_id:btn.dataset.complete,completed:state.completed.includes(btn.dataset.complete)});});
function refreshRoutes(){for(const btn of $$('[data-route-complete]')){const done=state.routes.includes(btn.dataset.routeComplete);btn.setAttribute('aria-pressed',String(done));btn.textContent=done?'Шаг отмечен — отменить':'Отметить шаг пройденным';}}
refreshRoutes();for(const btn of $$('[data-route-complete]'))btn.addEventListener('click',()=>{if(toggleValue('routes',btn.dataset.routeComplete))refreshRoutes();});
function refreshLesson(){const checkboxes=$$('[data-lesson-step]');if(!checkboxes.length)return;for(const cb of checkboxes)cb.checked=state.lesson.includes(cb.dataset.lessonStep);$('#lesson-progress').value=state.lesson.length;$('#lesson-count').textContent=state.lesson.length+' из 3 шагов отмечено';$('.lesson-finish').hidden=state.lesson.length!==3;}
refreshLesson();for(const cb of $$('[data-lesson-step]'))cb.addEventListener('change',()=>{const next=cb.checked?[...new Set([...state.lesson,cb.dataset.lessonStep])]:state.lesson.filter(x=>x!==cb.dataset.lessonStep);if(!update({lesson:next})){refreshLesson();return;}refreshLesson();event('lesson_step_marked',{lesson_id:'pauza-i-vybor',step_id:cb.dataset.lessonStep,completed:cb.checked});if(next.length===3)event('lesson_completion_marked',{lesson_id:'pauza-i-vybor'});});

const timer=$('[data-timer-seconds]');
if(timer){let remaining=Number(timer.dataset.timerSeconds),end=0,interval=null;const display=$('.timer-display',timer),start=$('[data-timer-start]',timer);const render=()=>display.textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');const stop=()=>{clearInterval(interval);interval=null;start.textContent=remaining>0?'Продолжить':'Начать снова';};const tick=()=>{remaining=Math.max(0,Math.ceil((end-Date.now())/1000));render();if(!remaining){stop();toast('Время практики закончилось. Продолжайте в своём темпе.');}};start.addEventListener('click',()=>{if(interval){tick();stop();return;}if(!remaining)remaining=Number(timer.dataset.timerSeconds);end=Date.now()+remaining*1000;start.textContent='Пауза';interval=setInterval(tick,250);event('practice_timer_start');});$('[data-timer-reset]',timer).addEventListener('click',()=>{stop();remaining=Number(timer.dataset.timerSeconds);start.textContent='Начать';render();});document.addEventListener('visibilitychange',()=>{if(interval)tick();});}

const reader=$('.reading-progress');
if(reader){let scheduled=false,reported=false;const progress=()=>{scheduled=false;const el=$('.article-body'),rect=el.getBoundingClientRect(),total=Math.max(1,el.scrollHeight-innerHeight);const value=Math.min(100,Math.max(0,(-rect.top)/total*100));reader.value=value;if(value>=90&&!reported&&consentValue()==='yes'){reported=true;event('article_scroll_depth',{depth_percent:90,material_id:el.dataset.material});}};addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress);}},{passive:true});progress();}

let libraryFilter=null;
function refreshPersonalProgress(){
 const section=$('[data-personal-progress]');if(!section)return;let visible=0;
 for(const row of $$('[data-progress-key]',section)){const key=row.dataset.progressKey,note=Boolean(state.notes[key]?.trim()),done=state.completed.includes(key),lesson=key.startsWith('lesson:')?state.lesson.length:0,steps=state.completed.filter(x=>x.startsWith(key+':')).length;row.hidden=!note&&!done&&!lesson&&!steps;if(!row.hidden)visible++;$('[data-progress-label]',row).textContent=[steps?steps+' из '+row.dataset.stepTotal+' шагов':'',note?'Есть личная запись':'',done?'Выполнение отмечено':'',lesson?lesson+' из 3 шагов':''].filter(Boolean).join(' · ');}
 section.hidden=visible===0;
}
refreshPersonalProgress();
const library=$('#library');
if(library){
 const input=$('#search'),format=$('#format'),cards=$$('[data-item]',library),params=new URLSearchParams(location.search),topicButtons=$$('[data-topic-filter]');
 const allowedTopics=['all','basics','choice','attention','life'];let selectedTopic=allowedTopics.includes(params.get('topic'))?params.get('topic'):'all';
 let selectedFormat=library.dataset.practiceOnly==='true'?'practice':['all','article','practice'].includes(params.get('format'))?params.get('format'):'all';
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
 addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);input.value=(p.get('q')||'').slice(0,200);selectedTopic=allowedTopics.includes(p.get('topic'))?p.get('topic'):'all';selectedFormat=library.dataset.practiceOnly==='true'?'practice':['all','article','practice'].includes(p.get('format'))?p.get('format'):'all';if(format)format.value=selectedFormat;apply({url:false});});
}

for(const btn of $$('[data-q-filter]'))btn.addEventListener('click',()=>{for(const b of $$('[data-q-filter]')){const active=btn===b;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}for(const row of $$('[data-question-category]'))row.hidden=btn.dataset.qFilter!=='all'&&btn.dataset.qFilter!==row.dataset.questionCategory;});

$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const field=$('#question-text'),body=field.value.trim();if(!body){field.setCustomValidity('Напишите, пожалуйста, ваш вопрос.');field.reportValidity();return;}field.setCustomValidity('');const message='Здравствуйте! Вопрос из журнала Zeland.\nТема: '+$('#question-topic').value+'\n\n'+body;$('#contact-link').href='https://t.me/vadim_ze?text='+encodeURIComponent(message);$('#contact-result').hidden=false;$('#contact-link').focus();});
$('#question-text')?.addEventListener('input',e=>e.target.setCustomValidity(''));
$('#contact-link')?.addEventListener('click',()=>event('team_question_open',{channel:'telegram'}));
for(const link of $$('[data-event]'))link.addEventListener('click',()=>event(link.dataset.event));

const video=$('[data-video]');
$('.video-trigger')?.addEventListener('click',()=>{const player=document.createElement('video');player.controls=true;player.playsInline=true;player.preload='metadata';player.src=video.dataset.video;player.poster=video.dataset.poster;player.setAttribute('aria-label','Вводное видео о практикуме «Код Смотрителя»');$('.video-trigger').replaceWith(player);const description=$('.local-note',video);description.textContent='Вводное видео с действующего сайта практикума.';player.addEventListener('error',()=>{description.textContent='Видео не загрузилось. Его можно открыть на zeland.it.com.';const link=document.createElement('a');link.className='text-link';link.href='https://zeland.it.com/#video';link.textContent='Открыть видео на сайте практикума';if(!$('a',video))video.append(link);});player.play().catch(()=>{});event('course_intro_play');});

function exportData(){const payload=JSON.stringify({app:'zeland-journal',version:1,exportedAt:new Date().toISOString(),data:state},null,2);const url=URL.createObjectURL(new Blob([payload],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='zeland-my-materials.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);toast('Файл содержит ваши личные записи. Храните его у себя.');}
for(const b of $$('[data-export]'))b.addEventListener('click',exportData);
$('#import-data')?.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>2000000)throw new Error('size');const parsed=JSON.parse(await file.text());if(parsed.app!=='zeland-journal'||parsed.version!==1||!parsed.data)throw new Error('format');const incoming=cleanState(parsed.data);const merged=cleanState({...state,saved:[...state.saved,...incoming.saved],completed:[...state.completed,...incoming.completed],notes:{...state.notes,...incoming.notes},lesson:[...state.lesson,...incoming.lesson],routes:[...state.routes,...incoming.routes]});if(update(merged)){libraryFilter?.();refreshPersonalProgress();toast('Данные добавлены. Совпадающие заметки обновлены из файла.');}}catch{toast('Не удалось импортировать. Выберите JSON-файл экспорта журнала до 2 МБ.');}e.target.value='';});
$('[data-delete-local]')?.addEventListener('click',()=>$('#delete-confirm').hidden=false);
$('[data-delete-cancel]')?.addEventListener('click',()=>$('#delete-confirm').hidden=true);
$('[data-delete-confirm]')?.addEventListener('click',()=>{try{localStorage.removeItem(storeKey);state=cleanState();$('#delete-confirm').hidden=true;toast('Локальные данные журнала удалены.');}catch{toast('Браузер не разрешил удалить данные.');}});

const consentPanel=$('#consent-panel');let previousFocus;
function closeConsent(){consentPanel.hidden=true;document.body.style.overflow='';previousFocus?.focus();}
for(const btn of $$('[data-consent-open]'))btn.addEventListener('click',()=>{previousFocus=document.activeElement;consentPanel.hidden=false;document.body.style.overflow='hidden';$('[data-consent="no"]').focus();});
$('[data-consent-close]')?.addEventListener('click',closeConsent);
consentPanel?.addEventListener('click',e=>{if(e.target===consentPanel)closeConsent();});
consentPanel?.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeConsent();}if(e.key==='Tab'){const list=$$('button,a',consentPanel),first=list[0],last=list.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
for(const btn of $$('[data-consent]'))btn.addEventListener('click',()=>{try{setConsent(btn.dataset.consent);document.querySelector('[data-statistics-banner]')?.remove();}catch{toast('Не удалось сохранить выбор. Статистика останется выключенной.');return;}if(btn.dataset.consent==='yes')startAnalytics();else{window['ga-disable-'+gaId]=true;if(window.gtag)window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}closeConsent();toast(btn.dataset.consent==='yes'?'Статистика включена по вашему согласию':'Отправка статистики выключена');});
window.addEventListener('storage',e=>{if(e.key===storeKey){try{state=cleanState(JSON.parse(e.newValue||'{}'));refreshCompletion();refreshRoutes();refreshLesson();refreshTheme();refreshPersonalProgress();refreshPracticeSteps();libraryFilter?.();}catch{}}if(e.key===consentKey){if(e.newValue==='yes')startAnalytics();else window['ga-disable-'+gaId]=true;}});
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
function refreshPracticeSteps(){const boxes=$$('[data-practice-step]');for(const box of boxes)box.checked=state.completed.includes(box.dataset.practiceStep);const done=boxes.filter(b=>b.checked).length;if($('[data-practice-count]'))$('[data-practice-count]').textContent=done===boxes.length?'Все шаги пройдены':done+' из '+boxes.length+' шагов';if($('[data-practice-progress]'))$('[data-practice-progress]').value=done;}
refreshPracticeSteps();
for(const box of $$('[data-practice-step]'))box.addEventListener('change',async()=>{const checked=box.checked;await authReady;box.checked=checked;const value=box.dataset.practiceStep;const completed=box.checked?[...new Set([...state.completed,value])]:state.completed.filter(x=>x!==value);const root=value.replace(/:\d+$/,'');const boxes=$$('[data-practice-step]');const all=boxes.every(b=>completed.includes(b.dataset.practiceStep));const final=completed.filter(k=>k!==root);if(all)final.push(root);update({completed:final});refreshPracticeSteps();refreshCompletion();refreshPersonalProgress();});

// Forum ordering and discovery remain local to the page; no fabricated activity.
$('#forum-sort')?.addEventListener('change',e=>{
 const sorted=[...forumThreads].sort((a,b)=>e.target.value==='replies'?Number(b.dataset.forumReplies)-Number(a.dataset.forumReplies)||Number(a.dataset.forumOrder)-Number(b.dataset.forumOrder):Number(a.dataset.forumOrder)-Number(b.dataset.forumOrder));
 const parent=$('.forum-threads'),empty=$('.forum-empty');for(const thread of sorted)parent.insertBefore(thread,empty);
});
$('[data-forum-collapse]')?.addEventListener('click',()=>{for(const thread of forumThreads)thread.open=false;toast('Обсуждения свёрнуты. Выберите интересующий вопрос.');});
for(const b of $$('[data-forum-person]'))b.addEventListener('click',()=>{forumTag='all';forumSearch.value=b.dataset.forumPerson;filterForum();forumSearch.focus();forumSearch.scrollIntoView({block:'center'});});
for(const b of $$('[data-note-template]'))b.addEventListener('click',()=>{const field=$('[data-note]');if(!field)return;const template=b.dataset.noteTemplate;if(!field.value.includes(template)){field.value=(field.value.trim()?field.value.trim()+'\n\n':'')+template;field.dispatchEvent(new Event('input',{bubbles:true}));}field.focus();toast('Вопросы добавлены. Заполните запись и нажмите «Сохранить заметку».');});

// The session cookie belongs only to App Zeland. The school reads it through its authenticated API.
async function refreshSchoolSession(){
 const {user}=await accountRequest('/session');schoolUser=user;schoolSaved=[];
 await loadAccountProgress(user);
 if(user){schoolSaved=(await accountRequest('/bookmarks')).saved;}
 for(const b of $$('[data-import-guest]')){let guest;try{guest=cleanState(JSON.parse(localStorage.getItem('zeland.journal.v1')||'{}'));}catch{guest=cleanState();}b.hidden=!user||(!guest.completed.length&&!Object.keys(guest.notes).length);}
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

// An explicit choice controls anonymous analytics on both subdomains.
if(!consentValue()){
 const bar=document.createElement('aside');bar.dataset.statisticsBanner='';bar.setAttribute('aria-label','Настройки статистики');bar.style.cssText='position:fixed;bottom:12px;left:12px;right:12px;max-width:620px;margin:auto;padding:18px;background:#161511;color:#eee6d9;border:1px solid #a59057;z-index:1000;border-radius:12px;box-shadow:0 4px 24px #0005';
 bar.innerHTML='<p style="margin:0 0 12px">Разрешить статистику посещений, чтобы помочь нам улучшать школу? Личные записи не отправляются в Amplitude.</p><button class="button gold" data-choice="yes">Разрешить</button> <button class="button" style="color:#eee6d9" data-choice="no">Без статистики</button>';
 bar.addEventListener('click',e=>{const value=e.target.closest('[data-choice]')?.dataset.choice;if(!value)return;setConsent(value);bar.remove();if(value==='yes')startAnalytics();});document.body.append(bar);
}
document.addEventListener('click',e=>{const link=e.target.closest('a[href]');if(!link)return;try{const url=new URL(link.href);if(url.origin==='https://app.zeland.it.com'&&['/course','/register','/login'].includes(url.pathname))trackSchool(url.pathname==='/register'?'registration_start':'course_enter');}catch{}});

const readingArticle=document.querySelector('.article-body[data-material]');
if(readingArticle)observeReading({element:readingArticle,send:trackSchool,allowed:()=>consentValue()==='yes'});

// Forum publications are persisted in the shared school account service.
function forumDraft(value){try{if(value!==undefined)sessionStorage.setItem('zeland.forum-draft',JSON.stringify(value));else return JSON.parse(sessionStorage.getItem('zeland.forum-draft')||'null');}catch{return null;}}
function resumeForumDraft(){if(schoolUser&&forumDraft()?.resume){if(!$('#forum-compose')){location.href=base+'questions/';return;}openForumComposer(forumDraft().thread||'');}}
function openForumComposer(thread=''){
 const draft=forumDraft();
 if(!$('#forum-compose')){forumDraft({thread,resume:true});location.href=base+'questions/';return;}
 if(!schoolUser){forumDraft({...draft,thread,resume:true});openAuth('login','forum');return;}
 const host=$('#forum-compose');host.hidden=false;host.replaceChildren();
 const form=document.createElement('form');form.className='forum-compose';
 form.innerHTML=`<h2>${thread?'Ответить в обсуждении':'Новая тема'}</h2>${thread?'':'<label>Заголовок<input name="title" required minlength="5" maxlength="160" placeholder="Например: как вернуться к практике после перерыва?"></label><label>Раздел<select name="category"><option>Практика</option><option>Важность</option><option>Отношения</option><option>Выбор</option><option>Внимание</option><option>Обучение</option><option>Другой вопрос</option></select></label>'}<label>${thread?'Ваш ответ':'Ваша ситуация'}<textarea name="body" required minlength="${thread?2:10}" maxlength="6000" placeholder="Расскажите своими словами…"></textarea></label><p class="local-note">Сообщение будет опубликовано на форуме под вашим именем.</p><p data-compose-status role="status"></p><div class="button-row"><button class="button gold" type="submit">Опубликовать</button><button class="button" type="button" data-compose-close>Закрыть</button></div>`;
 host.append(form);
 if(draft?.thread===thread){for(const key of ['title','body','category'])if(form.elements[key]&&draft[key])form.elements[key].value=draft[key];}
 let nonce=draft?.thread===thread&&draft.nonce?draft.nonce:crypto.randomUUID();
 const save=()=>forumDraft({thread,title:form.elements.title?.value,body:form.elements.body.value,category:form.elements.category?.value,nonce,resume:false});
 form.addEventListener('input',save);$('[data-compose-close]',form).addEventListener('click',()=>{save();host.hidden=true;});
 form.addEventListener('submit',async ev=>{ev.preventDefault();if(!form.reportValidity())return;const btn=$('[type=submit]',form),status=$('[data-compose-status]',form);btn.disabled=true;save();status.textContent='Публикуем…';
 try{const result=await accountRequest(thread?'/forum/replies':'/forum/topics',{method:'POST',body:JSON.stringify({thread,title:form.elements.title?.value,category:form.elements.category?.value,body:form.elements.body.value,nonce})});try{sessionStorage.removeItem('zeland.forum-draft');}catch{}host.hidden=true;if(thread){await loadForumReplies(thread,true);document.getElementById('topic-'+thread)?.scrollIntoView({block:'start'});}else{await loadForumTopics(true);location.hash='topic-'+result.id;revealTopic();}toast('Сообщение опубликовано');}
 catch(error){status.textContent=error.message;btn.disabled=false;if(/Войдите/.test(error.message)){forumDraft({...forumDraft(),resume:true});schoolUser=null;openAuth('login','forum');}}
 });
 host.scrollIntoView({block:'center'});(form.elements.title||form.elements.body).focus();
}
function forumPostElement(post){const row=document.createElement('div');row.className='forum-post';const body=document.createElement('div');body.className='forum-post-body';const heading=document.createElement('strong');heading.textContent=post.author;const date=document.createElement('small');date.textContent=' · '+new Date(post.created_at.replace(' ','T')+'Z').toLocaleDateString('ru-RU');const text=document.createElement('p');text.textContent=post.body;body.append(heading,date,text);row.append(body);return row;}
let forumNextOffset=0,forumLoading=false;
async function loadForumTopics(reset=false){
 if(!$('.forum-threads')||forumLoading)return;forumLoading=true;const status=$('#forum-status');
 try{const data=await accountRequest('/forum/topics?offset='+(reset?0:forumNextOffset));if(reset)for(const el of $$('[data-live-topic]'))el.remove();
 for(const t of data.topics){if(document.getElementById('topic-'+t.id))continue;const el=document.createElement('details');el.className='forum-thread';el.id='topic-'+t.id;el.dataset.liveTopic='true';el.dataset.forumOrder=String(-Date.parse(t.created_at.replace(' ','T')+'Z'));el.dataset.forumReplies=String(t.replies);el.dataset.forumCategory=t.category;
 const summary=document.createElement('summary'),heading=document.createElement('div');heading.className='thread-heading';const tag=document.createElement('span');tag.className='thread-tags';tag.textContent=t.category;const h=document.createElement('h2');h.textContent=t.title;const meta=document.createElement('p');meta.className='thread-meta';meta.textContent=t.author+' · Ответов: '+t.replies;heading.append(tag,h,meta);summary.append(heading);const content=document.createElement('div');content.className='thread-content';content.append(forumPostElement(t));const replies=document.createElement('div');replies.dataset.threadReplies=t.id;replies.className='live-replies';const reply=document.createElement('button');reply.className='button';reply.textContent='Ответить';reply.dataset.forumReply=t.id;content.append(replies,reply);el.append(summary,content);$('.forum-threads').insertBefore(el,$('.forum-thread:not([data-live-topic])')||$('.forum-empty'));watchForumThread(el);}
 forumNextOffset=data.nextOffset;let more=$('[data-forum-more]');if(!more){more=document.createElement('button');more.className='button';more.dataset.forumMore='';more.textContent='Загрузить ещё темы';more.addEventListener('click',()=>loadForumTopics());$('.forum-threads').append(more);}more.hidden=forumNextOffset===null;forumThreads=$$('[data-forum-category]');filterForum();status.textContent='';revealTopic();
 }catch{status.textContent='Не удалось загрузить новые обсуждения. ';const retry=document.createElement('button');retry.className='text-link';retry.textContent='Повторить';retry.onclick=()=>loadForumTopics(reset);status.append(retry);}
 finally{forumLoading=false;}
}
async function loadForumReplies(thread,reset=false,offset=0){
 const host=$$('[data-thread-replies]').find(el=>el.dataset.threadReplies===thread);if(!host||host.dataset.loading==='true'||(!reset&&offset===0&&host.dataset.loaded==='true'))return;host.dataset.loading='true';
 try{const data=await accountRequest('/forum/replies?thread='+encodeURIComponent(thread)+'&offset='+offset);if(reset||offset===0)host.replaceChildren();host.querySelector('[data-replies-more]')?.remove();for(const post of data.replies)host.append(forumPostElement(post));host.dataset.loaded='true';if(data.nextOffset!==null){const more=document.createElement('button');more.dataset.repliesMore='';more.className='text-link';more.textContent='Ещё ответы';more.onclick=()=>loadForumReplies(thread,false,data.nextOffset);host.append(more);}}
 catch{host.replaceChildren();const retry=document.createElement('button');retry.className='text-link';retry.textContent='Не удалось загрузить ответы. Повторить';retry.onclick=()=>loadForumReplies(thread,true);host.append(retry);}
 finally{host.dataset.loading='false';}
}
function watchForumThread(el){el.addEventListener('toggle',()=>{if(el.open)void loadForumReplies(el.id.slice(6));});if(el.open)void loadForumReplies(el.id.slice(6));}
for(const el of forumThreads)watchForumThread(el);
document.addEventListener('click',async event=>{const reply=event.target.closest('[data-forum-reply]');if(reply){await authReady;openForumComposer(reply.dataset.forumReply);}});
if($('.forum-threads'))void loadForumTopics(true);

for(const b of $$('[data-import-guest]'))b.addEventListener('click',async()=>{await authReady;if(!schoolUser)return;let guest;try{guest=cleanState(JSON.parse(localStorage.getItem('zeland.journal.v1')||'{}'));}catch{return;}update({completed:[...new Set([...guest.completed,...state.completed])],notes:{...guest.notes,...state.notes}});renderProgressState();b.hidden=true;toast('Отметки добавлены в ваш аккаунт');});
