(function(){
'use strict';
const $ = id => document.getElementById(id);
const fmt = n => n + ' ₴';

/* Для справжніх фото додайте поле img: 'images/dish.jpg' */
const TABS = {coffee:'Кава та напої', breakfast:'Сніданки', main:'Основні страви', dessert:'Десерти'};
const DISHES = [
  {cat:'coffee',    name:'Флет вайт',          desc:'Подвійний еспресо, оксамитове молоко',            price:85,  w:'180 мл', kind:'latte'},
  {cat:'coffee',    name:'Домашній лимонад',   desc:'Лимон, м\'ята, лід, тростинний цукор',            price:95,  w:'400 мл', kind:'lemonade'},
  {cat:'breakfast', name:'Круасан з маслом',   desc:'Класичний, випікається щоранку',                 price:95,  w:'90 г',   kind:'croissant'},
  {cat:'breakfast', name:'Тост з авокадо',     desc:'Квасний хліб, авокадо, яйце пашот, чилі',        price:189, w:'220 г',  kind:'toast'},
  {cat:'main',      name:'Бургер Brew',        desc:'Яловичина, чеддер, томат, салат, соус',          price:289, w:'320 г',  kind:'burger'},
  {cat:'main',      name:'Цезар з куркою',     desc:'Романо, грінки, пармезан, соус цезар',           price:229, w:'260 г',  kind:'salad'},
  {cat:'main',      name:'Піца Маргарита',     desc:'Томати, моцарела, свіжий базилік',               price:259, w:'450 г',  kind:'pizza'},
  {cat:'dessert',   name:'Чізкейк Нью-Йорк',   desc:'Класичний, з полуничним соусом',                 price:135, w:'130 г',  kind:'cheesecake'}
];
const pic = d => d.img ? `<img src="${d.img}" alt="${d.name}">` : ART.product(d.kind);

/* Hero */
$('heroArt').innerHTML = ['latte','croissant','toast'].map((k,i) => `<div class="${'abc'[i]}">${ART.product(k)}</div>`).join('');

/* Меню */
let tab = 'coffee';
$('tabs').innerHTML = Object.entries(TABS).map(([k,v]) => `<button data-t="${k}" class="${k===tab?'on':''}">${v}</button>`).join('');
function renderMenu(){
  $('dishes').innerHTML = DISHES.filter(d => d.cat === tab).map(d => `
    <article class="dish"><div class="im">${pic(d)}</div>
      <div class="tx"><h3>${d.name}</h3><p>${d.desc}</p><div class="pr"><b>${fmt(d.price)}</b><span>${d.w}</span></div></div>
    </article>`).join('');
}
renderMenu();
$('tabs').addEventListener('click', e => {
  const b = e.target.closest('[data-t]'); if (!b) return;
  tab = b.dataset.t;
  document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('on', x === b));
  renderMenu();
});

/* Бронювання */
const form = $('form'), dateEl = $('date');
const iso = d => d.toISOString().slice(0,10);
const today = new Date(), max = new Date(); max.setDate(max.getDate() + 30);
dateEl.min = iso(today); dateEl.max = iso(max); dateEl.value = iso(today);

let guests = 2;
const setGuests = n => { guests = Math.max(1, Math.min(10, n)); $('guests').textContent = guests; };
$('gm').addEventListener('click', () => setGuests(guests - 1));
$('gp').addEventListener('click', () => setGuests(guests + 1));

const TIMES = ['12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'];
// Імітація зайнятих слотів: стабільна для кожної дати й кількості гостей
function busy(date, time){
  let h = 0; const s = date + time + guests;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 97;
  return h % 4 === 0;
}
function passed(date, time){
  if (date !== iso(new Date())) return false;
  const [hh, mm] = time.split(':').map(Number), n = new Date();
  return hh * 60 + mm <= n.getHours() * 60 + n.getMinutes() + 30;
}
function renderSlots(){
  const checked = (form.querySelector('input[name=time]:checked') || {}).value;
  $('slots').innerHTML = TIMES.map(t => {
    const off = busy(dateEl.value, t) || passed(dateEl.value, t);
    return `<label class="slot ${off ? 'off' : ''}"><input type="radio" name="time" value="${t}" ${off ? 'disabled' : ''} ${t === checked && !off ? 'checked' : ''}><span>${t}</span></label>`;
  }).join('');
}
renderSlots();
dateEl.addEventListener('change', renderSlots);
$('gm').addEventListener('click', renderSlots); $('gp').addEventListener('click', renderSlots);

function setErr(input, msg){
  const f = input.closest('.fld'); f.classList.toggle('bad', !!msg);
  f.querySelector('.err').textContent = msg || '';
  return !msg;
}
const rules = {
  date:  v => v && v >= iso(new Date()) && v <= dateEl.max ? '' : 'Оберіть дату в межах найближчих 30 днів',
  name:  v => v.trim().length >= 2 ? '' : "Вкажіть ім'я",
  phone: v => /^\+?\d[\d\s()-]{8,}$/.test(v.trim()) ? '' : 'Вкажіть коректний номер телефону'
};
['date','name','phone'].forEach(n => {
  const el = form.elements[n];
  el.addEventListener('blur', () => setErr(el, rules[n](el.value)));
  el.addEventListener('input', () => { if (el.closest('.fld').classList.contains('bad')) setErr(el, rules[n](el.value)); });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const okFields = ['date','name','phone'].map(n => setErr(form.elements[n], rules[n](form.elements[n].value)));
  const time = (form.querySelector('input[name=time]:checked') || {}).value;
  $('slotErr').textContent = time ? '' : 'Оберіть вільний час';
  if (okFields.includes(false) || !time) return;
  const btn = $('submit'); btn.disabled = true; btn.textContent = 'Бронюю…';
  setTimeout(() => {
    const d = new Date(dateEl.value + 'T00:00:00');
    const code = 'BC-' + String(Math.floor(1000 + Math.random() * 9000));
    $('summary').innerHTML = `<dt>Код</dt><dd>${code}</dd><dt>Дата</dt><dd>${d.toLocaleDateString('uk-UA', {day:'numeric', month:'long', weekday:'short'})}</dd><dt>Час</dt><dd>${time}</dd><dt>Гостей</dt><dd>${guests}</dd><dt>На ім'я</dt><dd>${form.elements.name.value.trim()}</dd>`;
    form.hidden = true; $('done').hidden = false;
    btn.disabled = false; btn.textContent = 'Забронювати';
  }, 900);
});
$('again').addEventListener('click', () => {
  form.reset(); dateEl.value = iso(new Date()); setGuests(2); renderSlots();
  form.hidden = false; $('done').hidden = true;
});
})();
