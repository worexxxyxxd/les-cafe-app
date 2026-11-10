/* ДЕМО онлайн-заказа: корзина → оформление → «заказ принят».
   Заказ никуда не отправляется. В рабочей версии на шаге submit() данные
   уходят на сервер (например, Cloudflare Worker), а оттуда — в Telegram точки. */
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const KEY = "les-demo-cart-v1";
  const PTS = window.POINTS || [];
  const rub = n => n.toLocaleString("ru-RU") + " ₽";
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const ART = window.ART || {};
  const art = (a,o) => (a && ART[a]) ? ART[a](o||{}) : "";

  /* ---------- хранилище ---------- */
  let cart = [];
  try{ cart = JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ cart = []; }
  const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(cart)); }catch(e){} };
  const keyOf = (t,v) => t + "|" + (v||"");
  const count = () => cart.reduce((s,i)=>s+i.qty, 0);
  const total = () => cart.reduce((s,i)=>s+i.qty*i.price, 0);
  const qtyOf = k => (cart.find(i=>i.k===k)||{}).qty || 0;

  function add(t, v, price, a){
    const k = keyOf(t,v), it = cart.find(i=>i.k===k);
    if(it) it.qty++; else cart.push({k, t, v, price, a, qty:1});
    changed(); toast(`${t}${v?` · ${v}`:""} в корзине`);
  }
  function setQty(k, q){
    const it = cart.find(i=>i.k===k); if(!it) return;
    it.qty = Math.max(0, q); if(!it.qty) cart = cart.filter(i=>i!==it);
    changed();
  }
  function changed(){ save(); syncControls(); renderFab(); if(sheet.open && view==="cart") renderCart(); }

  /* ---------- варианты цены «189 / 289» ---------- */
  function variants(el){
    const p = String(el.dataset.price);
    if(!p.includes("/")) return [{v:"", price:+p}];
    const prices = p.split("/").map(s=>+s.trim());
    let labels = (el.dataset.size || el.closest(".mg")?.querySelector("h3 small")?.textContent || "").split("/").map(s=>s.trim()).filter(Boolean);
    if(labels.length !== prices.length) labels = prices.map((_,i)=> i ? "большой" : "обычный");
    const unit = (labels[labels.length-1].match(/[^\d\s,].*$/)||[""])[0];
    labels = labels.map(l => /[^\d\s,]/.test(l) ? l : `${l} ${unit}`.trim());
    return prices.map((price,i)=>({v:labels[i], price}));
  }

  /* ---------- кнопки в меню ---------- */
  const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
  const stepper = (k, q) => `<span class="qty" data-k="${esc(k)}"><button type="button" data-dec aria-label="Убрать одну">−</button><b>${q}</b><button type="button" data-inc aria-label="Добавить ещё">+</button></span>`;

  function decorate(){
    $$("#menuRoot .mi").forEach(mi=>{
      if(mi.querySelector(".mi-add")) return;
      const vs = variants(mi);
      if(mi.dataset.title === "Все соусы") return;   // соусы выбираются чипсами
      const box = document.createElement("div"); box.className = "mi-add";
      box.dataset.title = mi.dataset.title; box.dataset.art = mi.dataset.art || "";
      box.dataset.vs = JSON.stringify(vs);
      mi.querySelector(".mi-p").appendChild(box);
    });
    // соусы: чипсы кликабельны
    $$("#menuRoot .sauce-chips span").forEach(ch=>{
      if(ch.dataset.sauce) return;
      ch.dataset.sauce = 1; ch.setAttribute("role","button"); ch.tabIndex = 0;
      ch.title = "Добавить соус — 59 ₽";
    });
    // хиты на главной
    $$("#hitsTrack .dish").forEach(d=>{
      if(d.querySelector(".mi-add")) return;
      const box = document.createElement("div"); box.className = "mi-add dish-add";
      box.dataset.title = d.dataset.title; box.dataset.art = d.dataset.art || "";
      box.dataset.vs = JSON.stringify([{v:"", price:+d.dataset.price}]);
      d.querySelector(".price-row").appendChild(box);
    });
    syncControls();
  }
  function syncControls(){
    $$(".mi-add").forEach(box=>{
      const vs = JSON.parse(box.dataset.vs), t = box.dataset.title;
      if(vs.length === 1){
        const k = keyOf(t,""), q = qtyOf(k);
        box.innerHTML = q ? stepper(k,q) : `<button type="button" class="add-btn" data-add='${esc(JSON.stringify({t,v:"",p:vs[0].price,a:box.dataset.art}))}' aria-label="Добавить ${esc(t)} в корзину">${PLUS}${box.classList.contains("dish-add")?"<span>В корзину</span>":""}</button>`;
      } else {
        box.innerHTML = vs.map(o=>{ const k = keyOf(t,o.v), q = qtyOf(k);
          return q ? `<span class="var-wrap"><small>${esc(o.v)}</small>${stepper(k,q)}</span>`
                   : `<button type="button" class="add-btn var" data-add='${esc(JSON.stringify({t,v:o.v,p:o.price,a:box.dataset.art}))}'>${PLUS}<span>${esc(o.v)}</span></button>`; }).join("");
      }
    });
    $$(".sauce-chips span").forEach(ch=>ch.classList.toggle("in-cart", qtyOf(keyOf("Соус "+ch.textContent,""))>0));
  }

  document.addEventListener("click", e=>{
    const a = e.target.closest("[data-add]");
    if(a){ const d = JSON.parse(a.dataset.add); add(d.t, d.v, d.p, d.a); return; }
    const s = e.target.closest(".sauce-chips span[data-sauce]");
    if(s){ add("Соус " + s.textContent, "", 59, ""); return; }
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
    if(inc||dec){ const k = (inc||dec).closest(".qty").dataset.k; setQty(k, qtyOf(k) + (inc?1:-1)); }
  });
  document.addEventListener("keydown", e=>{ if((e.key==="Enter"||e.key===" ") && e.target.matches(".sauce-chips span[data-sauce]")){ e.preventDefault(); e.target.click(); } });

  /* ---------- плавающая кнопка корзины ---------- */
  const onMenu = document.body.dataset.page === "menu";
  document.body.insertAdjacentHTML("beforeend", `
    <button type="button" class="cart-fab" aria-label="Открыть корзину">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20.5" r="1.3"/><circle cx="17" cy="20.5" r="1.3"/></svg>
      <span class="cf-sum"></span><i class="cf-n"></i>
    </button>
    <div class="cart-toast" role="status" aria-live="polite"></div>
    <dialog class="cart-sheet" aria-label="Корзина"><div class="cs-inner"></div></dialog>`);
  const fab = $(".cart-fab"), sheet = $(".cart-sheet"), inner = $(".cs-inner");
  function renderFab(){
    const n = count();
    fab.classList.toggle("show", n>0 || onMenu);
    fab.querySelector(".cf-n").textContent = n; fab.querySelector(".cf-n").hidden = !n;
    fab.querySelector(".cf-sum").textContent = n ? rub(total()) : "Корзина";
    fab.classList.remove("bump"); void fab.offsetWidth; if(n) fab.classList.add("bump");
  }
  let tt; const toastEl = $(".cart-toast");
  function toast(msg){ toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(tt); tt = setTimeout(()=>toastEl.classList.remove("show"), 1600); }

  /* ---------- окно корзины ---------- */
  let view = "cart", order = null;
  const DEMO = `<div class="cs-demo"><b>Демо-режим</b> Заказ никуда не отправляется — это показ того, как будет работать онлайн-заказ.</div>`;
  const head = (title, back) => `<div class="cs-head">${back?`<button type="button" class="cs-back" data-go="${back}" aria-label="Назад">←</button>`:""}<h3>${title}</h3><button type="button" class="cs-x" aria-label="Закрыть">✕</button></div>`;

  function renderCart(){
    view = "cart";
    if(!cart.length){
      inner.innerHTML = head("Корзина") + `<div class="cs-empty"><div class="cs-critter">${window.ANIMAL?ANIMAL("hedgehog"):""}</div><p>В корзине пока пусто.<br>Ёжик ждёт вашу шаверму.</p><a class="btn" href="menu.html">Открыть меню</a></div>`;
      return;
    }
    inner.innerHTML = head("Корзина") + DEMO + `<div class="cs-list">${cart.map(i=>`
      <div class="cs-row"><div class="cs-ico">${art(i.a) || `<span class="cs-noico">${/^Соус/.test(i.t)?"🥫":"🍃"}</span>`}</div>
        <div class="cs-name"><b>${esc(i.t)}</b>${i.v?`<small>${esc(i.v)}</small>`:""}<span>${rub(i.price)}</span></div>
        ${stepper(i.k, i.qty)}<div class="cs-sum">${rub(i.price*i.qty)}</div></div>`).join("")}</div>
      <div class="cs-foot"><div class="cs-total"><span>Итого</span><b>${rub(total())}</b></div>
        <button type="button" class="btn cs-go" data-go="checkout">Оформить заказ</button></div>`;
  }

  /* время и слоты по часам точки (время СПб) */
  function slots(p){
    const now = PT.now(), mins = now.getHours()*60 + now.getMinutes(), day = (now.getDay()+6)%7;
    const open = PT.isOpen(p, now), [o,c] = p.hours==="24" ? [0,1440] : p.hours[day];
    const out = []; if(open) out.push(["asap","Как можно скорее · ~20 минут"]);
    let t = Math.ceil((Math.max(mins, o) + 30) / 15) * 15;
    while(out.length < 9 && t <= (p.hours==="24" ? mins + 300 : c - 15)){ out.push([String(t), `К ${PT.fmt(t)}`]); t += 30; }
    if(!out.length) out.push(["next", `Завтра к открытию, ${PT.fmt(p.hours==="24"?0:p.hours[(day+1)%7][0])}`]);
    return out;
  }
  let form = {point: PTS[0] && PTS[0].id, time:"", name:"", phone:"", comment:"", pay:"place", agree:false};
  try{ Object.assign(form, JSON.parse(localStorage.getItem(KEY+"-form"))||{}); form.agree = false; }catch(e){}

  function renderCheckout(){
    view = "checkout";
    const p = PTS.find(x=>x.id===form.point) || PTS[0];
    const sl = slots(p); if(!sl.some(s=>s[0]===form.time)) form.time = sl[0][0];
    inner.innerHTML = head("Оформление", "cart") + DEMO + `
      <form class="cs-form" novalidate>
        <fieldset><legend>Где заберёте</legend><div class="cs-points">${PTS.map(x=>`
          <label class="cs-point${x.id===p.id?" on":""}"><input type="radio" name="point" value="${x.id}"${x.id===p.id?" checked":""}>
            <b>${esc(x.address)}</b><span class="${PT.isOpen(x)?"ok":"no"}">${PT.statusText(x)}</span></label>`).join("")}</div>
          <p class="cs-hint">Самовывоз. Доставку можно подключить на следующем этапе.</p></fieldset>
        <fieldset><legend>Ко времени</legend><select name="time" class="cs-in">${sl.map(s=>`<option value="${s[0]}"${s[0]===form.time?" selected":""}>${s[1]}</option>`).join("")}</select></fieldset>
        <fieldset><legend>Контакты</legend>
          <input class="cs-in" name="name" autocomplete="given-name" placeholder="Имя" value="${esc(form.name)}" required>
          <input class="cs-in" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" value="${esc(form.phone)}" required>
          <textarea class="cs-in" name="comment" rows="2" placeholder="Комментарий: без лука, побольше соуса…">${esc(form.comment)}</textarea></fieldset>
        <fieldset><legend>Оплата</legend>
          <label class="cs-radio"><input type="radio" name="pay" value="place" checked> При получении — картой, наличными или по QR</label>
          <label class="cs-radio off"><input type="radio" name="pay" value="online" disabled> Онлайн картой или СБП <em>этап 2</em></label></fieldset>
        <label class="cs-check"><input type="checkbox" name="agree"> Согласен на обработку персональных данных для оформления заказа</label>
        <p class="cs-err" hidden></p>
        <div class="cs-foot"><div class="cs-total"><span>${count()} шт.</span><b>${rub(total())}</b></div>
          <button type="submit" class="btn cs-go">Отправить заказ</button></div>
      </form>`;
    const f = $(".cs-form", inner);
    f.addEventListener("change", e=>{
      if(e.target.name==="point"){ form.point = e.target.value; keep(f); renderCheckout(); }
    });
    f.phone.addEventListener("input", ()=>{ f.phone.value = maskPhone(f.phone.value); });
    f.addEventListener("submit", e=>{ e.preventDefault(); keep(f); submit(f); });
  }
  function keep(f){ form.name = f.name.value.trim(); form.phone = f.phone.value; form.comment = f.comment.value.trim(); form.time = f.time.value; form.agree = f.agree.checked;
    try{ const {agree, ...rest} = form; localStorage.setItem(KEY+"-form", JSON.stringify(rest)); }catch(e){} }
  function maskPhone(v){ let d = v.replace(/\D/g,""); if(d[0]==="8") d = "7"+d.slice(1); if(d[0]!=="7") d = "7"+d; d = d.slice(0,11);
    const p = [d.slice(1,4), d.slice(4,7), d.slice(7,9), d.slice(9,11)];
    return "+7" + (p[0]?` (${p[0]}`:"") + (p[0].length===3?")":"") + (p[1]?` ${p[1]}`:"") + (p[2]?`-${p[2]}`:"") + (p[3]?`-${p[3]}`:""); }

  function submit(f){
    const err = $(".cs-err", inner), bad = [];
    if(!form.name) bad.push("имя");
    if(form.phone.replace(/\D/g,"").length !== 11) bad.push("телефон полностью");
    if(!form.agree) bad.push("согласие на обработку данных");
    if(bad.length){ err.hidden = false; err.textContent = "Пожалуйста, укажите " + bad.join(", ") + "."; return; }
    const p = PTS.find(x=>x.id===form.point);
    const when = form.time==="asap" ? "как можно скорее (~20 мин)" : form.time==="next" ? "к открытию завтра" : "к " + PT.fmt(+form.time);
    order = { no: "Л-" + String(Date.now()).slice(-4), p, when, items: cart.map(i=>({...i})), sum: total(), name: form.name, phone: form.phone, comment: form.comment };
    // В рабочей версии: fetch("https://<ваш-воркер>/order", {method:"POST", body: JSON.stringify(order)})
    cart = []; changed(); renderDone();
  }

  function renderDone(){
    view = "done"; const o = order;
    inner.innerHTML = head("Заказ принят") + `
      <div class="cs-done">
        <div class="cs-critter big">${window.ANIMAL?ANIMAL("fox"):""}</div>
        <h4>Заказ ${o.no} принят!</h4>
        <p>Ждём вас на <b>${esc(o.p.address)}</b> ${esc(o.when)}.<br>Оплата при получении: <b>${rub(o.sum)}</b></p>
        <div class="tg-demo"><div class="tg-top"><span class="tg-ava">Л</span><div><b>Лес · ${esc(o.p.name)}</b><small>бот заказов</small></div></div>
          <div class="tg-msg">🛒 <b>Новый заказ ${o.no}</b><br>📍 ${esc(o.p.address)}<br>⏰ ${esc(o.when)}<br><br>${o.items.map(i=>`• ${esc(i.t)}${i.v?` (${esc(i.v)})`:""} × ${i.qty} — ${rub(i.price*i.qty)}`).join("<br>")}<br><br>💰 <b>${rub(o.sum)}</b>, оплата при получении<br>👤 ${esc(o.name)}, ${esc(o.phone)}${o.comment?`<br>💬 ${esc(o.comment)}`:""}
            <div class="tg-btns"><span>✅ Принять</span><span>⏳ Задержка</span><span>❌ Отказ</span></div></div>
          <p class="tg-cap">Так заказ увидят сотрудники точки в Telegram в рабочей версии</p></div>
        <button type="button" class="btn ghost cs-close">Вернуться к меню</button>
      </div>`;
  }

  function openSheet(){ if(cart.length) renderCart(); else renderCart(); sheet.showModal ? sheet.showModal() : sheet.setAttribute("open",""); }
  fab.addEventListener("click", openSheet);
  sheet.addEventListener("click", e=>{
    if(e.target === sheet || e.target.closest(".cs-x,.cs-close")){ sheet.close(); return; }
    const g = e.target.closest("[data-go]"); if(!g) return;
    if(g.dataset.go==="checkout") renderCheckout(); else renderCart();
  });

  decorate(); renderFab();
})();
