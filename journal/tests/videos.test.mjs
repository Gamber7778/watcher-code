import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {videos,videoTopics} from '../videos.mjs';
import {templates} from '../templates.mjs';
import {articles,practices} from '../content/index.mjs';
test('video journeys are distinct, connected and expose no Google Drive source identifiers',()=>{
 const t=templates({base:'/',origin:'https://zeland.it.com'});assert.equal(new Set(videos.map(v=>v.slug)).size,videos.length);
 const catalog=readFileSync(new URL('../content/videos.json',import.meta.url),'utf8');assert.doesNotMatch(catalog,/sourceId|sourceName|drive\.google|@/);
 for(const v of videos){assert.ok(v.duration>0);assert.ok(videoTopics.some(x=>x.id===v.topic));assert.ok(articles.some(x=>x.slug===v.article));assert.ok(practices.some(x=>x.slug===v.practice));for(const ext of ['mp4','webp'])assert.ok(existsSync(new URL('../assets/videos/'+v.slug+'.'+ext,import.meta.url)));const html=t.videoPage(v);assert.doesNotMatch(html,/drive\.google|googleusercontent|\/file\/d\//);assert.match(html,/preload="none"/);assert.match(html,/data-video-next="practice"/);assert.match(html,/data-video-next="discussion"/);}
});
