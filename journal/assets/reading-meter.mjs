// Active time is an estimate: foreground, article visible, recent input; never proof of reading.
export function createReadingMeter(){
 let last=null,wasActive=false,seconds=0,depth=0,end=false;
 return {sample({now,active,depthPercent=0,endVisible=false}){
  if(last!==null&&active&&wasActive)seconds+=Math.max(0,Math.min(2,(now-last)/1000));
  last=now;wasActive=active;if(active){depth=Math.max(depth,Math.min(100,Math.max(0,depthPercent)));end=end||endVisible;}
  return {active_seconds:Math.floor(seconds),depth_percent:Math.floor(depth),end_reached:end};
 }};
}
export function observeReading({element,send,allowed,document:doc=document,window:win=window}){
 const meter=createReadingMeter(),visit_id=crypto.randomUUID();let lastInput=performance.now(),lastSent=-1,lastDepth=-1,lastEnd=false;
 const activity=()=>{lastInput=performance.now();};
 for(const name of ['pointerdown','pointermove','keydown','scroll','touchstart'])win.addEventListener(name,activity,{passive:true});
 const tick=(force=false)=>{
  const rect=element.getBoundingClientRect(),now=performance.now();
  const active=allowed()&&doc.visibilityState==='visible'&&doc.hasFocus()&&now-lastInput<60000&&rect.top<win.innerHeight&&rect.bottom>0;
  const snapshot=meter.sample({now,active,depthPercent:100*(win.innerHeight-rect.top)/Math.max(1,rect.height),endVisible:rect.bottom<=win.innerHeight&&rect.bottom>0});
  if(!allowed()||snapshot.active_seconds===0)return;
  if((force&&snapshot.active_seconds>lastSent)||snapshot.active_seconds-lastSent>=15||Math.floor(snapshot.depth_percent/25)>lastDepth||snapshot.end_reached!==lastEnd){
   send('reading_progress',{material_id:element.dataset.material,visit_id,...snapshot});lastSent=snapshot.active_seconds;lastDepth=Math.floor(snapshot.depth_percent/25);lastEnd=snapshot.end_reached;
  }
 };
 const timer=win.setInterval(()=>tick(),1000);
 const flush=()=>tick(true);doc.addEventListener('visibilitychange',flush);win.addEventListener('pagehide',flush);
 return ()=>{clearInterval(timer);flush();for(const name of ['pointerdown','pointermove','keydown','scroll','touchstart'])win.removeEventListener(name,activity);doc.removeEventListener('visibilitychange',flush);win.removeEventListener('pagehide',flush);};
}
