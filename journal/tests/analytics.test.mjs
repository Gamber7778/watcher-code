import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../assets/client.mjs',import.meta.url),'utf8');
function harness({consent='yes',ga='G-TEST',path='/articles/test/',material='article:test'}={}){
 const calls=[],scripts=[];let choice=consent;
 const document={body:{dataset:{analyticsId:ga}},title:'Test',referrer:'https://example.com/?private=1',createElement:()=>({}),head:{append:s=>scripts.push(s)}};
 const context=vm.createContext({document,location:{href:'https://zeland.it.com'+path+'?email=private&utm_source=test',pathname:path,search:'?email=private&utm_source=test'},URL,URLSearchParams,Date,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}},window:{dispatchEvent(){}},telemetryConsent:()=>choice,trackSchool:(...args)=>calls.push(args),$:selector=>selector==='[data-material]'&&material?{dataset:{material}}:null});
 vm.runInContext(source.slice(source.indexOf('function consentValue'),source.indexOf('const menuDialog')),context);
 return {context,calls,scripts,setConsent:value=>choice=value,run:code=>vm.runInContext(code,context)};
}
test('one page and material open per visit in both sinks; repeated initialization does not duplicate',()=>{
 const h=harness();h.run('startAnalytics();startAnalytics();');
 assert.equal(h.calls.filter(x=>x[0]==='page_view').length,1);
 assert.equal(h.calls.filter(x=>x[0]==='article_open').length,1);
 assert.equal(h.run("window.dataLayer.filter(x=>x[0]==='event'&&x[1]==='page_view').length"),1);
 assert.equal(h.scripts.length,1);
 assert.ok(!h.run('JSON.stringify(window.dataLayer)').includes('private'));
});
test('no analytics before consent, late consent works, revoke suppresses subsequent events',()=>{
 const h=harness({consent:null});assert.equal(h.calls.length,0);assert.equal(h.scripts.length,0);
 h.setConsent('yes');h.run('startAnalytics()');assert.equal(h.calls.length,2);
 h.setConsent('no');h.run("event('reading_progress',{active_seconds:30})");assert.equal(h.calls.length,2);
 h.setConsent('yes');h.run('startAnalytics()');assert.equal(h.calls.length,2);
});
test('server analytics still works without a GA ID; course is identified by actual URL',()=>{
 const h=harness({ga:'',path:'/course',material:null});assert.equal(h.scripts.length,0);assert.deepEqual(h.calls.map(x=>x[0]),['page_view','course_view']);
});
test('reading progress goes to both destinations with clean page context',()=>{
 const h=harness();h.run("event('reading_progress',{active_seconds:30,depth_percent:75})");
 assert.equal(h.calls.at(-1)[0],'reading_progress');
 assert.equal(h.run("window.dataLayer.at(-1)[1]"),'reading_progress');
 assert.equal(h.run("window.dataLayer.at(-1)[2].page_location"),'https://zeland.it.com/articles/test/');
});
test('video progress counts watched intervals after consent, not seeking or denied playback',()=>{
 const handlers={},events=[];let consent='no';const player={dataset:{libraryPlayer:'test',videoTopic:'attention'},addEventListener:(k,f)=>handlers[k]=f,paused:false,seeking:false,currentTime:0,duration:8};
 const context=vm.createContext({document:{hidden:false,addEventListener(){}},consentValue:()=>consent,event:(...x)=>events.push(x),$:s=>s==='[data-library-player]'?player:null});
 vm.runInContext(source.slice(source.indexOf("const libraryPlayer=$("),source.indexOf("for(const link of $$('[data-video-next]')")),context);
 handlers.play();player.currentTime=2;handlers.timeupdate();assert.equal(events.length,0);
 consent='yes';handlers.timeupdate();assert.equal(events[0][0],'video_started');
 player.currentTime=7;handlers.seeking();handlers.timeupdate();assert.equal(events.length,1);
 for(const time of [7.5,8,0,.5,1,1.5,2]){player.currentTime=time;handlers.timeupdate();}
 assert.ok(events.some(([name,p])=>name==='video_progress'&&p.progress_percent===25));
 assert.ok(!events.some(([name])=>name==='video_completed'));
});
