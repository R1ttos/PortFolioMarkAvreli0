(function(){
'use strict';
const $ = id => document.getElementById(id);
const msgs = $('msgs'), input = $('input');
const SERVICES = [
  {name:'Стрижка',        price:600},
  {name:'Манікюр',        price:700},
  {name:'Фарбування',     price:1500},
  {name:'Масаж обличчя',  price:800}
];
const fmt = n => n.toLocaleString('uk-UA') + ' ₴';

/* ---------- CRM ---------- */
const crm = [
  {name:'Марія Д.',  service:'Манікюр',    when:'Сьогодні, 14:00', status:'ok',  price:700},
  {name:'Олег С.',   service:'Стрижка',    when:'Сьогодні, 16:00', status:'ok',  price:600},
  {name:'Інна К.',   service:'Масаж обличчя', when:'Завтра, 11:00', status:'new', price:800}
];
const STATUS = {new:['new','Нова'], ok:['ok','Підтверджено'], wait:['wait','Чекає менеджера']};
function renderCrm(freshIdx){
  $('rows').innerHTML = crm.map((r, i) => `<tr class="${i === freshIdx ? 'fresh' : ''}"><td>${r.name}</td><td>${r.service}</td><td>${r.when}</td><td><span class="pill ${STATUS[r.status][0]}">${STATUS[r.status][1]}</span></td></tr>`).join('');
  $('kTotal').textContent = crm.length;
  $('kNew').textContent = crm.filter(r => r.status === 'new').length;
  $('kSum').textContent = fmt(crm.reduce((s, r) => s + r.price, 0));
}
renderCrm();
function log(text){
  const ol = $('log'); const m = ol.querySelector('.muted'); if (m) m.remove();
  const t = new Date().toLocaleTimeString('uk-UA', {hour:'2-digit', minute:'2-digit'});
  const li = document.createElement('li'); li.innerHTML = `<time>${t}</time>${text}`;
  ol.prepend(li);
}

/* ---------- Чат ---------- */
function scroll(){ msgs.scrollTop = msgs.scrollHeight; }
function addMsg(text, who){
  const d = document.createElement('div'); d.className = 'm ' + who; d.textContent = text; msgs.appendChild(d); scroll();
}
function say(text, buttons, one){
  return new Promise(res => {
    const t = document.createElement('div'); t.className = 'typing'; t.innerHTML = '<i></i><i></i><i></i>';
    msgs.appendChild(t); scroll();
    setTimeout(() => {
      t.remove(); addMsg(text, 'bot');
      if (buttons && buttons.length){
        const kb = document.createElement('div'); kb.className = 'kb' + (one ? ' one' : '');
        buttons.forEach(b => {
          const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = b.label;
          btn.addEventListener('click', () => { kb.dataset.used = '1'; addMsg(b.label.replace(/^\S+\s/, ''), 'me'); b.go(); });
          kb.appendChild(btn);
        });
        msgs.appendChild(kb); scroll();
      }
      res();
    }, 650);
  });
}

const draft = {};
let mode = null; // 'name' | 'phone' | null

const menu = () => say('Чим можу допомогти?', [
  {label:'📅 Записатися', go: askService},
  {label:'💰 Ціни',       go: prices},
  {label:'📍 Адреса',     go: address},
  {label:'👤 Менеджер',   go: manager}
]);

async function start(){
  await say('Вітаю! Я бот студії Lume. Допоможу записатися, підкажу ціни та адресу. Працюю цілодобово.');
  menu();
}
async function prices(){
  await say('Наші ціни:\n' + SERVICES.map(s => `• ${s.name}: ${fmt(s.price)}`).join('\n'), [
    {label:'📅 Записатися', go: askService}, {label:'↩ Меню', go: menu}
  ]);
}
async function address(){
  await say('Ми на вул. Центральна, 12, 2 поверх.\nПн–Нд: 9:00–20:00.', [{label:'📅 Записатися', go: askService}, {label:'↩ Меню', go: menu}]);
}
async function manager(){
  log('Клієнт попросив зв\'язок → сповіщення менеджеру в Telegram');
  await say('Передав ваш запит менеджеру. Він напише вам у цьому чаті протягом 15 хвилин.', [{label:'↩ Меню', go: menu}]);
}
async function askService(){
  await say('Оберіть послугу:', SERVICES.map(s => ({label: `${s.name} · ${s.price} ₴`, go: () => { draft.service = s; askDate(); }})));
}
async function askDate(){
  const days = ['Сьогодні','Завтра','Післязавтра'];
  await say(`${draft.service.name}, чудовий вибір. На який день записати?`, days.map((d, i) => {
    const dt = new Date(); dt.setDate(dt.getDate() + i);
    return {label: `${d}, ${dt.toLocaleDateString('uk-UA', {day:'numeric', month:'short'})}`, go: () => { draft.day = d; askTime(); }};
  }));
}
async function askTime(){
  const free = ['11:00','13:30','15:00','17:30'];
  await say('Вільні години:', free.map(t => ({label: t, go: () => { draft.time = t; askName(); }})));
}
async function askName(){ mode = 'name'; await say('Як вас звати? Напишіть ім\'я в чат.'); input.focus(); }
async function askPhone(){ mode = 'phone'; await say('Залиште номер телефону для підтвердження.'); input.focus(); }
async function confirm(){
  mode = null;
  await say(`Перевірте запис:\n${draft.service.name} · ${fmt(draft.service.price)}\n${draft.day}, ${draft.time}\nІм'я: ${draft.name}\nТелефон: ${draft.phone}`, [
    {label:'✅ Підтвердити', go: done}, {label:'✖ Скасувати', go: cancel}
  ]);
}
async function done(){
  crm.unshift({name: draft.name, service: draft.service.name, when: `${draft.day}, ${draft.time}`, status:'new', price: draft.service.price});
  renderCrm(0);
  log('Заявку створено в CRM');
  setTimeout(() => log('Рядок додано в Google Sheets'), 500);
  setTimeout(() => log('Менеджеру надіслано сповіщення в Telegram'), 1000);
  setTimeout(() => log('Заплановано нагадування клієнту за 2 години до візиту'), 1500);
  await say('Готово, ви записані! За 2 години до візиту надішлю нагадування. Чекаємо на вас.', [{label:'↩ Меню', go: menu}]);
}
async function cancel(){ await say('Запис скасовано. Можемо почати спочатку.', [{label:'📅 Записатися', go: askService}, {label:'↩ Меню', go: menu}]); }

/* Текстовий ввід */
$('composer').addEventListener('submit', e => {
  e.preventDefault();
  const v = input.value.trim(); if (!v) return;
  input.value = ''; addMsg(v, 'me');
  if (mode === 'name'){
    if (v.length < 2){ say('Ім\'я надто коротке. Спробуйте ще раз.'); return; }
    draft.name = v; askPhone(); return;
  }
  if (mode === 'phone'){
    if (!/^\+?\d[\d\s()-]{8,}$/.test(v)){ say('Схоже, номер некоректний. Приклад: +380 50 123 45 67'); return; }
    draft.phone = v; confirm(); return;
  }
  const t = v.toLowerCase();
  if (/(запис|записат|бронь)/.test(t)) askService();
  else if (/(ціна|ціни|скільки|вартість)/.test(t)) prices();
  else if (/(адрес|де ви|де знаход)/.test(t)) address();
  else if (/(менеджер|людин|оператор)/.test(t)) manager();
  else say('Не впевнений, що зрозумів. Оберіть, будь ласка, пункт меню.', [
    {label:'📅 Записатися', go: askService}, {label:'💰 Ціни', go: prices}, {label:'📍 Адреса', go: address}, {label:'👤 Менеджер', go: manager}
  ]);
});
start();
})();
