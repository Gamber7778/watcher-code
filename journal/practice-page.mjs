import {escapeHTML as e} from './lib.mjs';

export function practicePage(item,{shell,u,crumb,art,controls,card,article,forumTopics,origin,published}) {
 const key='practice:'+item.slug,route='practices/'+item.slug+'/';
 const paragraphs=text=>text.split('\n\n').map(p=>`<p>${e(p)}</p>`).join('');
 const discussions=forumTopics.filter(t=>t.practice===item.slug||item.related.includes(t.article)).slice(0,2);
 return shell({title:item.title,description:item.description,route,active:'practices',reading:true,
  schema:published?{'@context':'https://schema.org','@type':'LearningResource',headline:item.title,description:item.description,mainEntityOfPage:origin+u(route)}:null,
  body:`<progress class="reading-progress" max="100" value="0" aria-label="Положение на странице"></progress>
  ${crumb([['Практики',u('practices/')],[item.title]])}
  <header class="article-header practice-header">
   <p class="eyebrow">${e(item.principle)}</p><h1>${e(item.title)}</h1><p class="article-deck">${e(item.description)}</p>
   ${controls}<a class="button gold practice-start-link" href="#section-1">Попробовать на своей ситуации</a>
  </header>
  <div class="article-cover">${art(item.art)}</div>
  <div class="reader-layout practice-reader">
   <aside class="toc"><details><summary>В этой практике</summary><ol>${item.steps.map(([title],i)=>`<li><a href="#section-${i+1}">${e(title)}</a></li>`).join('')}<li><a href="#notebook">Моё наблюдение</a></li></ol></details></aside>
   <article class="article-body practice-body" data-material="${key}">
    <div class="practice-scene"><p class="eyebrow">Узнаёте этот момент?</p>${paragraphs(item.intro)}</div>
    <div class="practice-method"><h2>Что здесь можно попробовать</h2><p>${e(item.method)}</p><p class="practice-intent">${e(item.goal)}</p></div>
    <div class="practice-entry"><strong>Возьмите одну свою ситуацию</strong><p>${e(item.preparation)}</p><p class="practice-pace">Сначала прочитайте ход практики, затем попробуйте в своём эпизоде. Записать наблюдение можно после.</p></div>
    ${item.steps.map(([title,text],i)=>`<section class="practice-movement" id="section-${i+1}"><h2>${e(title)}</h2>${paragraphs(text)}</section>`).join('')}
    <details class="practice-example"><summary>Как это может выглядеть в жизни</summary><dl>${item.example.map(([label,value])=>`<div><dt>${e(label)}</dt><dd>${e(value)}</dd></div>`).join('')}</dl></details>
    <section class="practice-reflection"><p class="eyebrow">После попытки</p><h2>Что изменилось для вас?</h2><p>${e(item.finish)}</p><ul>${item.questions.map(q=>`<li>${e(q)}</li>`).join('')}</ul></section>
    <details class="practice-troubleshooting"><summary>Если не получилось или осталось непонятно</summary><p>${e(item.pitfall)}</p><h3>На что можно опереться</h3><p>${e(item.workbook.checkpoint)}</p></details>
    <section class="notebook" id="notebook"><h2>Моё наблюдение</h2><p>Достаточно одной честной записи: что попробовали, что заметили, где осталось непонятно. Можно вернуться и дополнить её после следующего опыта.</p>
     <button class="text-link" type="button" data-note-template="${e(item.workbook.fields.join('\n\n'))}">Подсказки для записи</button>
     <label for="personal-note">Что произошло в вашей попытке?</label><textarea id="personal-note" data-note="${key}" rows="6" maxlength="12000" placeholder="Я заметил(а)… В следующий раз хочу попробовать…"></textarea>
     <p class="local-note">Личная запись сохраняется в вашем аккаунте и не публикуется на форуме. Для сохранения войдите или создайте бесплатный аккаунт.</p>
     <div class="button-row"><button class="button" data-save-note="${key}">Сохранить наблюдение</button><button class="button gold" data-complete="${key}" aria-pressed="false">Я попробовал(а)</button></div>
     <p class="completion-note">Одна отметка о попытке. Проходить практику можно снова, без отчёта за каждое действие.</p><p class="local-note" data-progress-storage role="status"></p><button class="text-link" data-progress-retry hidden>Повторить сохранение</button>
    </section>
    <section class="practice-return"><h2>Возьмите это в следующий день</h2><p>${e(item.workbook.returnWhen)}</p></section>
    <section class="article-discussion"><p class="eyebrow">Обсудить опыт</p><h2>На каком моменте вы остановились?</h2><p>Можно рассказать о своей ситуации или задать вопрос к практике.</p><div class="related-discussions">${discussions.map(t=>`<a href="${u('questions/#topic-'+t.id)}"><span>${e(t.category)}</span><strong>${e(t.title)}</strong></a>`).join('')}</div><a class="button" href="${u('questions/')}">Открыть форум</a></section>
   </article>
  </div><section class="section"><div class="section-head"><h2>Разобраться глубже</h2></div><div class="related-grid">${item.related.map(slug=>card(article(slug))).join('')}</div></section>`
 });
}
