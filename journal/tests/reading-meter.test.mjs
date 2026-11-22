import test from 'node:test';
import assert from 'node:assert/strict';
import {createReadingMeter} from '../assets/reading-meter.mjs';
test('reading meter excludes background, inactive time and clamps suspended timer gaps',()=>{
 const m=createReadingMeter();m.sample({now:0,active:true});assert.equal(m.sample({now:1000,active:true,depthPercent:25}).active_seconds,1);
 m.sample({now:2000,active:false,depthPercent:100,endVisible:true});assert.equal(m.sample({now:60000,active:false}).active_seconds,1);
 const back=m.sample({now:61000,active:true,depthPercent:50});assert.equal(back.active_seconds,1);assert.equal(back.end_reached,false);
 assert.equal(m.sample({now:62000,active:true,depthPercent:100,endVisible:true}).active_seconds,2);
 assert.equal(m.sample({now:90000,active:true}).active_seconds,4);
});
