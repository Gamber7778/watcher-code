import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {templates} from '../templates.mjs';
import {practices,articles} from '../content/index.mjs';
const t=templates({base:'/',origin:'https://example.org'});
const source=readFileSync(new URL('../assets/client.mjs',import.meta.url),'utf8');

test('all existing practice URLs have one reflection and completion, without timing, light theme or step checkboxes',()=>{
 for(const item of practices){
  const html=t.material(item);
  assert.doesNotMatch(html,/data-timer|data-reading-theme|data-practice-step|data-practice-progress|undefined|NaN/);
  assert.equal((html.match(/data-complete=/g)||[]).length,1,item.slug);
  assert.equal((html.match(/data-note=/g)||[]).length,1,item.slug);
  assert.match(html,/Личная запись сохраняется в вашем аккаунте/);
  assert.ok(html.includes(item.principle),item.slug);
  for(const [title,text] of item.steps){assert.ok(html.includes(title));assert.ok(text.length>200);}
 }
 for(const html of [t.home(),t.library({practiceOnly:true}),t.library(),...articles.map(x=>t.material(x))])assert.doesNotMatch(html,/data-reading-theme|undefined мин|NaN минут/);
 assert.doesNotMatch(source,/reading-light|data-reading-theme|data-timer-seconds/);
});

test('one attempt saves the current reflection with the stable root key, preserves old history and requires login',async()=>{
 const handlers={},button={dataset:{complete:'practice:pauza-smotritelya'},setAttribute(){}},field={dataset:{note:'practice:pauza-smotritelya'},value:' Моё наблюдение '};
 const changes=[],events=[],auth=[];
 button.addEventListener=(name,fn)=>handlers[name]=fn;
 const context=vm.createContext({state:{completed:['practice:pauza-smotritelya:0'],notes:{}},schoolUser:null,authReady:Promise.resolve(),unsavedNotes:true,
 $$:s=>s==='[data-complete]'?[button]:s==='[data-note]'?[field]:[],openAuth:(...x)=>auth.push(x),update:value=>{changes.push(value);Object.assign(context.state,value);return true;},toast(){},event:(...x)=>events.push(x)});
 vm.runInContext(source.slice(source.indexOf('function refreshCompletion()'),source.indexOf('function refreshRoutes()')),context);
 await handlers.click();assert.equal(auth.length,1);assert.equal(changes.length,0);
 context.schoolUser={id:1};await handlers.click();
 assert.equal(changes[0].notes['practice:pauza-smotritelya'],'Моё наблюдение');
 assert.deepEqual([...changes[0].completed],['practice:pauza-smotritelya:0','practice:pauza-smotritelya']);
 assert.equal(context.unsavedNotes,false);
 await handlers.click();assert.deepEqual([...changes[1].completed],['practice:pauza-smotritelya:0']);
 assert.equal(changes[1].notes['practice:pauza-smotritelya'],'Моё наблюдение');
 assert.equal(events.length,2);assert.ok(!JSON.stringify(events).includes('наблюдение'));
});
