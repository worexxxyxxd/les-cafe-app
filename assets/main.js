(function(){
  const C = window.CAFE;
  const page = document.body.dataset.page;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const ICON = {
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18M5 11a7 7 0 0 1 14 0M2 15h20M12 4V2"/><path d="M6 19h12"/></svg>',
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  window.ICON = ICON;

  const LOGO = `<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc173"/><stop offset="1" stop-color="#e8452c"/></linearGradient></defs>
    <circle cx="24" cy="24" r="23" fill="#12211a" stroke="url(#lg1)" stroke-width="2"/>
    <path d="M24 8l8 12h-4l7 10h-5l6 8H12l6-8h-5l7-10h-4z" fill="#2f6b3a"/><path d="M24 8l8 12h-4l7 10h-5l6 8H24z" fill="#3f8a4a"/>
    <rect x="22" y="38" width="4" height="4" fill="#7a4a24"/><circle cx="15" cy="16" r="1.6" fill="#ffc173"/><circle cx="35" cy="13" r="1.2" fill="#ffc173"/><circle cx="37" cy="24" r="1" fill="#ffc173"/></svg>`;

  const links = [
    ["index.html","Главная","home","01"],
    ["menu.html","Меню","menu","02"],
    ["about.html","О нас","about","03"],
    ["contacts.html","Контакты","contacts","04"]
  ];
  const cur = k => k===page ? ' aria-current="page"' : '';

  /* ---------- header / drawer / bottom bar / footer ---------- */
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="curtain in" aria-hidden="true"></div>
    <header class="header" id="header"><div class="wrap">
      <a class="logo" href="index.html" aria-label="Кафе «Лес» — на главную">${LOGO}<span class="tale">Лес<small>шаверма · бургеры · 24/7</small></span></a>
      <nav class="nav" aria-label="Основное меню">${links.map(l=>`<a href="${l[0]}"${cur(l[2])}>${l[1]}</a>`).join("")}</nav>
      <div class="header-cta">
        <span class="status" data-status><i></i><span></span></span>
        <a class="btn" href="${C.phoneHref}">${ICON.phone}Позвонить</a>
        <button class="burger" aria-label="Открыть меню" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div></header>
    <div class="drawer" aria-hidden="true">
      ${links.map(l=>`<a class="big" href="${l[0]}"${cur(l[2])}><em>${l[3]}</em>${l[1]}</a>`).join("")}
      <div class="drawer-foot">
        <span class="status" data-status><i></i><span></span></span>
        <a href="${C.phoneHref}">${C.phone}</a>
        <span>${C.address}</span>
      </div>
    </div>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer"><div class="wrap">
      <div class="footer-grid">
        <div><a class="logo" href="index.html">${LOGO}<span class="tale">Лес<small>шаверма · бургеры · 24/7</small></span></a>
          <p style="color:var(--muted);max-width:320px;margin-top:18px">Шаверма с мясом на углях, сказочные бургеры и кофе с собой. Не спим никогда — заходите хоть в три часа ночи.</p></div>
        <div><h4>Страницы</h4><ul>${links.map(l=>`<li><a href="${l[0]}">${l[1]}</a></li>`).join("")}</ul></div>
        <div><h4>Контакты</h4><ul><li><a href="${C.phoneHref}">${C.phone}</a></li><li>${C.address}</li><li><a href="${C.tg}" target="_blank" rel="noopener">Telegram ${C.tgName}</a></li><li><a href="${C.vk}" target="_blank" rel="noopener">ВКонтакте</a></li></ul></div>
        <div><h4>Часы</h4><ul><li>Каждый день</li><li><b>Круглосуточно</b></li><li><a href="${C.mapUrl}" target="_blank" rel="noopener">Мы на Яндекс Картах ↗</a></li></ul></div>
      </div>
      <div class="footer-big tale" aria-hidden="true">Лес · Лес · Лес</div>
      <div class="copy"><span>© ${new Date().getFullYear()} Кафе «Лес»</span><span>Меню и цены — по данным Яндекс Карт, на месте могут отличаться</span></div>
    </div></footer>
    <nav class="bottom-bar" aria-label="Быстрые действия">
      <a href="${page==='menu'?'index.html':'menu.html'}"${page==='menu'?'':''}>${page==='menu'?ICON.home+'Главная':ICON.menu+'Меню'}</a>
      <a href="${C.routeUrl}" target="_blank" rel="noopener">${ICON.pin}Маршрут</a>
      <a class="main" href="${C.phoneHref}">${ICON.phone}Позвонить</a>
    </nav>`);

  /* ---------- curtain transitions ---------- */
  const curtain = $(".curtain");
  setTimeout(()=>curtain.classList.remove("in"), 800);
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
  burger.addEventListener("click", ()=>{
    const open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
    drawer.setAttribute("aria-hidden", !open);
    document.documentElement.style.overflow = open ? "hidden" : "";
  });

  /* ---------- header solid on scroll ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-solid", scrollY > 30);
  onScroll(); addEventListener("scroll", onScroll, {passive:true});

  /* ---------- статус: работаем 24/7 (время Санкт-Петербурга) ---------- */
  function spbNow(){
    const d = new Date(); const utc = d.getTime() + d.getTimezoneOffset()*60000;
    return new Date(utc + 3*3600000);
  }
  function updateStatus(){
    const n = spbNow(), hh = String(n.getHours()).padStart(2,"0"), mm = String(n.getMinutes()).padStart(2,"0");
    $$("[data-status]").forEach(el=>{ el.classList.add("open"); el.querySelector("span").textContent = `Открыто · в СПб ${hh}:${mm}`; });
    const day = (n.getDay()+6)%7;
    $$(".hours tr").forEach((tr,i)=>tr.classList.toggle("today", i===day));
  }
  updateStatus(); setInterval(updateStatus, 30000);

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);
      if(en.target.dataset.count) countUp(en.target);
      $$(".fill", en.target).forEach(f=>f.style.width = f.dataset.w + "%");
    }});
  }, {threshold:.15, rootMargin:"0px 0px -40px 0px"});
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

  /* ---------- magnetic buttons ---------- */
  if(fine) $$(".btn").forEach(b=>{
    b.addEventListener("pointermove", e=>{ const r=b.getBoundingClientRect(); b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.25}px)`; });
    b.addEventListener("pointerleave", ()=>b.style.transform="");
  });

  /* ---------- carousel dots (mobile) ---------- */
  function bindDots(){
    $$("[data-dots]").forEach(dots=>{
      const track = document.getElementById(dots.dataset.dots); if(!track) return;
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
    <article class="dish ${cls} reveal" data-tilt="${cls?6:10}">
      <div class="art">${ART[d.art](d.o||{})}</div>
      <div class="meta">
        <span class="tag">${d.tag}</span>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="price-row"><span class="price">${d.price} ₽</span><span class="weight">${d.w}</span></div>
      </div>
    </article>`;

  /* ---------- menu page ---------- */
  function renderMenu(){
    const root = $("#menuRoot"); if(!root) return;
    const chips = $("#chips");
    chips.innerHTML = `<button class="chip-btn active" data-cat="all">Всё меню</button>` +
      MENU.map(c=>`<button class="chip-btn" data-cat="${c.id}">${c.title}<small>${c.items.length}</small></button>`).join("");
    root.innerHTML = MENU.map(c=>`
      <section class="menu-cat" id="cat-${c.id}" data-cat="${c.id}">
        <h2>${c.title}<small>${c.items.length} позиций</small></h2>
        <div class="menu-list">${c.items.map(it=>`
          <div class="item reveal" data-name="${it[0].toLowerCase()}">
            <div class="ico">${ART[it[3]](it[5]||{})}</div>
            <div><h3>${it[0]}${it[4]?'<span class="hit">хит</span>':''}</h3><span class="w">${it[1]}</span></div>
            <div class="p">${it[2].toLocaleString("ru-RU")} ₽</div>
          </div>`).join("")}</div>
      </section>`).join("");

    chips.addEventListener("click", e=>{
      const b = e.target.closest(".chip-btn"); if(!b) return;
      $$(".chip-btn", chips).forEach(x=>x.classList.toggle("active", x===b));
      b.scrollIntoView({inline:"center", block:"nearest", behavior:"smooth"});
      const cat = b.dataset.cat;
      if(cat==="all") $("#menuRoot").scrollIntoView({behavior:"smooth"});
      else document.getElementById("cat-"+cat).scrollIntoView({behavior:"smooth"});
    });
    // активная категория при прокрутке
    const catIO = new IntersectionObserver(es=>{
      es.forEach(en=>{ if(en.isIntersecting){ const id = en.target.dataset.cat;
        $$(".chip-btn", chips).forEach(x=>{ const on = x.dataset.cat===id; x.classList.toggle("active", on);
          if(on) chips.scrollTo({left: x.offsetLeft - chips.clientWidth/2 + x.clientWidth/2, behavior:"smooth"}); });
      }});
    }, {rootMargin:"-45% 0px -50% 0px"});
    $$(".menu-cat").forEach(s=>catIO.observe(s));

    const input = $("#search");
    input.addEventListener("input", ()=>{
      const q = input.value.trim().toLowerCase(); let any = 0;
      $$(".menu-cat").forEach(sec=>{
        let n = 0; $$(".item", sec).forEach(it=>{ const ok = !q || it.dataset.name.includes(q); it.style.display = ok?"":"none"; if(ok){n++; it.classList.add("in");} });
        sec.style.display = n ? "" : "none"; any += n;
      });
      $("#empty").style.display = any ? "none" : "block";
    });
  }

  /* ---------- home hits ---------- */
  function renderHits(){
    const root = $("#hitsTrack"); if(!root) return;
    const hits = [
      {art:"shawarma",tag:"Классика Леса",name:"Шаверма «Золотой стандарт»",desc:"Мясо на углях, тончайший лаваш, свежие овощи и наш необычный соус. С неё начинают все.",price:329,w:"шаверма"},
      {art:"shawarma",o:{acc:"#ff3a1c",acc2:"#ffb02c"},tag:"С огоньком",name:"Огнезмей",desc:"Для тех, кто любит погорячее.",price:449,w:"шаверма"},
      {art:"burger",o:{fire:true},tag:"Трёхголовый",name:"Горыныч бургер",desc:"Огненный бургер — сытый, как три богатыря.",price:529,w:"бургер"},
      {art:"plate",o:{meat:"#7a3414"},tag:"На тарелке",name:"Богатырская",desc:"Шаверма на тарелке для большого голода.",price:599,w:"на тарелке"},
      {art:"shawarma",o:{meat:"#ff8a5c"},tag:"По-царски",name:"Царская с креветкой",desc:"Креветки, овощи и соус в лаваше.",price:569,w:"шаверма"}
    ];
    root.innerHTML = dishCard(hits[0],"feature") + hits.slice(1).map(h=>dishCard(h)).join("");
  }

  renderHits(); renderMenu();
  observeAll(); bindTilt(); bindDots();
})();
