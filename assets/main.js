(function(){
  const C = window.CAFE;
  const page = document.body.dataset.page;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const ALL = PT.all();

  const ICON = {
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18M5 11a7 7 0 0 1 14 0M2 15h20M12 4V2"/><path d="M6 19h12"/></svg>',
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    route:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H17a3.5 3.5 0 0 0 0-7H7a3.5 3.5 0 0 1 0-7h8.5"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.5 7.1.7-5.3 4.8 1.5 7-6.2-3.6L5.8 21l1.5-7L2 9.2l7.1-.7z"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  window.ICON = ICON;

  const LOGO = `<img class="logo-img" src="assets/img/logo.png" alt="Лес — уличная еда с русской душой" width="1118" height="396">`;

  const links = [
    ["index.html","Главная","home","01"],
    ["menu.html","Меню","menu","02"],
    ["contacts.html","Адреса","contacts","03"],
    ["franchise.html","Франшиза","franchise","04"],
    ["about.html","О нас","about","05"]
  ];
  const cur = k => k===page ? ' aria-current="page"' : '';

  /* ---------- header / drawer / bottom bar / footer ---------- */
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="curtain in" aria-hidden="true"><img src="assets/img/logo-mark.png" alt=""></div>
    <header class="header" id="header"><div class="wrap">
      <a class="logo" href="index.html" aria-label="Лес — на главную">${LOGO}</a>
      <nav class="nav" aria-label="Основное меню">${links.map(l=>`<a href="${l[0]}"${cur(l[2])}>${l[1]}</a>`).join("")}</nav>
      <div class="header-cta">
        <span class="status" data-status><i></i><span></span></span>
        <button class="btn" type="button" data-points="call">${ICON.phone}Позвонить</button>
        <button class="burger" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div></header>
    <div class="drawer" aria-hidden="true">
      ${links.map(l=>`<a class="big" href="${l[0]}"${cur(l[2])}><em>${l[3]}</em>${l[1]}</a>`).join("")}
      <div class="drawer-foot">
        <span class="status" data-status><i></i><span></span></span>
        <button type="button" class="drawer-call" data-points="call">${ICON.phone} Позвонить в ближайший Лес</button>
      </div>
      <div class="drawer-critter">${ANIMAL("fox")}</div>
    </div>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer">
      <div class="wrap">
      <div class="footer-grid">
        <div><a class="logo logo-lg" href="index.html">${LOGO}</a>
          <p style="color:var(--muted);max-width:330px;margin-top:18px">Шаверма с мясом на углях, сказочные бургеры и супы. Пять точек в Петербурге, три из них работают круглосуточно.</p>
          <div class="social"><a href="${C.tg}" target="_blank" rel="noopener">Telegram ${C.tgName}</a><a href="${C.vk}" target="_blank" rel="noopener">ВКонтакте</a></div></div>
        <div><h4>Страницы</h4><ul>${links.map(l=>`<li><a href="${l[0]}">${l[1]}</a></li>`).join("")}</ul></div>
        <div class="footer-points"><h4>Адреса</h4><ul>${ALL.map(p=>`<li><a href="${p.franchise?'franchise.html':'contacts.html#'+p.id}">${p.address}</a><span>${PT.hoursText(p)} · <a href="tel:${p.tel}">${p.phone}</a></span></li>`).join("")}</ul></div>
      </div>
      <div class="footer-big" aria-hidden="true">Лес · Лес · Лес</div>
      <div class="copy"><span>© ${new Date().getFullYear()} Сеть кафе «Лес» · ${C.slogan}</span><span>Меню и цены могут отличаться на разных точках — уточняйте на кассе</span></div>
    </div></footer>
    <nav class="bottom-bar" aria-label="Быстрые действия">
      <a href="${page==='menu'?'index.html':'menu.html'}">${page==='menu'?ICON.home+'Главная':ICON.menu+'Меню'}</a>
      <button type="button" data-points="route">${ICON.pin}Адреса</button>
      <button type="button" class="main" data-points="call">${ICON.phone}Позвонить</button>
    </nav>
    <dialog class="sheet" id="pointsSheet" aria-labelledby="sheetTitle">
      <div class="sheet-head"><div><span class="eyebrow">5 точек в Петербурге</span><h3 id="sheetTitle">Выберите свой Лес</h3></div>
        <button type="button" class="sheet-x" aria-label="Закрыть">${ICON.close}</button></div>
      <div class="sheet-list">${ALL.map(p=>`
        <div class="sheet-item" data-pid="${p.id}">
          <div class="si-main"><b>${p.address}</b><span class="si-status" data-pstatus="${p.id}"></span>${p.franchise?'<span class="si-tag">франшиза</span>':''}</div>
          <div class="si-act"><a class="btn sm" href="tel:${p.tel}">${ICON.phone}<span>${p.phone}</span></a><a class="btn sm ghost" href="${PT.route(p)}" target="_blank" rel="noopener" aria-label="Маршрут до ${p.address}">${ICON.route}</a></div>
        </div>`).join("")}</div>
      <div class="sheet-critter" aria-hidden="true">${ANIMAL("squirrel")}</div>
    </dialog>`);

  /* ---------- лесные жители и веточки по data-атрибутам ---------- */
  $$("[data-animal]").forEach(el=>{ el.innerHTML = ANIMAL(el.dataset.animal); });
  $$("[data-branch]").forEach(el=>{ el.innerHTML = BRANCH(); });

  /* ---------- curtain transitions ---------- */
  const curtain = $(".curtain");
  setTimeout(()=>curtain.classList.remove("in"), 700);
  document.addEventListener("click", e=>{
    const a = e.target.closest("a");
    if(!a || a.target==="_blank" || e.metaKey || e.ctrlKey) return;
    const href = a.getAttribute("href");
    if(!href || !/\.html(#.*)?$/.test(href) || href.startsWith("#")) return;
    if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    curtain.classList.remove("in"); curtain.classList.add("out");
    setTimeout(()=>location.href = href, 480);
  });
  window.addEventListener("pageshow", ev=>{ if(ev.persisted){ curtain.classList.remove("out"); } });

  /* ---------- burger ---------- */
  const burger = $(".burger"), drawer = $(".drawer");
  function setDrawer(open){
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    drawer.setAttribute("aria-hidden", !open);
    document.documentElement.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", ()=>setDrawer(!document.body.classList.contains("menu-open")));

  /* ---------- окно выбора точки (звонок / маршрут) ---------- */
  const sheet = $("#pointsSheet");
  document.addEventListener("click", e=>{
    const b = e.target.closest("[data-points]"); if(!b) return;
    setDrawer(false);
    sheet.dataset.mode = b.dataset.points;
    $("#sheetTitle").textContent = b.dataset.points==="route" ? "Куда идём?" : "Куда звоним?";
    if(sheet.showModal) sheet.showModal(); else sheet.setAttribute("open","");
  });
  $(".sheet-x").addEventListener("click", ()=>sheet.close());
  sheet.addEventListener("click", e=>{ if(e.target===sheet) sheet.close(); });

  /* ---------- header solid on scroll ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-solid", scrollY > 30);
  onScroll(); addEventListener("scroll", onScroll, {passive:true});

  /* ---------- статус: сколько точек открыто прямо сейчас (время СПб) ---------- */
  function updateStatus(){
    const open = ALL.filter(p=>PT.isOpen(p)).length;
    $$("[data-status]").forEach(el=>{ el.classList.toggle("open", open>0);
      el.querySelector("span").textContent = open===ALL.length ? `Открыты все ${open} точек` : `Сейчас открыто: ${open} из ${ALL.length}`; });
    $$("[data-pstatus]").forEach(el=>{ const p = ALL.find(x=>x.id===el.dataset.pstatus); const on = PT.isOpen(p);
      el.textContent = PT.statusText(p); el.classList.toggle("on", on); });
    const day = (PT.now().getDay()+6)%7;
    $$(".hours tr").forEach((tr,i)=>tr.classList.toggle("today", i===day));
  }

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);
      if(en.target.dataset.count) countUp(en.target);
      $$(".fill", en.target).forEach(f=>f.style.width = f.dataset.w + "%");
    }});
  }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
  function observeAll(){ $$(".reveal:not(.in), [data-count]:not(.in), .bars:not(.in)").forEach(el=>io.observe(el)); }

  function countUp(el){
    const to = parseFloat(el.dataset.count.replace(",", ".")), dec = (el.dataset.count.split(/[.,]/)[1]||"").length;
    const t0 = performance.now(), dur = 1600;
    (function tick(t){ const p = Math.min(1,(t-t0)/dur), e = 1-Math.pow(1-p,4);
      el.textContent = (to*e).toFixed(dec).replace(".", ",") + (el.dataset.suffix||"");
      if(p<1) requestAnimationFrame(tick); })(t0);
  }

  /* ---------- 3D tilt ---------- */
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  function bindTilt(){
    if(!fine) return;
    $$("[data-tilt]").forEach(el=>{
      if(el._tilt) return; el._tilt = 1;
      const max = parseFloat(el.dataset.tilt) || 10;
      el.addEventListener("pointermove", e=>{
        const r = el.getBoundingClientRect(), x = (e.clientX-r.left)/r.width, y = (e.clientY-r.top)/r.height;
        el.classList.add("tilting");
        el.style.setProperty("--ry", ((x-.5)*max*2).toFixed(2)+"deg");
        el.style.setProperty("--rx", ((.5-y)*max*2).toFixed(2)+"deg");
        el.style.setProperty("--mx", (x*100)+"%"); el.style.setProperty("--my", (y*100)+"%");
      });
      el.addEventListener("pointerleave", ()=>{ el.classList.remove("tilting"); el.style.setProperty("--rx","0deg"); el.style.setProperty("--ry","0deg"); });
    });
  }

  /* ---------- carousel dots (mobile) ---------- */
  function bindDots(){
    $$("[data-dots]").forEach(dots=>{
      const track = document.getElementById(dots.dataset.dots); if(!track || !track.children.length) return;
      const n = track.children.length; dots.innerHTML = Array.from({length:n},()=>"<i></i>").join("");
      const upd = ()=>{ const w = track.children[0].getBoundingClientRect().width + 14;
        const i = Math.round(track.scrollLeft / w); $$("i",dots).forEach((d,k)=>d.classList.toggle("on",k===Math.min(i,n-1))); };
      track.addEventListener("scroll", upd, {passive:true}); upd();
    });
  }

  /* ---------- sticky story cards: scale back as next one arrives ---------- */
  const steps = $$(".step");
  if(steps.length){
    const upd = ()=>{
      steps.forEach((s,i)=>{
        const next = steps[i+1]; if(!next){ s.style.transform=""; return; }
        const a = s.getBoundingClientRect(), b = next.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
        s.style.transform = `perspective(1200px) rotateX(${p*8}deg) scale(${1-p*.06})`;
        s.style.filter = `brightness(${1-p*.35})`;
      });
    };
    addEventListener("scroll", ()=>requestAnimationFrame(upd), {passive:true}); upd();
  }

  /* ---------- dish card markup helper ---------- */
  window.dishCard = (d, cls="") => `
    <article class="dish ${cls} reveal" data-tilt="${cls?6:10}" data-title="${d.name}" data-price="${d.price}" data-art="${d.art}">
      ${d.hit?'<span class="hit-sticker">хит</span>':''}
      <div class="art">${ART[d.art](d.o||{})}</div>
      <div class="meta">
        <span class="tag">${d.tag}</span>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="price-row"><span class="price">${d.price} ₽</span><span class="weight">${d.w}</span></div>
      </div>
    </article>`;

  /* ---------- меню: «лист» в стиле печатного меню ---------- */
  const price = p => typeof p==="number" ? p.toLocaleString("ru-RU")+" ₽" : p.replace(" / "," <i>/</i> ")+" ₽";
  function itemRow(it){
    const [name, desc, p, art, hit, o, size] = it;
    return `<div class="mi${art?'':' no-ico'}" data-name="${(name+' '+desc).toLowerCase()}" data-title="${name}" data-price="${p}" data-size="${size||''}" data-art="${art||''}">
      ${art?`<div class="mi-ico">${ART[art](o||{})}</div>`:''}
      <div class="mi-txt"><h4>${name}${hit?'<span class="hit">хит</span>':''}${size?`<small>${size}</small>`:''}</h4>${desc?`<p>${desc}</p>`:''}</div>
      <div class="mi-p"><span>${price(p)}</span></div></div>`;
  }
  function renderMenu(root, data, chips, search, empty){
    if(!root) return;
    if(chips) chips.innerHTML = `<button class="chip-btn active" data-cat="all">Всё меню</button>` +
      data.map(c=>`<button class="chip-btn" data-cat="${c.id}">${c.title}</button>`).join("");
    root.innerHTML = data.map(c=>`
      <section class="menu-cat${c.compact?' compact':''} reveal" id="cat-${c.id}" data-cat="${c.id}">
        <div class="mc-head">
          <h2 class="plate">${c.title}</h2>${c.badge?`<span class="new-badge">${c.badge}</span>`:''}
          <div class="mc-critter" aria-hidden="true">${ANIMAL(c.animal)}</div>
        </div>
        <div class="mc-groups">${c.groups.map(g=>`
          <div class="mg">
            <h3>${g.title}${g.hint?`<small>${g.hint}</small>`:''}</h3>
            <div class="mg-list">${g.items.map(itemRow).join("")}</div>
            ${c.sauces && g===c.groups[0]?`<div class="sauce-chips">${c.sauces.map(s=>`<span>${s}</span>`).join("")}</div>`:''}
          </div>`).join("")}</div>
        ${c.note?`<div class="mc-note"><b>${c.note[0]}</b><span>${c.note[1]}</span></div>`:''}
      </section>`).join("");

    if(chips){
      chips.addEventListener("click", e=>{
        const b = e.target.closest(".chip-btn"); if(!b) return;
        $$(".chip-btn", chips).forEach(x=>x.classList.toggle("active", x===b));
        const cat = b.dataset.cat;
        (cat==="all" ? root : document.getElementById("cat-"+cat)).scrollIntoView({behavior:"smooth"});
      });
      const catIO = new IntersectionObserver(es=>{
        es.forEach(en=>{ if(en.isIntersecting){ const id = en.target.dataset.cat;
          $$(".chip-btn", chips).forEach(x=>{ const on = x.dataset.cat===id; x.classList.toggle("active", on);
            if(on) chips.scrollTo({left: x.offsetLeft - chips.clientWidth/2 + x.clientWidth/2, behavior:"smooth"}); });
        }});
      }, {rootMargin:"-45% 0px -50% 0px"});
      $$(".menu-cat", root).forEach(s=>catIO.observe(s));
    }
    if(search){
      search.addEventListener("input", ()=>{
        const q = search.value.trim().toLowerCase(); let any = 0;
        $$(".menu-cat", root).forEach(sec=>{
          let n = 0;
          $$(".mg", sec).forEach(g=>{ let k = 0;
            $$(".mi", g).forEach(it=>{ const ok = !q || it.dataset.name.includes(q); it.style.display = ok?"":"none"; if(ok) k++; });
            g.style.display = k ? "" : "none"; n += k; });
          sec.style.display = n ? "" : "none"; if(n) sec.classList.add("in"); any += n;
        });
        if(empty) empty.style.display = any ? "none" : "block";
      });
    }
  }

  /* ---------- главная: хиты ---------- */
  function renderHits(){
    const root = $("#hitsTrack"); if(!root) return;
    const hits = [
      {art:"shawarma",tag:"Классика Леса",name:"Шаверма «Золотой стандарт»",desc:"Курица на углях, тончайший лаваш, свежие огурцы и помидоры, фирменный соус. С неё начинают все.",price:319,w:"шаверма",hit:1},
      {art:"shawarma",o:{acc:"#ff3a1c",acc2:"#ffb02c"},tag:"С огоньком",name:"Огнезмей",desc:"Шрирача и халапеньо — для тех, кто любит погорячее.",price:429,w:"шаверма"},
      {art:"burger",o:{fire:true},tag:"Трёхголовый",name:"Горыныч бургер",desc:"Говяжья котлета, три соуса и шрирача.",price:499,w:"бургер"},
      {art:"plate",o:{meat:"#7a3414"},tag:"На тарелке",name:"Богатырская",desc:"Шаверма на тарелке с картошкой — для большого голода.",price:569,w:"тарелочка"},
      {art:"soup",o:{c:"#a8202a"},tag:"Новинка",name:"Борщ",desc:"Супы теперь и в Лесу: борщ, солянка, уха и ещё четыре.",price:249,w:"суп"}
    ];
    root.innerHTML = dishCard(hits[0],"feature") + hits.slice(1).map(h=>dishCard(h)).join("");
  }

  /* ---------- карточки точек ---------- */
  function pointCard(p, opts={}){
    return `<article class="point reveal" id="${opts.anchor?p.id:''}" data-pid="${p.id}">
      <div class="pt-top">
        <span class="pt-status" data-pstatus="${p.id}"></span>
        ${p.award?'<span class="pt-award">Хорошее место 2026</span>':''}
      </div>
      <h3>${p.address}</h3>
      <p class="pt-district">${p.district}</p>
      <ul class="pt-meta">
        <li><b>${PT.hoursText(p)}</b></li>
        <li><a href="tel:${p.tel}">${p.phone}</a></li>
        <li class="pt-rate">${ICON.star}<b>${p.rating}</b> · ${p.votes} оценок</li>
      </ul>
      ${opts.near?`<p class="pt-near">${p.near}</p>`:''}
      <div class="pt-act">
        ${p.franchise?`<a class="btn sm" href="franchise.html">Страница точки ${ICON.arrow}</a>`:`<a class="btn sm" href="${PT.route(p)}" target="_blank" rel="noopener">${ICON.route}Маршрут</a>`}
        ${opts.map?`<button type="button" class="btn sm ghost" data-show="${p.id}">На карте</button>`:`<a class="btn sm ghost" href="tel:${p.tel}">${ICON.phone}Позвонить</a>`}
      </div>
    </article>`;
  }
  function mapAll(){ const pts = ALL.map((p,i)=>`${p.lon},${p.lat},pm2${p.franchise?'rd':'gn'}l${i+1}`).join("~");
    return `https://yandex.ru/map-widget/v1/?ll=30.26%2C59.875&z=10&pt=${pts}`; }
  function renderPoints(){
    const home = $("#pointsGrid");
    if(home) home.innerHTML = ALL.map(p=>pointCard(p)).join("");
    const list = $("#pointsList");
    if(list){
      list.innerHTML = ALL.map(p=>pointCard(p,{anchor:1,near:1,map:1})).join("");
      const frame = $("#mapFrame"); frame.src = mapAll();
      list.addEventListener("click", e=>{
        const b = e.target.closest("[data-show]"); if(!b) return;
        const p = ALL.find(x=>x.id===b.dataset.show);
        frame.src = `https://yandex.ru/map-widget/v1/?ll=${p.lon}%2C${p.lat}&z=16&pt=${p.lon},${p.lat},pm2${p.franchise?'rd':'gn'}l`;
        $$(".point", list).forEach(x=>x.classList.toggle("active", x===b.closest(".point")));
        if(innerWidth < 1080) $(".map-card").scrollIntoView({behavior:"smooth", block:"center"});
      });
      $("#mapAll")?.addEventListener("click", ()=>{ frame.src = mapAll(); $$(".point", list).forEach(x=>x.classList.remove("active")); });
    }
  }

  /* ---------- страница франшизы ---------- */
  function renderFranchise(){
    if(page!=="franchise") return;
    const F = FRANCHISE;
    $$("[data-f]").forEach(el=>{ const k = el.dataset.f;
      if(k==="phone"){ el.textContent = F.phone; el.href = "tel:"+F.tel; }
      else if(k==="route") el.href = PT.route(F);
      else if(k==="org") el.href = PT.org(F);
      else if(k==="hours") el.innerHTML = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"].map((d,i)=>`<tr><td>${d}</td><td>${PT.dayText(F,i)}</td></tr>`).join("");
      else el.textContent = F[k]; });
    const fm = $("#fMap"); if(fm) fm.src = `https://yandex.ru/map-widget/v1/?ll=${F.lon}%2C${F.lat}&z=16&pt=${F.lon},${F.lat},pm2rdl`;
  }

  renderHits(); renderPoints(); renderFranchise();
  renderMenu($("#menuRoot"), window.MENU, $("#chips"), $("#search"), $("#empty"));
  renderMenu($("#fMenuRoot"), window.MENU_FRANCHISE, $("#fChips"), null, null);
  updateStatus(); setInterval(updateStatus, 30000);
  observeAll(); bindTilt(); bindDots();

  /* ---------- magnetic buttons ---------- */
  if(fine) $$(".btn:not(.sm)").forEach(b=>{
    b.addEventListener("pointermove", e=>{ const r=b.getBoundingClientRect(); b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.14}px,${(e.clientY-r.top-r.height/2)*.2}px)`; });
    b.addEventListener("pointerleave", ()=>b.style.transform="");
  });

  /* ---------- зверята: прыжок при наведении/тапе ---------- */
  document.addEventListener("pointerdown", e=>{ const c = e.target.closest(".critter"); if(!c) return;
    c.classList.remove("boing"); void c.offsetWidth; c.classList.add("boing"); });
})();
