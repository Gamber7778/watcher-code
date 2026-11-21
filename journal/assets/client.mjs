import {normalizeText,searchMatches} from './lib.mjs';

const base=document.body.dataset.base||'/';
const storeKey='zeland.journal.v1';
const consentKey='zeland.journal.analytics';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
let toastTimeout, state={saved:[],completed:[],notes:{},lesson:[],routes:[],theme:'dark'};
const toast=(message)=>{const el=$('.toast');if(!el)return;el.textContent=message;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.hidden=true,4500);};
const safeKey=s=>typeof s==='string'&&/^(article|practice|lesson|route):[a-z0-9-]+(?::\d+)?$/.test(s);
function cleanState(raw={}){
 const clean={saved:[],completed:[],notes:{},lesson:[],routes:[],theme:'dark'};
 for(const key of ['saved','completed','routes'])clean[key]=Array.isArray(raw[key])?[...new Set(raw[key].filter(safeKey))].slice(0,500):[];
 clean.lesson=Array.isArray(raw.lesson)?[...new Set(raw.lesson.filter(x=>['idea','practice','action'].includes(x)))]:[];
 if(raw.notes&&typeof raw.notes==='object'&&!Array.isArray(raw.notes))for(const [key,value]of Object.entries(raw.notes))if(safeKey(key)&&typeof value==='string')clean.notes[key]=value.slice(0,12000);
 clean.theme=raw.theme==='light'?'light':'dark'; return clean;
}
try{state=cleanState(JSON.parse(localStorage.getItem(storeKey)||'{}'));}catch{}
function persist(next){try{localStorage.setItem(storeKey,JSON.stringify(next));state=next;return true;}catch{toast('Не удалось сохранить в браузере. Проверьте доступное место и настройки хранения.');return false;}}
function update(changes){return persist({...state,...changes});}
function toggleValue(key,value){const next=state[key].includes(value)?state[key].filter(x=>x!==value):[...state[key],value];return update({[key]:next});}
function consentValue(){try{return localStorage.getItem(consentKey);}catch{return null;}}
let analyticsReady=false;
const gaId=document.body.dataset.analyticsId;
function safeLocation(url){try{const v=new URL(url);return v.origin+v.pathname;}catch{return '';}}
function startAnalytics(){
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
function event(name,params={}){if(consentValue()!=='yes')return;const payload={...params,page_location:safeLocation(location.href),page_path:location.pathname};window.dispatchEvent(new CustomEvent('zeland:analytics',{detail:{event:name,...payload}}));if(analyticsReady)window.gtag('event',name,payload);}
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
for(const b of $$('[data-auth-open]'))b.addEventListener('click',()=>{closeMenu();authTab(b.dataset.authOpen==='register'?'register':'login');const context=$('#auth-context');if(context)context.textContent=b.dataset.authReason==='forum'?'Аккаунт нужен, чтобы создавать темы, отвечать и возвращаться к своим обсуждениям.':b.dataset.authReason==='learning'?'Первый модуль, задания и продолжение обучения будут доступны в едином кабинете.':'Один аккаунт для обучения, сохранённых материалов и общения.';authDialog.showModal();syncDialogScroll();$('.auth-tabs [aria-selected="true"]')?.focus();});
for(const b of $$('[data-auth-close]'))b.addEventListener('click',()=>authDialog.close());
for(const b of $$('[data-auth-tab]')){
 b.addEventListener('click',()=>authTab(b.dataset.authTab));
 b.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const tab=event.key==='Home'?'login':event.key==='End'?'register':b.dataset.authTab==='login'?'register':'login';authTab(tab);$('[data-auth-tab="'+tab+'"]').focus();});
}
authDialog?.addEventListener('close',syncDialogScroll);
for(const dialog of [menuDialog,authDialog])dialog?.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();const input=$('#search')||$('#header-query');input?.focus();}});

function refreshSaved(){for(const btn of $$('[data-save]')){const saved=state.saved.includes(btn.dataset.save);btn.setAttribute('aria-pressed',String(saved));const span=$('span',btn);if(span)span.textContent=saved?'Сохранено':'Сохранить';if(btn.dataset.originalLabel===undefined)btn.dataset.originalLabel=btn.getAttribute('aria-label')||'';if(btn.dataset.originalLabel)btn.setAttribute('aria-label',saved?btn.dataset.originalLabel.replace('Сохранить:','Убрать из сохранённых:'):btn.dataset.originalLabel);}}
refreshSaved();
for(const btn of $$('[data-save]'))btn.addEventListener('click',()=>{if(!toggleValue('saved',btn.dataset.save))return;refreshSaved();toast(state.saved.includes(btn.dataset.save)?'Материал сохранён на этом устройстве':'Материал убран из сохранённых');event('bookmark_toggle',{material_id:btn.dataset.save,saved:state.saved.includes(btn.dataset.save)});if(libraryFilter)libraryFilter();});
for(const btn of $$('[data-share]'))btn.addEventListener('click',async()=>{const clean=new URL(location.href);clean.search='';clean.hash='';try{if(navigator.share){await navigator.share({title:document.title,url:clean.href});}else{await navigator.clipboard.writeText(clean.href);toast('Ссылка скопирована');}}catch(err){if(err.name!=='AbortError')toast('Не удалось скопировать. Адрес можно скопировать из строки браузера.');}});
const themeButton=$('[data-reading-theme]');
function refreshTheme(){if(!document.body.classList.contains('reading-page'))return;document.body.classList.toggle('reading-light',state.theme==='light');if(themeButton){themeButton.setAttribute('aria-pressed',String(state.theme==='light'));$('span',themeButton).textContent=state.theme==='light'?'Тёмный фон':'Светлый фон';}}
refreshTheme();themeButton?.addEventListener('click',()=>{if(update({theme:state.theme==='light'?'dark':'light'}))refreshTheme();});

for(const textarea of $$('[data-note]'))textarea.value=state.notes[textarea.dataset.note]||'';
for(const btn of $$('[data-save-note]'))btn.addEventListener('click',()=>{const field=$$('[data-note]').find(x=>x.dataset.note===btn.dataset.saveNote);if(field&&update({notes:{...state.notes,[btn.dataset.saveNote]:field.value.trim()}}))toast('Личная запись сохранена в этом браузере');});
let unsavedNotes=false;
for(const textarea of $$('[data-note]'))textarea.addEventListener('input',()=>unsavedNotes=true);
for(const btn of $$('[data-save-note]'))btn.addEventListener('click',()=>{unsavedNotes=$$('[data-note]').some(f=>f.value.trim()!==(state.notes[f.dataset.note]||''));});
window.addEventListener('beforeunload',e=>{if(unsavedNotes){e.preventDefault();e.returnValue='';}});
function refreshCompletion(){for(const btn of $$('[data-complete]')){const done=state.completed.includes(btn.dataset.complete);btn.setAttribute('aria-pressed',String(done));btn.textContent=done?'Практика отмечена — отменить':'Отметить практику выполненной';}}
refreshCompletion();
for(const btn of $$('[data-complete]'))btn.addEventListener('click',()=>{if(!toggleValue('completed',btn.dataset.complete))return;refreshCompletion();toast(state.completed.includes(btn.dataset.complete)?'Выполнение отмечено на этом устройстве':'Отметка выполнения снята');event('practice_completion_marked',{material_id:btn.dataset.complete,completed:state.completed.includes(btn.dataset.complete)});});
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
 for(const row of $$('[data-progress-key]',section)){const key=row.dataset.progressKey,note=Boolean(state.notes[key]?.trim()),done=state.completed.includes(key),lesson=key.startsWith('lesson:')?state.lesson.length:0;row.hidden=!note&&!done&&!lesson;if(!row.hidden)visible++;$('[data-progress-label]',row).textContent=[note?'Есть личная запись':'',done?'Выполнение отмечено':'',lesson?lesson+' из 3 шагов':''].filter(Boolean).join(' · ');}
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
 const apply=({url=true}={})=>{let count=0;const query=input.value.trim();for(const el of cards){const item=map.get(el.dataset.item),visible=(selectedTopic==='all'||selectedTopic===el.dataset.topic)&&(selectedFormat==='all'||selectedFormat===el.dataset.format)&&(library.dataset.savedOnly!=='true'||state.saved.includes(el.dataset.item))&&searchMatches(item,query);el.hidden=!visible;if(visible)count++;}$('#result-count').textContent='Найдено материалов: '+count;$('.empty-state',library).hidden=count!==0;for(const b of topicButtons){const active=b.dataset.topicFilter===selectedTopic;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}if(url){const next=new URL(location.href);for(const key of ['q','topic','format'])next.searchParams.delete(key);if(query)next.searchParams.set('q',query);if(selectedTopic!=='all')next.searchParams.set('topic',selectedTopic);if(selectedFormat!=='all'&&library.dataset.practiceOnly!=='true')next.searchParams.set('format',selectedFormat);history.replaceState(null,'',next.pathname+next.search+next.hash);}};
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
$('#import-data')?.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>2000000)throw new Error('size');const parsed=JSON.parse(await file.text());if(parsed.app!=='zeland-journal'||parsed.version!==1||!parsed.data)throw new Error('format');const incoming=cleanState(parsed.data);const merged=cleanState({...state,saved:[...state.saved,...incoming.saved],completed:[...state.completed,...incoming.completed],notes:{...state.notes,...incoming.notes},lesson:[...state.lesson,...incoming.lesson],routes:[...state.routes,...incoming.routes]});if(update(merged)){refreshSaved();libraryFilter?.();refreshPersonalProgress();toast('Данные добавлены. Совпадающие заметки обновлены из файла.');}}catch{toast('Не удалось импортировать. Выберите JSON-файл экспорта журнала до 2 МБ.');}e.target.value='';});
$('[data-delete-local]')?.addEventListener('click',()=>$('#delete-confirm').hidden=false);
$('[data-delete-cancel]')?.addEventListener('click',()=>$('#delete-confirm').hidden=true);
$('[data-delete-confirm]')?.addEventListener('click',()=>{try{localStorage.removeItem(storeKey);state=cleanState();$('#delete-confirm').hidden=true;toast('Локальные данные журнала удалены.');}catch{toast('Браузер не разрешил удалить данные.');}});

const consentPanel=$('#consent-panel');let previousFocus;
function closeConsent(){consentPanel.hidden=true;document.body.style.overflow='';previousFocus?.focus();}
for(const btn of $$('[data-consent-open]'))btn.addEventListener('click',()=>{previousFocus=document.activeElement;consentPanel.hidden=false;document.body.style.overflow='hidden';$('[data-consent="no"]').focus();});
$('[data-consent-close]')?.addEventListener('click',closeConsent);
consentPanel?.addEventListener('click',e=>{if(e.target===consentPanel)closeConsent();});
consentPanel?.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeConsent();}if(e.key==='Tab'){const list=$$('button,a',consentPanel),first=list[0],last=list.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
for(const btn of $$('[data-consent]'))btn.addEventListener('click',()=>{try{localStorage.setItem(consentKey,btn.dataset.consent);}catch{toast('Не удалось сохранить выбор. Статистика останется выключенной.');return;}if(btn.dataset.consent==='yes')startAnalytics();else{window['ga-disable-'+gaId]=true;if(window.gtag)window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}closeConsent();toast(btn.dataset.consent==='yes'?'Статистика включена по вашему согласию':'Отправка статистики выключена');});
window.addEventListener('storage',e=>{if(e.key===storeKey){try{state=cleanState(JSON.parse(e.newValue||'{}'));refreshSaved();refreshCompletion();refreshRoutes();refreshLesson();refreshTheme();refreshPersonalProgress();refreshPracticeSteps();libraryFilter?.();}catch{}}if(e.key===consentKey){if(e.newValue==='yes')startAnalytics();else window['ga-disable-'+gaId]=true;}});
// Search the complete demonstration feed; no profile or post is sent to a server.
const forumSearch=$('#forum-search'),forumThreads=$$('[data-forum-category]');
let forumTag='all';
function filterForum(){
 const query=normalizeText(forumSearch?.value||'').split(' ').filter(Boolean);let count=0;
 for(const thread of forumThreads){const text=normalizeText(thread.textContent);const visible=(forumTag==='all'||thread.dataset.forumCategory===forumTag)&&query.every(word=>text.includes(word));thread.hidden=!visible;if(visible)count++;}
 for(const b of $$('[data-forum-filter]')){const active=b.dataset.forumFilter===forumTag;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
 if($('.forum-count'))$('.forum-count').textContent='Темы: '+count;
 if($('.forum-empty'))$('.forum-empty').hidden=count!==0;
}
for(const b of $$('[data-forum-filter]'))b.addEventListener('click',()=>{forumTag=b.dataset.forumFilter;filterForum();});
forumSearch?.addEventListener('input',filterForum);
$('[data-forum-reset]')?.addEventListener('click',()=>{forumTag='all';forumSearch.value='';filterForum();forumSearch.focus();});
function revealTopic(){if(!/^#topic-[a-z-]+$/.test(location.hash))return;const topic=document.getElementById(location.hash.slice(1));if(!topic?.matches('[data-forum-category]'))return;forumTag='all';if(forumSearch)forumSearch.value='';filterForum();topic.open=true;topic.scrollIntoView({block:'start'});}
if(forumThreads.length){filterForum();revealTopic();window.addEventListener('hashchange',revealTopic);}
function refreshPracticeSteps(){for(const box of $$('[data-practice-step]'))box.checked=state.completed.includes(box.dataset.practiceStep);}
refreshPracticeSteps();
for(const box of $$('[data-practice-step]'))box.addEventListener('change',()=>{const value=box.dataset.practiceStep;const completed=box.checked?[...new Set([...state.completed,value])]:state.completed.filter(x=>x!==value);if(!update({completed}))refreshPracticeSteps();});

// Forum ordering and discovery remain local to the page; no fabricated activity.
$('#forum-sort')?.addEventListener('change',e=>{
 const sorted=[...forumThreads].sort((a,b)=>e.target.value==='replies'?Number(b.dataset.forumReplies)-Number(a.dataset.forumReplies)||Number(a.dataset.forumOrder)-Number(b.dataset.forumOrder):Number(a.dataset.forumOrder)-Number(b.dataset.forumOrder));
 const parent=$('.forum-threads'),empty=$('.forum-empty');for(const thread of sorted)parent.insertBefore(thread,empty);
});
$('[data-forum-collapse]')?.addEventListener('click',()=>{for(const thread of forumThreads)thread.open=false;toast('Обсуждения свёрнуты. Выберите интересующий вопрос.');});
for(const b of $$('[data-forum-person]'))b.addEventListener('click',()=>{forumTag='all';forumSearch.value=b.dataset.forumPerson;filterForum();forumSearch.focus();forumSearch.scrollIntoView({block:'center'});});
for(const b of $$('[data-note-template]'))b.addEventListener('click',()=>{const field=$('[data-note]');if(!field)return;const template=b.dataset.noteTemplate;if(!field.value.includes(template)){field.value=(field.value.trim()?field.value.trim()+'\n\n':'')+template;field.dispatchEvent(new Event('input',{bubbles:true}));}field.focus();toast('Вопросы добавлены. Заполните запись и нажмите «Сохранить заметку».');});
