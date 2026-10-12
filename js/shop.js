(function(){
'use strict';
const CUR = '₴', FREE_FROM = 2500;
const fmt = n => n.toLocaleString('uk-UA') + ' ' + CUR;

const CATS = {all:'Усе', tees:'Футболки', hoodies:'Худі', pants:'Штани', outer:'Верхній одяг', shoes:'Взуття', acc:'Аксесуари'};
const SIZES = {clothes:['XS','S','M','L','XL'], shoes:['40','41','42','43','44'], one:['One size']};
const PRODUCTS = [
  {id:1, name:'Adicolor Classics Trefoil Tee', cat:'tees', price:1199, label:'Білий', sizes:'clothes', pop:9, images:[
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9fd2849e03ce446a993dad4900b81016_9366/Adicolor_Classics_Trefoil_Tee_White_H06637_01_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9fd2849e03ce446a993dad4900b81016_9366/Adicolor_Classics_Trefoil_Tee_White_H06637_02_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9fd2849e03ce446a993dad4900b81016_9366/Adicolor_Classics_Trefoil_Tee_White_H06637_03_laydown.jpg']},
  {id:2, name:'Trefoil Essentials T-Shirt', cat:'tees', price:1199, label:'Чорний', sizes:'clothes', pop:8, images:[
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9f5302c7faee4750ba310b4d73341805_9366/TREFOIL_ESSENTIALS_T-SHIRT_Black_KS8890_01_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9f5302c7faee4750ba310b4d73341805_9366/TREFOIL_ESSENTIALS_T-SHIRT_Black_KS8890_02_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9f5302c7faee4750ba310b4d73341805_9366/TREFOIL_ESSENTIALS_T-SHIRT_Black_KS8890_03_laydown.jpg']},
  {id:3, name:'Adicolor Classics 3-Stripes Hoodie', cat:'hoodies', price:2799, old:3199, label:'Чорний', sizes:'clothes', pop:10, images:[
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b2e6da08a96b4c078ac3af0201041cd8_9366/Adicolor_Classics_3-Stripes_Hoodie_Black_IA6346_01_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b2e6da08a96b4c078ac3af0201041cd8_9366/Adicolor_Classics_3-Stripes_Hoodie_Black_IA6346_02_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b2e6da08a96b4c078ac3af0201041cd8_9366/Adicolor_Classics_3-Stripes_Hoodie_Black_IA6346_03_laydown.jpg']},
  {id:4, name:'Firebird Track Pants', cat:'pants', price:2599, label:'Чорний', sizes:'clothes', pop:7, images:[
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1651f914a4f0430490ed636fb21d1cf6_9366/Firebird_Track_Pants_Black_KD8315_01_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1651f914a4f0430490ed636fb21d1cf6_9366/Firebird_Track_Pants_Black_KD8315_02_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1651f914a4f0430490ed636fb21d1cf6_9366/Firebird_Track_Pants_Black_KD8315_03_laydown.jpg']},
  {id:6, name:'Firebird Track Top', cat:'outer', price:2999, label:'Чорний', sizes:'clothes', pop:6, images:[
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7527fd27f027418a9c05c30c57ffc064_9366/Firebird_Track_Top_Black_KD3842_01_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7527fd27f027418a9c05c30c57ffc064_9366/Firebird_Track_Top_Black_KD3842_02_laydown.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7527fd27f027418a9c05c30c57ffc064_9366/Firebird_Track_Top_Black_KD3842_03_laydown.jpg']},
  {id:7, name:'Samba OG Shoes', cat:'shoes', price:4499, label:'Білий', sizes:'shoes', pop:9, images:[
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f88fdc6701a845be8fa1b2d0656b4ab0_9366/SAMBA_OG_SHOES_White_KJ7435_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f88fdc6701a845be8fa1b2d0656b4ab0_9366/SAMBA_OG_SHOES_White_KJ7435_02_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f88fdc6701a845be8fa1b2d0656b4ab0_9366/SAMBA_OG_SHOES_White_KJ7435_03_standard.jpg']},
  {id:8, name:'Trefoil Outline Baseball Cap', cat:'acc', price:1099, label:'Чорний', sizes:'one', pop:5, images:[
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c1e45f74e97e46db91e07825c948c799_9366/Polyurethane_Trefoil_Outline_Baseball_Cap_Black_IY4059_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c1e45f74e97e46db91e07825c948c799_9366/Polyurethane_Trefoil_Outline_Baseball_Cap_Black_IY4059_02_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c1e45f74e97e46db91e07825c948c799_9366/Polyurethane_Trefoil_Outline_Baseball_Cap_Black_IY4059_03_standard.jpg']}
];
const $ = id => document.getElementById(id);
const pic = (p, index = 0) => `<img src="${p.images[index]}" alt="${p.name}">`;

/* Банер */
$('bannerArt').innerHTML = [3,7,6].map(id => { const p = PRODUCTS.find(x => x.id === id); return `<div>${pic(p)}</div>`; }).join('');

/* Стан */
const state = {cat:'all', sort:'pop', q:'', size:{}, productId:null, image:{}};
let cart = [];
try { cart = JSON.parse(localStorage.getItem('northline_cart') || '[]'); } catch(e){}
const save = () => { try { localStorage.setItem('northline_cart', JSON.stringify(cart)); } catch(e){} };

/* Каталог */
$('cats').innerHTML = Object.entries(CATS).map(([k,v]) => `<button data-cat="${k}" class="${k==='all'?'on':''}">${v}</button>`).join('');
function defaultSize(p){ const s = SIZES[p.sizes]; return s[Math.floor(s.length/2)]; }
function renderGrid(){
  let list = PRODUCTS.filter(p => (state.cat === 'all' || p.cat === state.cat) && p.name.toLowerCase().includes(state.q));
  if (state.sort === 'asc') list.sort((a,b) => a.price - b.price);
  else if (state.sort === 'desc') list.sort((a,b) => b.price - a.price);
  else list.sort((a,b) => b.pop - a.pop);
  $('empty').hidden = list.length > 0;
  $('grid').innerHTML = list.map(p => {
    const sel = state.size[p.id] || (state.size[p.id] = defaultSize(p));
    const sale = p.old ? `<span class="badge">-${Math.round((1 - p.price/p.old)*100)}%</span>` : '';
    return `<article class="card" data-id="${p.id}">
      <button class="product-view" data-view aria-label="Переглянути ${p.name}">
        <div class="pic">${sale}${pic(p)}</div>
      </button>
      <div class="meta"><h3>${p.name}</h3><span class="col">${p.label}</span>
        <span class="price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ''}</span></div>
      <div class="sizes">${SIZES[p.sizes].map(s => `<button data-size="${s}" class="${s===sel?'on':''}">${s}</button>`).join('')}</div>
      <button class="add" data-add>Додати в кошик</button>
    </article>`;
  }).join('');
}
renderGrid();

$('cats').addEventListener('click', e => {
  const b = e.target.closest('[data-cat]'); if (!b) return;
  state.cat = b.dataset.cat;
  document.querySelectorAll('#cats button').forEach(x => x.classList.toggle('on', x === b));
  renderGrid();
});
$('sort').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
$('q').addEventListener('input', e => { state.q = e.target.value.trim().toLowerCase(); renderGrid(); });
function addToCart(id){
  const size = state.size[id];
  const ex = cart.find(i => i.id === id && i.size === size);
  ex ? ex.qty++ : cart.push({id, size, qty:1});
  save();
  renderCart();
  toast('Додано в кошик');
}
$('grid').addEventListener('click', e => {
  const card = e.target.closest('.card'); if (!card) return;
  const id = +card.dataset.id;
  const sz = e.target.closest('[data-size]');
  if (sz){ state.size[id] = sz.dataset.size; card.querySelectorAll('[data-size]').forEach(b => b.classList.toggle('on', b === sz)); return; }
  if (e.target.closest('[data-view]')) openProduct(id);
  if (e.target.closest('[data-add]')) addToCart(id);
});

/* Перегляд товару */
const productModal = $('productModal');
function renderProduct(){
  const p = PRODUCTS.find(x => x.id === state.productId);
  if (!p) return;
  const activeImage = state.image[p.id] || 0;
  const selectedSize = state.size[p.id] || (state.size[p.id] = defaultSize(p));
  $('productMainImage').src = p.images[activeImage];
  $('productMainImage').alt = p.name;
  $('productLabel').textContent = p.label;
  $('productTitle').textContent = p.name;
  $('productPrice').textContent = fmt(p.price);
  $('productThumbs').innerHTML = p.images.map((src, index) =>
    `<button data-image="${index}" class="${index === activeImage ? 'on' : ''}" aria-label="Фото ${index + 1} товару"><img src="${src}" alt=""></button>`
  ).join('');
  $('productSizes').innerHTML = SIZES[p.sizes].map(size =>
    `<button data-product-size="${size}" class="${size === selectedSize ? 'on' : ''}">${size}</button>`
  ).join('');
}
function openProduct(id){
  state.productId = id;
  renderProduct();
  productModal.classList.add('on');
  productModal.setAttribute('aria-hidden', 'false');
  $('closeProduct').focus();
}
function closeProduct(){
  productModal.classList.remove('on');
  productModal.setAttribute('aria-hidden', 'true');
  state.productId = null;
}
$('closeProduct').addEventListener('click', closeProduct);
productModal.addEventListener('click', e => {
  if (e.target === productModal) closeProduct();
  const imageButton = e.target.closest('[data-image]');
  if (imageButton){
    state.image[state.productId] = +imageButton.dataset.image;
    renderProduct();
  }
  const sizeButton = e.target.closest('[data-product-size]');
  if (sizeButton){
    state.size[state.productId] = sizeButton.dataset.productSize;
    renderProduct();
  }
});
$('addFromProduct').addEventListener('click', () => {
  addToCart(state.productId);
  closeProduct();
});

/* Кошик */
const drawer = $('drawer'), overlay = $('overlay');
function openCart(o){ drawer.classList.toggle('on', o); overlay.classList.toggle('on', o); drawer.setAttribute('aria-hidden', !o); }
$('openCart').addEventListener('click', () => openCart(true));
$('closeCart').addEventListener('click', () => openCart(false));
overlay.addEventListener('click', () => openCart(false));
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (productModal.classList.contains('on')) closeProduct();
  else openCart(false);
});

function renderCart(){
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const total = cart.reduce((s,i) => s + i.qty * PRODUCTS.find(p => p.id === i.id).price, 0);
  $('cartCount').textContent = count;
  $('total').textContent = fmt(total);
  const left = FREE_FROM - total;
  $('shipTxt').textContent = total === 0 ? `Безкоштовна доставка від ${fmt(FREE_FROM)}`
    : left > 0 ? `До безкоштовної доставки залишилось ${fmt(left)}` : 'Доставка безкоштовна';
  $('shipBar').style.width = Math.min(100, total / FREE_FROM * 100) + '%';
  $('items').innerHTML = cart.length ? cart.map((i, idx) => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return `<li class="line"><div class="th">${pic(p)}</div><div>
      <h4>${p.name}</h4><small>${p.label}, розмір ${i.size}</small>
      <div class="row"><span><span class="qty"><button data-q="-1" data-i="${idx}" aria-label="Менше">−</button><span>${i.qty}</span><button data-q="1" data-i="${idx}" aria-label="Більше">+</button></span><button class="rm" data-rm="${idx}">Видалити</button></span><b>${fmt(p.price * i.qty)}</b></div>
    </div></li>`;
  }).join('') : '<li class="none">Кошик порожній</li>';
}
$('items').addEventListener('click', e => {
  const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
  if (q){ const it = cart[+q.dataset.i]; it.qty += +q.dataset.q; if (it.qty < 1) cart.splice(+q.dataset.i, 1); }
  if (r) cart.splice(+r.dataset.rm, 1);
  if (q || r){ save(); renderCart(); }
});
$('checkout').addEventListener('click', () => {
  toast(cart.length ? 'Демо-версія: оформлення замовлення тут вимкнене' : 'Додайте товар у кошик');
});
renderCart();

let tt;
function toast(msg){ const t = $('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200); }
})();
