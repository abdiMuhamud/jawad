import './styles.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { INFO, MENU, ITEMS, SIGNATURES, REELS, img, imgLg, fmt } from './data.js';

gsap.registerPlugin(ScrollTrigger);
if (import.meta.env.DEV) { window.gsap = gsap; window.ScrollTrigger = ScrollTrigger; }

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const isMobile = () => matchMedia('(max-width: 900px)').matches;
const waLink = (text) => `https://wa.me/${INFO.whatsapp}?text=${encodeURIComponent(text)}`;
const TAG_LABEL = { sig: 'Signature', veg: 'Veg', hot: 'Spicy', share: 'To share' };
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const catName = (id) => MENU.find((c) => c.id === id)?.name ?? '';

/* ══════════════════════ CART STATE ══════════════════════ */
const CART_KEY = 'aljawad.cart.v1';
const cart = new Map();
try {
  const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  saved.forEach(([id, q]) => ITEMS[id] && q > 0 && cart.set(id, q));
} catch { /* storage unavailable */ }
const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify([...cart])); } catch { /* ignore */ } };
const cartCount = () => [...cart.values()].reduce((a, b) => a + b, 0);
const cartTotal = () => [...cart].reduce((s, [id, q]) => s + ITEMS[id].price * q, 0);

function setQty(id, q, { silent } = {}) {
  const prev = cart.get(id) || 0;
  q = Math.max(0, Math.min(99, q));
  if (q === 0) cart.delete(id); else cart.set(id, q);
  saveCart();
  syncCart();
  if (!silent && q > prev) {
    toast(`Added <b>${esc(ITEMS[id].name)}</b> to your order`);
    const c = $('#navCart'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  }
}
const addOne = (id, n = 1) => setQty(id, (cart.get(id) || 0) + n);

function control(id) {
  const q = cart.get(id) || 0;
  if (!q) return `<button class="plusbtn" data-add="${id}" aria-label="Add ${esc(ITEMS[id].name)}" data-hover>+</button>`;
  return `<div class="stepper" data-id="${id}"><button type="button" data-dec="${id}" aria-label="Less">−</button><output>${q}</output><button type="button" data-inc="${id}" aria-label="More">+</button></div>`;
}

function syncCart() {
  const n = cartCount();
  const total = cartTotal();
  const cc = $('#cartCount');
  cc.textContent = n; cc.classList.toggle('has', n > 0);
  $('#obCount').textContent = n;
  $('#obTotal').textContent = fmt(total);
  $('#orderbar').classList.toggle('is-on', n > 0 && !$('#drawer').classList.contains('is-open'));
  $('#cartTotal').textContent = fmt(total);
  $$('[data-ctl]').forEach((el) => { el.innerHTML = control(el.dataset.ctl); });
  const list = $('#cartList');
  list.innerHTML = [...cart].map(([id, q]) => {
    const it = ITEMS[id];
    return `<li class="citem"><img src="${img(id)}" alt="" loading="lazy" /><div><b>${esc(it.name)}</b><span>${fmt(it.price)} · ${esc(it.ar)}</span></div>
      <div class="stepper"><button type="button" data-dec="${id}" aria-label="Less">−</button><output>${q}</output><button type="button" data-inc="${id}" aria-label="More">+</button></div></li>`;
  }).join('');
  $('#drawer').classList.toggle('is-empty', n === 0);
}

/* ══════════════════════ RENDER ══════════════════════ */
function renderSignatures() {
  const track = $('#sigTrack');
  track.innerHTML = SIGNATURES.map((id, i) => {
    const it = ITEMS[id];
    const flag = id === 'brg-005' ? 'As seen on TikTok' : id.startsWith('bbq') ? 'From the coals' : 'Signature';
    return `<article class="scard">
      <div class="scard__img" data-open="${id}" data-cursor="View">
        <img src="${imgLg(id)}" alt="${esc(it.name)}" loading="lazy" />
        <span class="scard__idx">${String(i + 1).padStart(2, '0')}</span>
        <span class="scard__ar">${esc(it.ar)}</span>
        <span class="scard__flag">${flag}</span>
      </div>
      <div class="scard__body">
        <h3>${esc(it.name)}</h3><span class="scard__price">${fmt(it.price)}</span>
        <p>${esc(it.desc)}</p>
        <button class="add scard__add" data-add="${id}" data-hover>Add to order <i>+</i></button>
      </div>
    </article>`;
  }).join('');
  $('#sigAll').textContent = String(SIGNATURES.length).padStart(2, '0');
}

function renderFire() {
  const cat = MENU.find((c) => c.id === 'mashawi');
  $('#fireList').innerHTML = cat.items.map((it, i) => `
    <div class="frow" data-img="${img(it.id)}" data-open="${it.id}">
      <span class="frow__n">${String(i + 1).padStart(2, '0')}</span>
      <div class="frow__name">${esc(it.name)}${it.tags.includes('share') ? '<span class="frow__tag">For the table</span>' : ''}<span class="frow__ar">${esc(it.ar)}</span><small>${esc(it.desc)}</small></div>
      <span class="frow__price">${fmt(it.price)}</span>
      <button class="plus" data-add="${it.id}" aria-label="Add ${esc(it.name)}" data-hover>+</button>
    </div>`).join('');
}

function renderMenu() {
  $('#menuTabs').innerHTML = MENU.map((c, i) =>
    `<button class="mtab${i === 0 ? ' is-active' : ''}" role="tab" data-tab="${c.id}">${esc(c.name)}<sup>${c.items.length}</sup></button>`).join('');
  const arrow = (d) => `<button class="arrow" type="button" data-row-step="${d}" aria-label="${d < 0 ? 'Previous' : 'Next'} dishes" data-hover><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg></button>`;
  $('#menuBody').innerHTML = MENU.map((c, ci) => `
    <section class="mcat" id="cat-${c.id}" data-cat="${c.id}">
      <header class="mcat__head wrap">
        <span class="mcat__n">${String(ci + 1).padStart(2, '0')}</span>
        <h3 class="mcat__title">${esc(c.name)}<span>${esc(c.ar)}</span></h3>
        <p class="mcat__blurb">${esc(c.blurb)}</p>
        <div class="mcat__nav"><span class="mcat__count">${c.items.length} dishes</span>${arrow(-1)}${arrow(1)}</div>
      </header>
      <div class="mrow">
      <div class="mrow__track" tabindex="0" aria-label="${esc(c.name)} dishes — scroll sideways">
        ${c.items.map((it) => `
        <article class="mcard" data-item="${it.id}" data-search="${esc((it.name + ' ' + it.ar + ' ' + it.desc + ' ' + c.name).toLowerCase())}">
          <div class="mcard__img" data-open="${it.id}" data-cursor="View">
            <img src="${img(it.id)}" alt="${esc(it.name)}" loading="lazy" decoding="async" width="800" height="640" />
            ${it.tags.length ? `<div class="mcard__tags">${it.tags.map((t) => `<span class="tag tag--${t}">${TAG_LABEL[t]}</span>`).join('')}</div>` : ''}
          </div>
          <div class="mcard__body">
            <div class="mcard__top"><h4>${esc(it.name)}</h4><span class="mcard__ar">${esc(it.ar)}</span></div>
            <p>${esc(it.desc)}</p>
            <div class="mcard__foot">
              <span class="mcard__price"><small>GMD</small>${it.price.toLocaleString('en-US')}</span>
              <div data-ctl="${it.id}"></div>
            </div>
          </div>
        </article>`).join('')}
      </div>
      <div class="mrow__progress"><i></i></div>
      </div>
    </section>`).join('');
  $$('.mcard__img img').forEach((im) => {
    const on = () => im.classList.add('is-in');
    if (im.complete && im.naturalWidth) on(); else im.addEventListener('load', on, { once: true });
  });
}

function renderReels() {
  const play = '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>';
  $('#reelsTrack').innerHTML = REELS.map((r) => `
    <button class="reel" data-reel="${r.id}" data-cursor="Play" aria-label="Play video: ${esc(r.title)}">
      ${r.local ? `<video src="${r.local}" poster="/img/reels/${r.id}.webp" muted loop playsinline preload="none"></video>` : `<img src="/img/reels/${r.id}.webp" alt="" loading="lazy" />`}
      <span class="reel__play">${play}</span>
      <span class="reel__meta"><b>${esc(r.title)}</b><span>${r.views} views · TikTok</span></span>
    </button>`).join('');
}

function renderDays() {
  const wrap = $('#days');
  const days = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    days.push(d);
  }
  const wk = (d, i) => (i === 0 ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' }));
  wrap.innerHTML = days.map((d, i) =>
    `<button type="button" class="day${i === 0 ? ' is-on' : ''}" data-date="${ymd(d)}"><small>${wk(d, i)}</small><b>${d.getDate()}</b></button>`).join('')
    + `<div class="day day--pick" role="button" tabindex="0" title="Pick another date"><small>More</small><b>＋</b><input type="date" id="pickDate" min="${ymd(days[0])}" tabindex="-1" aria-label="Pick another date" style="position:absolute;left:50%;bottom:0;opacity:0;pointer-events:none;width:1px;height:1px" /></div>`;
}

/* ══════════════════════ UI: toast / drawer / modal / lightbox ══════════════════════ */
let toastT;
function toast(html) {
  const t = $('#toast');
  t.innerHTML = `<i>✓</i><span>${html}</span>`;
  t.classList.add('is-on');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('is-on'), 2200);
}

let lenis;
const lock = (on) => { if (!lenis) return; on ? lenis.stop() : lenis.start(); };

function openDrawer() {
  const d = $('#drawer');
  d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false');
  $('#orderbar').classList.remove('is-on');
  lock(true);
}
function closeDrawer() {
  const d = $('#drawer');
  d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true');
  lock(false); syncCart();
}

let modalId = null; let modalQty = 1;
function openModal(id) {
  const it = ITEMS[id]; if (!it) return;
  modalId = id; modalQty = 1;
  $('#dishImg').src = imgLg(id); $('#dishImg').alt = it.name;
  $('#dishCat').textContent = catName(it.cat);
  $('#dishName').textContent = it.name;
  $('#dishAr').textContent = it.ar;
  $('#dishDesc').textContent = it.desc;
  $('#dishTags').innerHTML = it.tags.map((t) => `<span class="tag tag--${t}">${TAG_LABEL[t]}</span>`).join('');
  $('#dishPrice').textContent = fmt(it.price);
  $('#dishQty output').textContent = 1;
  const m = $('#dish'); m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false');
  lock(true);
  setTimeout(() => $('#dishAdd').focus({ preventScroll: true }), 50);
}
function closeModal() { const m = $('#dish'); m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); lock(false); }

function openReel(id) {
  const r = REELS.find((x) => x.id === id); if (!r) return;
  const f = $('#lbFrame');
  f.innerHTML = r.local
    ? `<video src="${r.local}" controls autoplay playsinline poster="/img/reels/${id}.webp"></video>`
    : `<iframe src="https://www.tiktok.com/player/v1/${id}?autoplay=1&loop=1&music_info=1&description=1&rel=0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen title="${esc(r.title)}"></iframe>`;
  $('#lbExt').href = `https://www.tiktok.com/@aljawad.gm/video/${id}`;
  const lb = $('#lightbox'); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
  lock(true);
  const hv = $('#heroVideo'); if (hv && !hv.muted) toggleSound(false);
}
function closeReel() { const lb = $('#lightbox'); lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); setTimeout(() => { $('#lbFrame').innerHTML = ''; }, 400); lock(false); }

function toggleSound(force) {
  const v = $('#heroVideo'); const b = $('#soundToggle');
  const on = typeof force === 'boolean' ? force : v.muted;
  v.muted = !on; if (on) v.play().catch(() => {});
  b.setAttribute('aria-pressed', String(on));
  $('.arch__sound-label').textContent = on ? 'Sound on' : 'Sound off';
}

/* ══════════════════════ EVENTS ══════════════════════ */
function bindEvents() {
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-add],[data-inc],[data-dec],[data-open],[data-reel],[data-close-drawer],[data-close-modal],[data-close-lb],[data-tab],[data-open-cart-menu],[data-jump]');
    if (!t) return;
    if (t.dataset.add) { e.stopPropagation(); addOne(t.dataset.add); return; }
    if (t.dataset.inc) { addOne(t.dataset.inc); return; }
    if (t.dataset.dec) { setQty(t.dataset.dec, (cart.get(t.dataset.dec) || 0) - 1); return; }
    if (t.dataset.open) { if (e.target.closest('button')) return; openModal(t.dataset.open); return; }
    if (t.dataset.reel) { openReel(t.dataset.reel); return; }
    if (t.hasAttribute('data-close-drawer')) { closeDrawer(); if (t.getAttribute('href') === '#menu') { e.preventDefault(); scrollToEl('#menu'); } return; }
    if (t.hasAttribute('data-close-modal')) { closeModal(); return; }
    if (t.hasAttribute('data-close-lb')) { closeReel(); return; }
    if (t.dataset.tab) { scrollToEl(`#cat-${t.dataset.tab}`, -150); return; }
    if (t.hasAttribute('data-open-cart-menu')) {
      if (cartCount()) openDrawer();
      else { scrollToEl('#menu'); setTimeout(() => toast('Tap <b>+</b> on any dish, then send your order on WhatsApp'), 900); }
      return;
    }
    if (t.dataset.jump) { scrollToEl(`#cat-${t.dataset.jump}`, -150); }
  });

  $('#navCart').addEventListener('click', openDrawer);
  $('#orderbar').addEventListener('click', openDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if ($('#lightbox').classList.contains('is-open')) closeReel();
    else if ($('#dish').classList.contains('is-open')) closeModal();
    else if ($('#drawer').classList.contains('is-open')) closeDrawer();
    else if ($('#overlay').classList.contains('is-open')) toggleOverlay(false);
  });

  // dish modal qty + add
  $('#dishQty').addEventListener('click', (e) => {
    const b = e.target.closest('[data-step]'); if (!b) return;
    modalQty = Math.max(1, Math.min(20, modalQty + Number(b.dataset.step)));
    $('#dishQty output').textContent = modalQty;
  });
  $('#dishAdd').addEventListener('click', () => { if (modalId) { addOne(modalId, modalQty); closeModal(); } });

  // sound
  $('#soundToggle').addEventListener('click', () => toggleSound());

  // burger
  $('#burger').addEventListener('click', () => toggleOverlay());

  // anchors
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2 || !$(id)) return;
    e.preventDefault();
    toggleOverlay(false);
    scrollToEl(id);
  }));

  // search
  const search = $('#menuSearch');
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let any = false;
    $$('.mcat').forEach((sec) => {
      let n = 0;
      $$('.mcard', sec).forEach((c) => { const hit = !q || c.dataset.search.includes(q); c.hidden = !hit; if (hit) n++; });
      sec.hidden = n === 0; if (n) any = true;
      const tr = $('.mrow__track', sec); if (tr) { gsap.killTweensOf(tr); tr.scrollLeft = 0; }
      sec._update?.();
    });
    $('#menuEmpty').hidden = any;
    ScrollTrigger.refresh();
  });
  search.addEventListener('focus', () => { if (!isMobile()) return; scrollToEl('#menuBar', 0); });

  // order type
  $('#orderType').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#orderType button').forEach((x) => x.classList.toggle('is-on', x === b));
    $('#addrField').hidden = b.dataset.v !== 'Delivery';
  });

  $('#sendOrder').addEventListener('click', sendOrder);

  // reservation
  $('#days').addEventListener('click', (e) => {
    const pick = e.target.closest('.day--pick');
    if (pick) { const inp = $('#pickDate'); try { inp.showPicker(); } catch { inp.focus(); inp.click(); } return; }
    const d = e.target.closest('.day'); if (!d) return;
    $$('#days .day').forEach((x) => x.classList.toggle('is-on', x === d));
  });
  $('#days').addEventListener('change', (e) => {
    if (e.target.id !== 'pickDate' || !e.target.value) return;
    const pick = $('.day--pick');
    const d = new Date(e.target.value + 'T12:00:00');
    pick.dataset.date = e.target.value;
    pick.querySelector('small').textContent = d.toLocaleDateString('en-GB', { month: 'short' });
    pick.querySelector('b').textContent = d.getDate();
    $$('#days .day').forEach((x) => x.classList.toggle('is-on', x === pick));
  });
  $('#guests').addEventListener('click', (e) => {
    const b = e.target.closest('[data-step]'); if (!b) return;
    const o = $('#guests output');
    const v = Math.max(1, Math.min(40, Number(o.textContent) + Number(b.dataset.step)));
    o.textContent = v;
  });
  $('#occasion').addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('#occasion .chip').forEach((x) => x.classList.toggle('is-on', x === b));
  });
  $('#reserveForm').addEventListener('submit', (e) => { e.preventDefault(); sendReservation(); });

  $('#cutsLink').href = waLink('Hello Al Jawad! I’d like to ask about today’s fresh cuts from the butchery.');
  if (INFO.hours) $('#hours').textContent = INFO.hours;
}

function validPhone(v) { return v.replace(/\D/g, '').length >= 7; }
function mark(input, bad) { input.classList.toggle('is-bad', bad); return bad; }

function sendReservation() {
  const f = $('#reserveForm');
  const name = f.elements.name; const phone = f.elements.phone; const time = f.elements.time;
  const bad = [mark(name, name.value.trim().length < 2), mark(phone, !validPhone(phone.value)), mark(time, !time.value)];
  const day = $('#days .day.is-on');
  if (bad.some(Boolean) || !day?.dataset.date) { $('#reserveErr').textContent = 'Please add your name, a valid phone number, a date and a time.'; return; }
  $('#reserveErr').textContent = '';
  const date = new Date(day.dataset.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const msg = [
    '*Table reservation — Al Jawad*',
    '',
    `Name: ${name.value.trim()}`,
    `Phone: ${phone.value.trim()}`,
    `Date: ${date}`,
    `Time: ${time.value}`,
    `Guests: ${$('#guests output').textContent}`,
    `Occasion: ${$('#occasion .chip.is-on')?.textContent ?? 'Dinner'}`,
    f.elements.notes.value.trim() ? `Notes: ${f.elements.notes.value.trim()}` : null,
    '',
    '_Sent from the Al Jawad website_',
  ].filter((l) => l !== null).join('\n');
  window.open(waLink(msg), '_blank', 'noopener');
  toast('Opening WhatsApp — our team will confirm your table');
}

function sendOrder() {
  if (!cartCount()) return;
  const f = $('#checkout');
  const type = $('#orderType .is-on').dataset.v;
  const name = f.elements.name; const phone = f.elements.phone; const addr = f.elements.address;
  const bad = [mark(name, name.value.trim().length < 2), mark(phone, !validPhone(phone.value)), mark(addr, type === 'Delivery' && addr.value.trim().length < 4)];
  if (bad.some(Boolean)) {
    $('#orderErr').textContent = type === 'Delivery' ? 'Please add your name, phone and delivery address.' : 'Please add your name and phone number.';
    f.querySelector('.is-bad')?.focus();
    return;
  }
  $('#orderErr').textContent = '';
  const lines = [...cart].map(([id, q]) => `${q} × ${ITEMS[id].name} — ${fmt(ITEMS[id].price * q)}`);
  const msg = [
    '*New order — Al Jawad*',
    '──────────',
    ...lines,
    '──────────',
    `*Subtotal: ${fmt(cartTotal())}*`,
    '',
    `Order type: ${type}`,
    `Name: ${name.value.trim()}`,
    `Phone: ${phone.value.trim()}`,
    type === 'Delivery' ? `Address: ${addr.value.trim()}` : null,
    `When: ${f.elements.when.value}`,
    f.elements.notes.value.trim() ? `Notes: ${f.elements.notes.value.trim()}` : null,
    '',
    '_Sent from the Al Jawad website_',
  ].filter((l) => l !== null).join('\n');
  window.open(waLink(msg), '_blank', 'noopener');
  toast('Opening WhatsApp with your order');
}

/* ══════════════════════ NAV / OVERLAY / SCROLL ══════════════════════ */
function toggleOverlay(force) {
  const o = $('#overlay'); const b = $('#burger');
  const on = typeof force === 'boolean' ? force : !o.classList.contains('is-open');
  o.classList.toggle('is-open', on); o.setAttribute('aria-hidden', String(!on));
  b.setAttribute('aria-expanded', String(on));
  if (on) $('#nav').classList.remove('is-hidden');
  lock(on);
}

function scrollToEl(sel, offset) {
  const el = typeof sel === 'string' ? $(sel) : sel; if (!el) return;
  const off = offset ?? (sel === '#top' ? 0 : -20);
  if (lenis) { lenis.start(); lenis.scrollTo(el, { offset: off, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) }); }
  else window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + off, behavior: 'smooth' });
}

function navBehaviour() {
  const nav = $('#nav');
  let last = 0;
  const onScroll = (y) => {
    nav.classList.toggle('is-solid', y > 40);
    const down = y > last && y > 400;
    const overlayOpen = $('#overlay').classList.contains('is-open');
    nav.classList.toggle('is-hidden', down && !overlayOpen);
    document.body.classList.toggle('nav-shown', !down);
    last = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    $('#progress').style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });
  onScroll(scrollY);

  // active links
  ['story', 'signatures', 'mashawi', 'menu', 'reels', 'visit'].forEach((id) => {
    ScrollTrigger.create({
      trigger: `#${id}`, start: 'top 50%', end: 'bottom 50%',
      onToggle: (s) => $$(`.nav__links a[href="#${id}"]`).forEach((a) => a.classList.toggle('is-active', s.isActive)),
    });
  });

  // menu tab scrollspy
  $$('.mcat').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 40%', end: 'bottom 40%',
      onToggle: (s) => {
        if (!s.isActive) return;
        $$('.mtab').forEach((t) => t.classList.toggle('is-active', t.dataset.tab === sec.dataset.cat));
        const tab = $(`.mtab[data-tab="${sec.dataset.cat}"]`); const bar = $('#menuTabs');
        if (tab) bar.scrollTo({ left: tab.offsetLeft - bar.clientWidth / 2 + tab.clientWidth / 2, behavior: 'smooth' });
      },
    });
  });
}

/* ══════════════════════ EFFECTS ══════════════════════ */
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.className = 'wi'; i.textContent = part;
          w.appendChild(i); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el);
  return $$('.wi', el);
}

function embers(canvas, { density = 1, warm = 1 } = {}) {
  if (!canvas || reduce) return;
  const ctx = canvas.getContext('2d');
  const sprite = document.createElement('canvas'); sprite.width = sprite.height = 64;
  const sc = sprite.getContext('2d');
  const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,220,160,1)'); g.addColorStop(.2, 'rgba(255,140,60,.9)'); g.addColorStop(.5, 'rgba(200,40,10,.35)'); g.addColorStop(1, 'rgba(146,3,5,0)');
  sc.fillStyle = g; sc.fillRect(0, 0, 64, 64);
  let w = 0, h = 0, dpr = 1, parts = [], raf = 0, running = false;
  const N = () => Math.round(Math.min(90, (w * h) / 16000) * density);
  const spawn = (p = {}, initial) => Object.assign(p, {
    x: Math.random() * w, y: initial ? Math.random() * h : h + 20,
    vx: (Math.random() - .5) * .35, vy: -(.35 + Math.random() * 1.1) * warm,
    s: 2 + Math.random() * 7, life: 0, max: 300 + Math.random() * 400, ph: Math.random() * 6.28,
  });
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: N() }, () => spawn({}, true));
  };
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      p.life++; p.ph += .05;
      p.x += p.vx + Math.sin(p.ph) * .3; p.y += p.vy;
      const t = p.life / p.max;
      const a = Math.max(0, Math.sin(Math.PI * Math.min(1, t))) * (.55 + .45 * Math.sin(p.ph * 2.3));
      ctx.globalAlpha = a;
      const s = p.s * (1 - t * .6);
      ctx.drawImage(sprite, p.x - s, p.y - s, s * 2, s * 2);
      if (p.life > p.max || p.y < -20) spawn(p);
    }
    raf = requestAnimationFrame(tick);
  };
  resize();
  addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); if (running) tick(); });
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (running) tick();
  }).observe(canvas);
}

function cursor() {
  if (!fine) return;
  const c = $('.cursor'); const dot = $('.cursor__dot'); const ring = $('.cursor__ring'); const label = $('.cursor__label');
  const dx = gsap.quickTo(dot, 'x', { duration: .1 }), dy = gsap.quickTo(dot, 'y', { duration: .1 });
  const rx = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });
  addEventListener('pointermove', (e) => { c.classList.remove('is-hidden'); dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
  document.addEventListener('pointerover', (e) => {
    const lab = e.target.closest('[data-cursor]');
    const hov = e.target.closest('a,button,[data-hover],input,textarea,select,label');
    c.classList.toggle('is-label', !!lab);
    label.textContent = lab ? lab.dataset.cursor : '';
    c.classList.toggle('is-hover', !lab && !!hov);
  });
  document.addEventListener('pointerleave', () => c.classList.add('is-hidden'));
  document.addEventListener('pointerenter', () => c.classList.remove('is-hidden'));
}

function magnetic() {
  if (!fine || reduce) return;
  $$('.magnetic').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * .25); yTo((e.clientY - r.top - r.height / 2) * .35);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

function marquee() {
  const track = $('#marquee');
  track.innerHTML += track.innerHTML; // seamless loop
  let x = 0, half = 0;
  const kids = track.children; const n = kids.length / 2;
  const measure = () => { half = kids[n].offsetLeft - kids[0].offsetLeft; };
  measure(); addEventListener('resize', measure);
  let vel = 0;
  if (lenis) lenis.on('scroll', (l) => { vel = l.velocity; });
  gsap.ticker.add((t, dt) => {
    if (reduce) return;
    const speed = .06 * dt + Math.min(Math.abs(vel) * .5, 14);
    x -= speed * (vel < -0.5 ? -1 : 1);
    if (x <= -half) x += half; if (x > 0) x -= half;
    track.style.transform = `translate3d(${x}px,0,0) skewX(${gsap.utils.clamp(-8, 8, -vel * .25)}deg)`;
    vel *= .92;
  });
}

function follower() {
  if (!fine) return;
  const f = $('#follower'); const im = $('img', f);
  const xTo = gsap.quickTo(f, 'x', { duration: .6, ease: 'power3' }), yTo = gsap.quickTo(f, 'y', { duration: .6, ease: 'power3' });
  const rTo = gsap.quickTo(f, 'rotation', { duration: .8, ease: 'power3' });
  let lastX = 0;
  addEventListener('pointermove', (e) => { xTo(e.clientX + 40); yTo(e.clientY); rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * .6)); lastX = e.clientX; });
  $$('.frow').forEach((row) => {
    row.addEventListener('pointerenter', () => { im.src = row.dataset.img; gsap.to(f, { opacity: 1, scale: 1, duration: .5, ease: 'power3' }); });
    row.addEventListener('pointerleave', () => gsap.to(f, { opacity: 0, scale: .6, duration: .4, ease: 'power3' }));
  });
}

// Eased horizontal glide (GSAP-driven, snap disabled while moving).
function glideTo(track, left) {
  const max = track.scrollWidth - track.clientWidth;
  track.classList.add('is-gliding');
  gsap.to(track, { scrollLeft: gsap.utils.clamp(0, max, left), duration: 1.15, ease: 'expo.out', overwrite: true, onComplete: () => track.classList.remove('is-gliding') });
}

// Mouse drag with momentum for horizontal tracks (touch & trackpads stay native).
function dragScroll(el) {
  if (!fine) return;
  let down = false, moved = false, sx = 0, sl = 0, lx = 0, lt = 0, v = 0, raf = 0;
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true; moved = false; gsap.ticker.remove(raf); gsap.killTweensOf(el);
    sx = lx = e.clientX; sl = el.scrollLeft; lt = performance.now(); v = 0;
  });
  addEventListener('pointermove', (e) => {
    if (!down) return;
    const d = e.clientX - sx;
    if (!moved && Math.abs(d) > 6) { moved = true; el.classList.add('is-drag'); }
    if (!moved) return;
    el.scrollLeft = sl - d;
    const now = performance.now();
    v = ((e.clientX - lx) / Math.max(1, now - lt)) * 16; lx = e.clientX; lt = now;
  });
  addEventListener('pointerup', () => {
    if (!down) return; down = false;
    if (!moved) return;
    raf = () => {
      v *= .95; el.scrollLeft -= v;
      if (Math.abs(v) <= .35) { gsap.ticker.remove(raf); el.classList.remove('is-drag'); }
    };
    gsap.ticker.add(raf);
  });
  el.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  el.addEventListener('dragstart', (e) => e.preventDefault());
  // hover preview for local reel
  $$('.reel video', el).forEach((v) => {
    const r = v.closest('.reel');
    r.addEventListener('pointerenter', () => { v.preload = 'auto'; v.play().catch(() => {}); });
    r.addEventListener('pointerleave', () => v.pause());
  });
}

// Horizontal menu rows: arrows, progress line, edge state, momentum drag.
function menuRows() {
  $$('.mcat').forEach((sec) => {
    const track = $('.mrow__track', sec);
    const bar = $('.mrow__progress i', sec);
    const row = $('.mrow', sec);
    const [prev, next] = $$('.arrow', sec);
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 1;
      const vis = Math.min(1, track.clientWidth / track.scrollWidth);
      bar.style.transform = `translateX(${p * (1 / vis - 1) * 100}%) scaleX(1)`;
      bar.style.width = `${vis * 100}%`;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft > max - 4;
      row.classList.toggle('at-end', track.scrollLeft > max - 4);
      row.classList.toggle('at-start', track.scrollLeft < 4);
    };
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    sec.addEventListener('click', (e) => {
      const b = e.target.closest('[data-row-step]'); if (!b) return;
      const card = $('.mcard:not([hidden])', track);
      const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300;
      const n = Math.max(1, Math.floor((track.clientWidth * .85) / step));
      glideTo(track, track.scrollLeft + Number(b.dataset.rowStep) * step * n);
    });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); glideTo(track, track.scrollLeft + (e.key === 'ArrowRight' ? 1 : -1) * 320); }
    });
    dragScroll(track);
    update();
    sec._update = update;
  });
}

/* ══════════════════════ SCROLL ANIMATIONS ══════════════════════ */
function scrollAnimations() {
  // headings
  $$('[data-split]').forEach((el) => {
    const words = splitWords(el);
    if (reduce) return;
    gsap.from(words, { yPercent: 115, rotate: 4, duration: 1.2, ease: 'expo.out', stagger: .035, scrollTrigger: { trigger: el, start: 'top 86%' } });
  });
  if (reduce) return;

  $$('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 44, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  $$('[data-reveal-img]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } });
    const im = $('img', el); if (im) gsap.from(im, { scale: 1.35, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  $$('[data-parallax]').forEach((el) => {
    const v = Number(el.dataset.parallax);
    gsap.fromTo(el, { yPercent: -v }, { yPercent: v, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // pillars stagger
  gsap.from('.pillar', { y: 80, autoAlpha: 0, duration: 1.3, ease: 'expo.out', stagger: .1, clearProps: 'transform', scrollTrigger: { trigger: '.pillars__row', start: 'top 85%' } });

  // fire rows
  gsap.from('.frow', { x: 60, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: .06, clearProps: 'transform', scrollTrigger: { trigger: '#fireList', start: 'top 80%' } });

  // reels
  gsap.from('.reel', { y: 100, autoAlpha: 0, rotate: 3, duration: 1.3, ease: 'expo.out', stagger: .07, clearProps: 'transform', scrollTrigger: { trigger: '#reelsTrack', start: 'top 85%' } });

  // menu rows — cards sweep in from the right, then the row drifts with the page scroll
  $$('.mrow').forEach((row) => {
    const track = $('.mrow__track', row);
    gsap.from($$('.mcard', row), { x: 160, autoAlpha: 0, duration: 1.4, ease: 'expo.out', stagger: .07, clearProps: 'transform', scrollTrigger: { trigger: row, start: 'top 88%' } });
    if (!isMobile()) gsap.fromTo(track, { x: 70 }, { x: -70, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
  });

  // twin words
  gsap.from('.twin__word', { yPercent: 40, autoAlpha: 0, duration: 1.4, ease: 'expo.out', stagger: .15, scrollTrigger: { trigger: '.twins', start: 'top 80%' } });

  // hero exit parallax
  gsap.to('.hero__copy', { yPercent: -18, autoAlpha: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__visual', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__ar', { xPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // signatures horizontal pin
  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const track = $('#sigTrack');
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    const n = SIGNATURES.length;
    const tw = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '#signatures', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (s) => {
          $('#sigBar').style.transform = `scaleX(${Math.max(1 / n, s.progress)})`;
          $('#sigNow').textContent = String(Math.min(n, 1 + Math.floor(s.progress * n * .999))).padStart(2, '0');
        },
      },
    });
    $$('.scard').forEach((card) => {
      gsap.from($('.scard__img img', card), { scale: 1.3, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } });
    });
    return () => gsap.set(track, { clearProps: 'transform' });
  });
}

/* ══════════════════════ LOADER + INTRO ══════════════════════ */
function preload(urls) {
  return urls.map((u) => new Promise((res) => {
    const i = new Image(); i.onload = i.onerror = res; i.src = u;
  }));
}

function setupVideos() {
  const mob = isMobile();
  const bg = $('.hero__bg-video'); const arch = $('#heroVideo');
  const want = mob ? bg : arch;
  const other = mob ? arch : bg;
  if (!want.src && want.dataset.src) want.src = want.dataset.src;
  want.play?.().catch(() => {});
  other.pause?.();
}

function intro() {
  const loader = $('#loader');
  const count = { v: 0 };
  const tasks = [...preload(['/brand/logo.png', '/video/grill-poster.webp', '/img/s/coals.webp']), document.fonts?.ready ?? Promise.resolve()];
  let done = 0;
  const target = { v: 0 };
  tasks.forEach((p) => p.then(() => { done++; target.v = done / tasks.length; }));
  const all = Promise.race([Promise.all(tasks), new Promise((r) => setTimeout(r, 4500))]);

  const heroIn = () => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero__bg-img, .hero__bg-video', { scale: 1.25, duration: 2.6 }, 0)
      .from('.hero__title .line > span', { yPercent: 110, rotate: 3, duration: 1.6, stagger: .12 }, .1)
      .from('.hero__eyebrow', { y: 20, autoAlpha: 0, duration: 1 }, .3)
      .from('.hero__lede, .hero__ctas', { y: 30, autoAlpha: 0, duration: 1.2, stagger: .1 }, .55)
      .fromTo('#heroArch', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 14px 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 14px 14px)', duration: 1.8, ease: 'expo.inOut' }, 0)
      .from('.badge', { scale: 0, rotate: -90, duration: 1.4 }, .9)
      .from('.hero__ar', { autoAlpha: 0, x: 80, duration: 2.2 }, .2)
      .from('.nav', { yPercent: -100, duration: 1.2, clearProps: 'transform' }, .4)
      .from('.hero__stats > div, .scrollcue', { y: 20, autoAlpha: 0, duration: 1, stagger: .08 }, .8);
    $$('[data-count]').forEach((b) => {
      const o = { v: 0 };
      tl.to(o, { v: Number(b.dataset.count), duration: 2, ease: 'power2.out', onUpdate: () => { b.textContent = Math.round(o.v); } }, .9);
    });
    return tl;
  };

  if (reduce) {
    loader.remove(); document.body.classList.remove('is-loading');
    $$('[data-count]').forEach((b) => { b.textContent = b.dataset.count; });
    return;
  }

  const tl = gsap.timeline();
  tl.to('.loader__logo', { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power3.inOut' })
    .to('.loader__ar', { autoAlpha: 1, y: 0, duration: .8 }, '-=.6');
  const counter = gsap.to(count, {
    v: 1, duration: 1.8, ease: 'power1.inOut',
    onUpdate: () => {
      const v = Math.min(count.v, Math.max(target.v, count.v * .9));
      $('#loaderCount').textContent = String(Math.round(v * 100)).padStart(2, '0');
      $('#loaderBar').style.transform = `scaleX(${v})`;
    },
  });

  Promise.all([all, new Promise((r) => counter.eventCallback('onComplete', r))]).then(() => {
    $('#loaderCount').textContent = '100'; $('#loaderBar').style.transform = 'scaleX(1)';
    const out = gsap.timeline({ onComplete: () => { loader.remove(); ScrollTrigger.refresh(); } });
    out.to('.loader__inner', { scale: .92, autoAlpha: 0, duration: .8, ease: 'power3.in' }, .15)
      .to('.loader__foot, .loader__bar', { autoAlpha: 0, duration: .4 }, .15)
      .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3, ease: 'expo.inOut' }, .55)
      .add(() => { document.body.classList.remove('is-loading'); lenis?.start(); heroIn(); }, .85);
  });
}

/* ══════════════════════ BOOT ══════════════════════ */
function boot() {
  renderSignatures();
  renderFire();
  renderMenu();
  renderReels();
  renderDays();
  syncCart();
  setupVideos();

  if (!reduce) {
    lenis = new Lenis({ lerp: .09, wheelMultiplier: 1, smoothWheel: true, allowNestedScroll: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    if (import.meta.env.DEV) window.lenis = lenis;
  }

  bindEvents();
  menuRows();
  scrollAnimations(); // creates the pinned section first, so later triggers measure correctly
  navBehaviour();
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  marquee();
  cursor();
  magnetic();
  follower();
  dragScroll($('#reelsTrack'));
  embers($('#embers'), { density: 1 });
  embers($('#embers2'), { density: .8, warm: 1.2 });
  $('#year').textContent = new Date().getFullYear();

  let rw = innerWidth;
  addEventListener('resize', () => { if (Math.abs(innerWidth - rw) > 80) { rw = innerWidth; setupVideos(); } });
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  intro();
}

try { boot(); } catch (err) { console.error(err); }
setTimeout(() => { const l = document.getElementById('loader'); if (l) { l.remove(); document.body.classList.remove('is-loading'); lenis?.start(); } }, 9000);
