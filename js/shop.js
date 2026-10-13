"use strict";

const img = (id) => `https://images.unsplash.com/photo-${id}?w=700&h=700&fit=crop&q=75`;
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" text-anchor="middle" fill="#9ca3af" font-size="28" font-family="Arial">Фото недоступне</text></svg>'
);

const SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];
const CLOTH_SIZES = ["S", "M", "L", "XL"];

// Додавайте/редагуйте товари тут
const PRODUCTS = [
  { id: 1,  brand: "Nike",        title: "Free RN Flyknit",          category: "Взуття",     price: 3899, old: 4599, badge: "-15%", image: img("1542291026-7eec264c27ff"), sizes: SHOE_SIZES },
  { id: 2,  brand: "Nike",        title: "LunarEpic Black",          category: "Взуття",     price: 4299, image: img("1491553895911-0055eca6402d"), sizes: SHOE_SIZES },
  { id: 3,  brand: "Nike",        title: "Air Jordan 1 Low",         category: "Взуття",     price: 5499, badge: "Хіт", image: img("1556906781-9a412961c28c"), sizes: SHOE_SIZES },
  { id: 4,  brand: "Nike",        title: "Air Force 1 Shadow",       category: "Взуття",     price: 5199, image: img("1595950653106-6c9ebd614d3a"), sizes: SHOE_SIZES },
  { id: 5,  brand: "Nike",        title: "SB Stefan Janoski",        category: "Взуття",     price: 3699, image: img("1460353581641-37baddab0fa2"), sizes: SHOE_SIZES },
  { id: 6,  brand: "New Balance", title: "247 Olive",                category: "Взуття",     price: 3999, image: img("1539185441755-769473a23570"), sizes: SHOE_SIZES },
  { id: 7,  brand: "Nike",        title: "Air Jordan 1 Bred",        category: "Взуття",     price: 6299, old: 6999, badge: "-10%", image: img("1552346154-21d32810aba3"), sizes: SHOE_SIZES },
  { id: 8,  brand: "Nike",        title: "SB Dunk High",             category: "Взуття",     price: 5799, image: img("1584735175315-9d5df23860e6"), sizes: SHOE_SIZES },
  { id: 9,  brand: "Nike",        title: "Air Max 90 Ultra",         category: "Взуття",     price: 4999, image: img("1515955656352-a1fa3ffcd111"), sizes: SHOE_SIZES },
  { id: 10, brand: "Nike",        title: "SuperRep Go Volt",         category: "Взуття",     price: 3499, badge: "Новинка", image: img("1606107557195-0e29a4b5b4aa"), sizes: SHOE_SIZES },
  { id: 11, brand: "Adidas",      title: "Deerupt Runner",           category: "Взуття",     price: 3299, old: 3999, badge: "-17%", image: img("1562183241-b937e95585b6"), sizes: SHOE_SIZES },
  { id: 12, brand: "Sport Basics", title: "Худі Grey Classic",       category: "Худі",       price: 1899, image: img("1556821840-3a63f95609a7"), sizes: CLOTH_SIZES },
  { id: 13, brand: "Sport Basics", title: "Світшот Black Logo",      category: "Худі",       price: 2099, image: img("1578681994506-b8f463449011"), sizes: CLOTH_SIZES },
  { id: 14, brand: "Sport Basics", title: "Спортивний костюм Sun",   category: "Худі",       price: 2999, badge: "Хіт", image: img("1515886657613-9f3515b0c78f"), sizes: CLOTH_SIZES },
  { id: 15, brand: "Sport Basics", title: "Футболка White Essential", category: "Футболки",  price: 899,  image: img("1521572163474-6864f9cf17ab"), sizes: CLOTH_SIZES },
  { id: 16, brand: "Sport Basics", title: "Топ Peace Black",         category: "Футболки",   price: 799,  image: img("1503342217505-b0a15ec3261c"), sizes: CLOTH_SIZES },
  { id: 17, brand: "Sport Basics", title: "Футболка Awesome",        category: "Футболки",   price: 949,  image: img("1571945153237-4929e783af4a"), sizes: CLOTH_SIZES },
  { id: 18, brand: "Sport Basics", title: "Футболка Black Minimal",  category: "Футболки",   price: 849,  image: img("1583743814966-8936f5b7be1a"), sizes: CLOTH_SIZES },
  { id: 19, brand: "Sport Basics", title: "Футболка Original Beige", category: "Футболки",   price: 999,  image: img("1576566588028-4147f3842f27"), sizes: CLOTH_SIZES },
  { id: 20, brand: "RVCA",        title: "Кепка VA All The Way",     category: "Аксесуари",  price: 1099, image: img("1556306535-0f09a537f0a3"), sizes: ["One size"] },
];

const state = {
  category: "Усі",
  query: "",
  sort: "default",
  selectedSize: {},
  cart: JSON.parse(localStorage.getItem("sportmax_cart") || "[]"),
};

const $ = (s) => document.querySelector(s);
const money = (n) => n.toLocaleString("uk-UA") + " ₴";
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Каталог ---------- */
function renderFilters() {
  const cats = ["Усі", ...new Set(PRODUCTS.map((p) => p.category))];
  $("#filters").innerHTML = cats
    .map((c) => `<button class="chip ${c === state.category ? "active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
    .join("");
}

function getVisible() {
  const q = state.query.trim().toLowerCase();
  let list = PRODUCTS.filter((p) =>
    (state.category === "Усі" || p.category === state.category) &&
    (!q || `${p.brand} ${p.title}`.toLowerCase().includes(q))
  );
  if (state.sort === "asc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "desc") list.sort((a, b) => b.price - a.price);
  if (state.sort === "name") list.sort((a, b) => a.title.localeCompare(b.title, "uk"));
  return list;
}

function renderProducts() {
  const list = getVisible();
  $("#empty").hidden = list.length > 0;
  $("#products").innerHTML = list.map((p) => {
    const sel = state.selectedSize[p.id] || (p.sizes.length === 1 ? p.sizes[0] : null);
    return `
    <article class="card" data-id="${p.id}">
      <div class="card__img">
        ${p.badge ? `<span class="card__badge">${escapeHtml(p.badge)}</span>` : ""}
        <img src="${p.image}" alt="${escapeHtml(p.brand + " " + p.title)}" loading="lazy" referrerpolicy="no-referrer">
      </div>
      <div class="card__body">
        <div class="card__brand">${escapeHtml(p.brand)}</div>
        <h3 class="card__title">${escapeHtml(p.title)}</h3>
        <div class="card__sizes">
          ${p.sizes.map((s) => `<button class="size ${s === sel ? "active" : ""}" data-size="${s}">${s}</button>`).join("")}
        </div>
        <div class="card__foot">
          <div class="price">${money(p.price)}${p.old ? `<s>${money(p.old)}</s>` : ""}</div>
          <button class="btn btn--primary" data-add>У кошик</button>
        </div>
      </div>
    </article>`;
  }).join("");

  document.querySelectorAll(".card__img img, .cart-item img").forEach(bindFallback);
}

function bindFallback(el) {
  el.addEventListener("error", () => { el.src = FALLBACK; }, { once: true });
}

/* ---------- Кошик ---------- */
const saveCart = () => localStorage.setItem("sportmax_cart", JSON.stringify(state.cart));

function addToCart(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  const size = state.selectedSize[id] || (p.sizes.length === 1 ? p.sizes[0] : null);
  if (!size) { toast("Оберіть розмір"); return; }
  const found = state.cart.find((i) => i.id === id && i.size === size);
  if (found) found.qty++;
  else state.cart.push({ id, size, qty: 1 });
  saveCart();
  renderCart();
  toast(`Додано: ${p.brand} ${p.title} (${size})`);
}

function changeQty(id, size, delta) {
  const item = state.cart.find((i) => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter((i) => i !== item);
  saveCart();
  renderCart();
}

function removeItem(id, size) {
  state.cart = state.cart.filter((i) => !(i.id === id && i.size === size));
  saveCart();
  renderCart();
}

function cartTotal() {
  return state.cart.reduce((sum, i) => sum + PRODUCTS.find((p) => p.id === i.id).price * i.qty, 0);
}

function renderCart() {
  state.cart = state.cart.filter((i) => PRODUCTS.some((p) => p.id === i.id));
  $("#cartCount").textContent = state.cart.reduce((n, i) => n + i.qty, 0);
  $("#cartTotal").textContent = money(cartTotal());

  $("#cartItems").innerHTML = state.cart.length
    ? state.cart.map((i) => {
        const p = PRODUCTS.find((x) => x.id === i.id);
        return `
        <div class="cart-item" data-id="${i.id}" data-size="${i.size}">
          <img src="${p.image}" alt="" referrerpolicy="no-referrer">
          <div>
            <div class="cart-item__title">${escapeHtml(p.brand)} ${escapeHtml(p.title)}</div>
            <div class="cart-item__meta">Розмір: ${i.size}</div>
            <div class="qty"><button data-dec>−</button><span>${i.qty}</span><button data-inc>+</button></div>
          </div>
          <div class="cart-item__right">
            <b>${money(p.price * i.qty)}</b>
            <button class="remove" data-remove>Видалити</button>
          </div>
        </div>`;
      }).join("")
    : '<p class="cart__empty">Кошик порожній 🛒</p>';

  document.querySelectorAll(".cart-item img").forEach(bindFallback);
}

function openCart(open) {
  $("#cart").classList.toggle("open", open);
  $("#cart").setAttribute("aria-hidden", String(!open));
  $("#overlay").hidden = !open;
}

/* ---------- Оформлення замовлення ---------- */
function openModal(html) {
  $("#modalContent").innerHTML = html;
  $("#modal").hidden = false;
}
const closeModal = () => { $("#modal").hidden = true; };

function checkout() {
  if (!state.cart.length) { toast("Кошик порожній"); return; }
  openCart(false);
  openModal(`
    <h3>Оформлення замовлення</h3>
    <p style="margin-bottom:14px">До сплати: <b>${money(cartTotal())}</b></p>
    <form class="form" id="orderForm">
      <label>Ім'я<input name="name" required minlength="2" autocomplete="name"></label>
      <label>Телефон<input name="phone" type="tel" required pattern="[+0-9 ()\\-]{9,}" placeholder="+380..." autocomplete="tel"></label>
      <label>Місто та відділення пошти<input name="address" required autocomplete="street-address"></label>
      <label>Коментар<textarea name="comment" rows="2"></textarea></label>
      <button class="btn btn--primary btn--block" type="submit">Підтвердити замовлення</button>
    </form>`);
}

function submitOrder(form) {
  const data = new FormData(form);
  const orderNo = Math.floor(100000 + Math.random() * 900000);
  state.cart = [];
  saveCart();
  renderCart();
  openModal(`
    <div class="success">
      <div class="big">🎉</div>
      <h3>Дякуємо, ${escapeHtml(data.get("name"))}!</h3>
      <p>Замовлення №${orderNo} прийнято. Ми зателефонуємо на ${escapeHtml(data.get("phone"))} для підтвердження.</p>
      <button class="btn btn--primary btn--block" id="okBtn">Чудово</button>
    </div>`);
}

/* ---------- Сповіщення ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Події ---------- */
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("[data-cat]");
  if (!b) return;
  state.category = b.dataset.cat;
  renderFilters();
  renderProducts();
});

$("#search").addEventListener("input", (e) => { state.query = e.target.value; renderProducts(); });
$("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });

$("#products").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = Number(card.dataset.id);
  const sizeBtn = e.target.closest("[data-size]");
  if (sizeBtn) {
    state.selectedSize[id] = sizeBtn.dataset.size;
    card.querySelectorAll(".size").forEach((s) => s.classList.toggle("active", s === sizeBtn));
  } else if (e.target.closest("[data-add]")) {
    addToCart(id);
  }
});

$("#cartItems").addEventListener("click", (e) => {
  const row = e.target.closest(".cart-item");
  if (!row) return;
  const id = Number(row.dataset.id), size = row.dataset.size;
  if (e.target.closest("[data-inc]")) changeQty(id, size, 1);
  else if (e.target.closest("[data-dec]")) changeQty(id, size, -1);
  else if (e.target.closest("[data-remove]")) removeItem(id, size);
});

$("#openCart").addEventListener("click", () => openCart(true));
$("#closeCart").addEventListener("click", () => openCart(false));
$("#overlay").addEventListener("click", () => openCart(false));
$("#clearCart").addEventListener("click", () => { state.cart = []; saveCart(); renderCart(); });
$("#checkoutBtn").addEventListener("click", checkout);
$("#closeModal").addEventListener("click", closeModal);
$("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
$("#modalContent").addEventListener("submit", (e) => {
  if (e.target.id !== "orderForm") return;
  e.preventDefault();
  submitOrder(e.target);
});
$("#modalContent").addEventListener("click", (e) => { if (e.target.id === "okBtn") closeModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModal(); openCart(false); }
});

/* ---------- Старт ---------- */
$("#year").textContent = new Date().getFullYear();
renderFilters();
renderProducts();
renderCart();
