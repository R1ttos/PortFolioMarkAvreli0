(function(){
'use strict';
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Theme ---------- */
let saved = null;
try { saved = localStorage.getItem('theme'); } catch(e){}
root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const themeListeners = [];
document.getElementById('theme').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch(e){}
  themeListeners.forEach(fn => fn(next));
});

/* ---------- Mobile menu ---------- */
const burger = document.getElementById('burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));
menu.addEventListener('click', e => { if (e.target.tagName === 'A'){ menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

/* ---------- Three.js: glossy sphere ---------- */
(function(){
  const canvas = document.getElementById('stage');
  if (typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  // Studio-like reflections: a small room with a few soft light panels
  const pmrem = new THREE.PMREMGenerator(renderer);
  let envTex = null;
  function buildEnv(theme){
    const dark = theme === 'dark';
    const s = new THREE.Scene();
    const room = new THREE.Mesh(new THREE.BoxGeometry(20,20,20),
      new THREE.MeshBasicMaterial({color: new THREE.Color().setScalar(dark ? .035 : .55), side:THREE.BackSide}));
    s.add(room);
    const panel = (w,h,x,y,z,i,color) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w,h),
        new THREE.MeshBasicMaterial({color:new THREE.Color(color).multiplyScalar(i), side:THREE.DoubleSide}));
      m.position.set(x,y,z); m.lookAt(0,0,0); s.add(m);
    };
    panel(10,5,0,9,2, dark ? 5 : 7, 0xffffff);          // top softbox
    panel(2.5,12,-9,0,2, dark ? 3 : 4, 0xffffff);       // left strip
    panel(1.5,9,9,1,-1, dark ? 2.5 : 2, 0xc9d1ff);      // cool right strip
    panel(8,2,0,-9,3, dark ? .6 : 1.2, 0xffffff);       // floor bounce
    if (envTex) envTex.dispose();
    envTex = pmrem.fromScene(s, 0.035).texture;
  }
  buildEnv(root.dataset.theme);

  // Sphere with soft, slow surface movement and analytic normals (no seams)
  const R = 1.55;
  const geo = new THREE.SphereGeometry(R, 128, 96);
  const base = geo.attributes.position.array.slice();
  const nrm = geo.attributes.normal;
  const baseN = nrm.array.slice();
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xf2f3f6, metalness: .12, roughness: .08,
    clearcoat: 1, clearcoatRoughness: .04, envMapIntensity: 1.1
  });
  mat.envMap = envTex;
  const sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  function applyTheme(theme){
    buildEnv(theme);
    mat.envMap = envTex;
    mat.color.set(theme === 'dark' ? 0x1b1d22 : 0xf2f3f6);
    mat.envMapIntensity = theme === 'dark' ? 1.25 : 1.05;
    mat.needsUpdate = true;
  }
  applyTheme(root.dataset.theme);
  themeListeners.push(applyTheme);

  const K = .07;
  function deform(t){
    const p = geo.attributes.position.array, n = nrm.array;
    for (let i=0; i<p.length; i+=3){
      const x = base[i], y = base[i+1], z = base[i+2];
      const a = x*1.3 + t*.6, b = y*1.6 - t*.45, c = z*1.1 + t*.35;
      const d = K * (Math.sin(a) + Math.sin(b) + Math.sin(c));
      const bx = baseN[i], by = baseN[i+1], bz = baseN[i+2];
      p[i] = x + bx*d; p[i+1] = y + by*d; p[i+2] = z + bz*d;
      // gradient of d, projected onto the tangent plane
      const gx = K*1.3*Math.cos(a), gy = K*1.6*Math.cos(b), gz = K*1.1*Math.cos(c);
      const gn = gx*bx + gy*by + gz*bz;
      let nx = bx - (gx - gn*bx), ny = by - (gy - gn*by), nz = bz - (gz - gn*bz);
      const l = Math.hypot(nx,ny,nz) || 1;
      n[i] = nx/l; n[i+1] = ny/l; n[i+2] = nz/l;
    }
    geo.attributes.position.needsUpdate = true;
    nrm.needsUpdate = true;
  }

  let mobile = false;
  function resize(){
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w/h; camera.updateProjectionMatrix();
    mobile = w < 800;
    sphere.scale.setScalar(mobile ? .78 : 1);
  }
  new ResizeObserver(resize).observe(canvas); resize();

  const target = {x:0,y:0}, cur = {x:0,y:0};
  addEventListener('pointermove', e => {
    target.x = (e.clientX / innerWidth - .5) * 2;
    target.y = (e.clientY / innerHeight - .5) * 2;
  });

  let visible = true;
  new IntersectionObserver(en => visible = en[0].isIntersecting).observe(document.getElementById('hero'));

  const clock = new THREE.Clock();
  (function loop(){
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = reduce ? 0 : clock.getElapsedTime();
    cur.x += (target.x - cur.x) * .04;
    cur.y += (target.y - cur.y) * .04;
    if (!reduce) deform(t);
    sphere.rotation.y = t*.12 + cur.x*.5;
    sphere.rotation.x = cur.y*.3;
    sphere.position.x = (mobile ? 0 : 2.3) + cur.x*.18;
    sphere.position.y = (mobile ? 1.5 : .35) - cur.y*.12;
    renderer.render(scene, camera);
  })();
})();

/* ---------- Прев'ю проєктів ---------- */
(function(){
  if (typeof ART === 'undefined') return;
  const mk = (items, cls) => `<div class="prev ${cls||''}">${items.map(i => `<div>${ART.product(i[0], i[1], i[2])}${i[3] ? `<span class="tag"><b>${i[3]}</b>${i[4]}</span>` : ''}</div>`).join('')}</div>`;
  const shop = document.querySelector('[data-preview="shop"]');
  if (shop) shop.innerHTML = mk([['hoodie','#3a3d42',null,'Худі Core','1 699 ₴'],['sneakers','#eeeee9','#2f5bd8','Кросівки Runner','2 899 ₴'],['jeans','#3d5a80',null,'Джинси Straight','1 899 ₴']]);
  const cafe = document.querySelector('[data-preview="cafe"]');
  if (cafe) cafe.innerHTML = mk([['latte'],['croissant'],['burger']], 'round');
})();

/* ---------- Лічильники та смуги при появі ---------- */
(function(){
  const blocks = document.querySelectorAll('#results .stats, #results .cases');
  const run = el => {
    el.classList.add('in');
    el.querySelectorAll('[data-count]').forEach(n => {
      const end = +n.dataset.count, pre = n.dataset.prefix || '', suf = n.dataset.suffix || '';
      if (reduce){ n.textContent = pre + end + suf; return; }
      const t0 = performance.now(), dur = 1200;
      (function step(now){
        const k = Math.min((now - t0)/dur, 1), e = 1 - Math.pow(1-k, 3);
        n.textContent = pre + Math.round(end*e) + suf;
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  };
  if (!('IntersectionObserver' in window)){ blocks.forEach(run); return; }
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting){ run(x.target); io.unobserve(x.target); } }), {threshold:.3});
  blocks.forEach(b => io.observe(b));
})();

/* ---------- Form ---------- */
const EMAIL = 'efritemarket@gmail.com', TG = 'MarkAvreli111';
const form = document.getElementById('form'), ok = document.getElementById('ok'), fail = document.getElementById('fail');
const rules = {
  name:    v => v.trim().length >= 2 ? '' : "Вкажіть ім'я, щонайменше 2 символи",
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Вкажіть коректний email, наприклад name@example.com',
  message: v => v.trim().length >= 10 ? '' : 'Опишіть задачу щонайменше у 10 символах'
};
function check(el){
  const err = rules[el.name](el.value), f = el.closest('.field');
  f.classList.toggle('err', !!err);
  f.querySelector('.msg').textContent = err;
  el.setAttribute('aria-invalid', !!err);
  return !err;
}
Object.keys(rules).forEach(n => {
  const el = form.elements[n];
  el.addEventListener('blur', () => check(el));
  el.addEventListener('input', () => { if (el.closest('.field').classList.contains('err')) check(el); });
});

const buildText = d => `Нова заявка з портфоліо\nІм'я: ${d.name}\nEmail: ${d.email}\nПовідомлення: ${d.message}`;
async function copy(text){
  try { await navigator.clipboard.writeText(text); }
  catch(e){ const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch(_){} t.remove(); }
}
/* Заявка надсилається на пошту через сервіс FormSubmit (безкоштовний, без власного сервера).
   Під час першої відправки FormSubmit надішле на пошту лист для активації: натисніть у ньому підтвердження. */
async function sendToEmail(d){
  const r = await fetch('https://formsubmit.co/ajax/' + EMAIL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({name: d.name, email: d.email, message: d.message, _subject: 'Нова заявка з портфоліо', _replyto: d.email, _template: 'table', _captcha: 'false'})
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || String(j.success) === 'false') throw new Error(j.message || 'send failed');
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  ok.classList.remove('show'); fail.classList.remove('show');
  const res = Object.keys(rules).map(n => check(form.elements[n]));
  if (res.includes(false)){ form.querySelector('.err input, .err textarea').focus(); return; }
  const data = {name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), message: form.elements.message.value.trim()};
  const btn = document.getElementById('submitBtn');
  btn.disabled = true; btn.textContent = 'Надсилаю…';
  const text = buildText(data);
  try {
    await sendToEmail(data);
    await copy(text);
    document.getElementById('tgOpen').onclick = () => copy(text);
    form.reset();
    ok.classList.add('show');
  } catch(err) {
    document.getElementById('mailFallback').href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Нова заявка з портфоліо') + '&body=' + encodeURIComponent(text);
    fail.classList.add('show');
  } finally {
    btn.disabled = false; btn.textContent = 'Надіслати';
  }
});
})();
