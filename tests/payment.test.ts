import {test} from 'node:test';
import assert from 'node:assert/strict';
import {formats,paymentAction} from '../src/lib/course-offers.ts';

test('every format/currency retains its own checkout or explicit Telegram fallback',()=>{
 const links={self_USD:'https://pay.merchant.test/self-usd',self_RUB:'https://pay.merchant.test/self-rub',personal_USD:'https://pay.merchant.test/personal-usd',personal_RUB:'https://pay.merchant.test/personal-rub'};
 for(const format of formats)for(const currency of ['USD','RUB'] as const){
  const direct=paymentAction(format.id,currency,links);
  assert.equal(direct.href,links[`${format.id}_${currency}`]);assert.equal(direct.direct,true);
  const fallback=paymentAction(format.id,currency,{});
  assert.equal(fallback.direct,false);
  const url=new URL(fallback.href);assert.equal(url.hostname,'t.me');
  assert.ok(url.searchParams.get('text')!.includes(format.name));
  assert.ok(url.searchParams.get('text')!.includes(format.prices[currency]));
  assert.match(fallback.label,/Получить ссылку/);
 }
});
test('invalid and placeholder links never masquerade as checkout',()=>{
 for(const value of ['javascript:alert(1)','http://pay.merchant.test','https://buy.stripe.com/your-link','https://example.com/pay','https://user:secret@pay.merchant.test']){
  assert.equal(paymentAction('self','USD',{self_USD:value}).direct,false);
 }
});
