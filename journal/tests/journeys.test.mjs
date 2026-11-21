import test from 'node:test';
import assert from 'node:assert/strict';
import {articles,practices,routes,bookList,createdAt} from '../content/index.mjs';
import {forumProfiles,forumTopics} from '../forum.mjs';
import {routeGuides,bookGuides} from '../content/journeys.mjs';
import {readMinutes} from '../lib.mjs';

const articleSlugs=new Set(articles.map(x=>x.slug));
const practiceSlugs=new Set(practices.map(x=>x.slug));
const topicIds=new Set(forumTopics.map(x=>x.id));

test('discussion authors, reply recipients and learning links resolve',()=>{
 assert.equal(topicIds.size,forumTopics.length);
 const names=new Set(forumProfiles.map(x=>x[0]));
 assert.equal(names.size,forumProfiles.length);
 names.add('Редакция Zeland');
 const used=new Set();
 for(const topic of forumTopics){
  if(topic.author!==null){assert.ok(forumProfiles[topic.author],topic.id);used.add(topic.author);}
  assert.ok(articleSlugs.has(topic.article),topic.id);
  if(topic.practice)assert.ok(practiceSlugs.has(topic.practice),topic.id);
  assert.ok(topic.question&&topic.editor,topic.id);
  for(const reply of topic.replies){
   assert.ok(forumProfiles[reply.user],topic.id);
   if(reply.to)assert.ok(names.has(reply.to),`${topic.id}: unknown reply recipient ${reply.to}`);
   assert.ok(reply.text.trim(),topic.id);used.add(reply.user);
  }
 }
 assert.equal(used.size,forumProfiles.length,'do not present inactive decorative profiles');
});

test('reading routes and book companions form complete content journeys',()=>{
 for(const route of routes){
  const guide=routeGuides[route.slug];assert.ok(guide,route.slug);
  assert.equal(guide.why.length,route.items.length);
  assert.equal(guide.reflect.length,route.items.length);
  assert.ok(topicIds.has(guide.forum),route.slug);
  assert.ok(bookList[guide.book-1],route.slug);
 }
 for(const guide of bookGuides){
  assert.ok(bookList[guide.id-1]);
  for(const slug of guide.articles)assert.ok(articleSlugs.has(slug),slug);
  assert.ok(practiceSlugs.has(guide.practice),guide.practice);
  assert.ok(topicIds.has(guide.forum),guide.forum);
 }
});

test('article durations come from their actual text and practices have complete guidance',()=>{
 for(const article of articles){
  const text=[article.title,article.description,...article.sections.flat()].join(' ');
  assert.equal(article.minutes,readMinutes(text),article.slug);
  assert.equal(article.date,createdAt,'no invented publication history');
 }
 for(const practice of practices){
  assert.equal(practice.workbook.hints.length,practice.steps.length,practice.slug);
  assert.ok(practice.workbook.fields.length>=3,practice.slug);
  assert.equal(new Set(practice.workbook.fields).size,practice.workbook.fields.length);
  assert.ok(practice.workbook.checkpoint&&practice.workbook.returnWhen&&practice.workbook.shortVersion);
  for(const [title,text] of practice.steps){assert.ok(title);assert.ok(text&&!text.includes('undefined'),practice.slug);}
 }
});
