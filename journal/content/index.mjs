import basics from './basics.mjs';
import choice from './choice.mjs';
import attention from './attention.mjs';
import life from './life.mjs';
import practiceContent from './practices.mjs';
import depth from './editorial-depth.mjs';
import deepBasics from './deep-basics.mjs';
import deepChoice from './deep-choice.mjs';
import deepAttention from './deep-attention.mjs';
import deepLife from './deep-life.mjs';
import {readMinutes} from '../lib.mjs';

export const createdAt = '2026-11-21';
export const topics = [
 {id:'basics', title:'Основы трансерфинга', short:'Основы', description:'Маятники, Смотритель, зеркало мира и другие опорные понятия.',art:'pendulum'},
 {id:'choice', title:'Цели и свой выбор', short:'Свой выбор', description:'Собственное направление, намерение и первые реальные шаги.',art:'path'},
 {id:'attention', title:'Важность и внимание', short:'Внимание', description:'Меньше внутренней борьбы. Больше ясности в своих реакциях.',art:'balance'},
 {id:'life', title:'Практика в обычной жизни', short:'В жизни', description:'Работа, отношения, привычки и решения на каждый день.',art:'key'}
];
// Alternate topics deliberately, preserving the same stable order across visits.
const collections=[basics,attention,choice,life];
const deep={...deepBasics,...deepChoice,...deepAttention,...deepLife};
export const articles=Array.from({length:Math.max(...collections.map(x=>x.length))},(_,i)=>collections.map(list=>list[i]).filter(Boolean)).flat().map(x=>{
 const additions=[...(depth[x.slug]||[]),...(deep[x.slug]||[])];
 const sections=[...x.sections.slice(0,-1),...additions,x.sections.at(-1)];
 const wordCount=[x.title,x.description,...sections.flat()].join(' ').split(/\s+/u).filter(Boolean).length;
 return {...x,sections,type:'article',date:createdAt,wordCount,minutes:readMinutes([x.title,x.description,...sections.flat()].join(' ')),readingFormat:wordCount>=1800?'Большой путеводитель':wordCount>=1200?'Подробный разбор':wordCount>=850?'Разбор с примерами':'Практический взгляд'};
});
export const practices=practiceContent.map(x=>({...x,type:'practice',date:createdAt,tags:[x.principle],sections:[]}));
export const mixedMaterials=articles.flatMap((item,i)=>[item,...(i%4===3&&practices[Math.floor(i/4)]?[practices[Math.floor(i/4)]]:[])]);
export const routes = [
 {slug:'poznakomitsya',title:'Я только знакомлюсь',description:'Понять основные идеи без сложного словаря и попробовать первое наблюдение.',art:'path',items:[['article','transurfing-s-chego-nachat'],['article','smotritel'],['practice','pauza-smotritelya']],end:'lesson'},
 {slug:'menshe-napryazheniya',title:'Хочу меньше внутренней борьбы',description:'Разобраться с важностью, заметить свои крючки и подготовить другой способ действовать.',art:'balance',items:[['article','snizit-vazhnost'],['article','mayatniki'],['practice','plan-b']],end:'lesson'},
 {slug:'svoy-put',title:'Ищу своё направление',description:'Отделить собственный интерес от ожиданий и выбрать небольшой шаг.',art:'key',items:[['article','svoia-tsel'],['article','tseli-i-dveri'],['practice','svoya-tsel']],end:'lesson'}
];
export const questions = [
 {category:'Принципы',q:'Снижать важность — значит отказаться от желания?',a:'Нет. Можно сохранять желание и готовиться к результату, одновременно признавая, что исход не полностью зависит от вас. Важно различать саму цель и требование, чтобы она осуществилась единственным способом.',slug:'snizit-vazhnost'},
 {category:'Практики',q:'Что делать, если я замечаю реакцию только после разговора?',a:'Начните с разбора после события. Найдите конкретный момент, в котором в следующий раз хотелось бы сделать паузу. Это уже материал для практики. Не требуется замечать каждую реакцию сразу.',slug:'smotritel'},
 {category:'Принципы',q:'Любая группа людей — это вредный маятник?',a:'Общее дело само по себе не делает участие нежелательным. Смотрите на свою вовлечённость: понимаете ли вы, зачем участвуете, можете ли обозначить границу и не теряете ли собственную задачу.',slug:'mayatniki'},
 {category:'Практики',q:'Нужно ли заставлять себя испытывать спокойствие?',a:'Нет. Можно заметить волнение и всё же выбрать конкретное действие. Упражнения не требуют немедленно изменить чувство. Если способ наблюдения неприятен, измените его или остановитесь.',slug:'kontrol'},
 {category:'Принципы',q:'Означает ли зеркало мира, что я виноват во всех неприятностях?',a:'Нет. Обстоятельства и действия других людей не находятся под вашим полным контролем. Метафора не должна становиться обвинением или причиной терпеть ущерб. Полезнее определить доступное вам действие и необходимую помощь.',slug:'zerkalo-mira'},
 {category:'Опыт и наблюдения',q:'Как понять, что практика дала результат?',a:'Смотрите на конкретные эпизоды: получилось уточнить просьбу, остановить ненужный спор, сделать отложенный шаг. Отметка «выполнено» отражает вашу запись о попытке, а не подтверждённое изменение жизни.',slug:'ritm-praktiki'},
 {category:'Практики',q:'Сколько упражнений делать одновременно?',a:'Для знакомства удобно выбрать одно упражнение и несколько раз попробовать его в похожих ситуациях. Так проще понять, что именно вы меняете. Универсального обязательного количества здесь нет.',slug:'ot-chteniya-k-praktike'},
 {category:'Опыт и наблюдения',q:'Если пропустил день, нужно начинать сначала?',a:'Необязательно. Посмотрите, что помешало, и вернитесь к небольшой версии действия. Накопленный опыт не исчезает из-за пропуска. При необходимости измените время или само упражнение.',slug:'ritm-praktiki'},
 {category:'Принципы',q:'Нужно ли верить во все положения трансерфинга?',a:'Можно знакомиться с авторской системой критически: различать метафизические утверждения, метафоры и наблюдаемые действия. В журнале мы предлагаем бытовые примеры и вопросы для собственного исследования.',slug:'transurfing-s-chego-nachat'},
 {category:'Опыт и наблюдения',q:'Как отличить свою цель от желания одобрения?',a:'Представьте обычный день после достижения и спросите, что осталось бы привлекательным, если бы никто не узнал о результате. Затем проверьте интерес небольшим опытом. Один ответ не определяет предназначение навсегда.',slug:'svoia-tsel'}
];
export const bookList = [
 {title:'Пространство вариантов',cover:'book-1.jpg',width:357,height:560,subtitle:'Трансерфинг реальности · I ступень',description:'Начало классической серии. Удобная отправная точка для знакомства с языком автора и основными понятиями.',slug:'transurfing-s-chego-nachat'},
 {title:'Шелест утренних звёзд',cover:'book-2.jpg',width:353,height:566,subtitle:'Трансерфинг реальности · II ступень',description:'Продолжение классической серии. Читайте последовательно и сопоставляйте новые понятия с первой ступенью.',slug:'namerenie-i-zhelanie'},
 {title:'Вперёд в прошлое',cover:'book-3.jpg',width:251,height:400,subtitle:'Трансерфинг реальности · III ступень',description:'Следующая часть серии. После главы оставьте время на запись вопроса и собственного примера.',slug:'tselevoi-slaid'},
 {title:'Управление реальностью',cover:'book-4.jpg',width:200,height:316,subtitle:'Трансерфинг реальности · IV ступень',description:'Продолжение знакомства с авторской системой. Отмечайте, какие идеи требуют возвращения к предыдущим книгам.',slug:'koordinatsiya'},
 {title:'Яблоки падают в небо',cover:'book-5.jpg',width:355,height:563,subtitle:'Трансерфинг реальности · V ступень',description:'Пятая ступень классического цикла. Полезно завершить чтение собственной картой понятий и вопросов.',slug:'zerkalo-mira'}
];
export const lesson = {slug:'pauza-i-vybor',title:'Пауза. Наблюдение. Выбор.',description:'Открытый редакционный модуль: одна понятная идея, практика и небольшой шаг в вашей жизни.',minutes:12};
export const config = {
 name:'Zeland', subtitle:'Школа трансерфинга',
 telegram:'https://t.me/vadim_official_z', app:'https://app.zeland.it.com/',
 course:'https://zeland.it.com/course',
 video:'https://res.cloudinary.com/dimfmfhbt/video/upload/vc_h264,q_auto/v1786895640/-1509310536239356047_midol9.mp4',
 videoPoster:'https://res.cloudinary.com/dimfmfhbt/video/upload/so_2,q_auto/v1786895640/-1509310536239356047_midol9.jpg',
 pricesCheckedAt:createdAt,
 sources:[{title:'Книги Вадима Зеланда',url:'https://zelands.ru/knigi-o-transerfinge/'},{title:'Принципы в изложении автора',url:'https://zelands.ru/principy-transerfinga/'}]
};
