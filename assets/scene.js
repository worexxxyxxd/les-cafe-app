/* 3D-сцена «Ночной лес» на Three.js.
   Режимы (data-scene): home — парящая шаверма и полёт сквозь лес при скролле,
   burger — бургер «в разборе», fire — костёр с углями, pin — метка на поляне. */
(function(){
  const host = document.querySelector("[data-scene]");
  if(!host || !window.THREE) return;
  const T = THREE, mode = host.dataset.scene;
  if(T.ColorManagement) T.ColorManagement.legacyMode = false; // hex-цвета как sRGB
  const mobile = matchMedia("(max-width:760px)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fixed = host.classList.contains("fixed");

  let renderer;
  try{ renderer = new T.WebGLRenderer({antialias:!mobile, alpha:true, powerPreference:"high-performance"}); }
  catch(e){ return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile?1.5:1.75));
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.appendChild(renderer.domElement);

  const BG = 0x0b1510;
  const scene = new T.Scene();
  scene.fog = new T.FogExp2(BG, mode==="home" ? .045 : .06);
  const camera = new T.PerspectiveCamera(mobile?62:48, 1, .1, 200);
  const camBase = new T.Vector3(0, 2.1, mobile?8.2:7);
  camera.position.copy(camBase);

  /* ---------- свет ---------- */
  scene.add(new T.HemisphereLight(0x6a8fc0, 0x0c1a10, .7));
  const moon = new T.DirectionalLight(0xbcd2ff, 1.1); moon.position.set(-6, 12, -10); scene.add(moon);
  const warm = new T.PointLight(0xff8a3c, 2.4, 16, 1.6); warm.position.set(1.5, 3, 3); scene.add(warm);
  const rim = new T.PointLight(0x9fd08c, 1.5, 14, 2); rim.position.set(-3, 2.5, -2); scene.add(rim);

  /* ---------- вспомогательные текстуры ---------- */
  function canvasTex(w, h, draw){ const c = document.createElement("canvas"); c.width=w; c.height=h; draw(c.getContext("2d"), w, h); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 4; return t; }
  const glowTex = canvasTex(64,64,(g,w)=>{ const r=g.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2); r.addColorStop(0,"rgba(255,255,255,1)"); r.addColorStop(.25,"rgba(255,230,160,.8)"); r.addColorStop(1,"rgba(255,200,120,0)"); g.fillStyle=r; g.fillRect(0,0,w,w); });

  /* ---------- окружение для отражений (фольга, глянец) ---------- */
  const envTex = canvasTex(256,128,(g,w,h)=>{
    const gr = g.createLinearGradient(0,0,0,h); gr.addColorStop(0,"#9fb2c8"); gr.addColorStop(.45,"#e8eef5"); gr.addColorStop(.55,"#5a6470"); gr.addColorStop(1,"#1a1c20");
    g.fillStyle = gr; g.fillRect(0,0,w,h);
    g.fillStyle = "#fff"; g.beginPath(); g.arc(w*.25,h*.25,12,0,7); g.fill();
    g.fillStyle = "rgba(255,170,90,.8)"; g.fillRect(w*.62,h*.4,w*.1,h*.1);
  });
  envTex.mapping = T.EquirectangularReflectionMapping;
  const pmrem = new T.PMREMGenerator(renderer);
  const ENV = pmrem.fromEquirectangular(envTex).texture;

  /* ---------- земля ---------- */
  const groundGeo = new T.PlaneGeometry(140, 220, 60, 90);
  groundGeo.rotateX(-Math.PI/2);
  const gp = groundGeo.attributes.position;
  for(let i=0;i<gp.count;i++){ const x=gp.getX(i), z=gp.getZ(i); const path = Math.min(1, Math.abs(x)/4);
    gp.setY(i, (Math.sin(x*.35)*Math.cos(z*.22)*.6 + Math.sin(z*.13+x*.1)*.5) * path); }
  groundGeo.computeVertexNormals();
  const ground = new T.Mesh(groundGeo, new T.MeshStandardMaterial({color:0x0c1f13, roughness:1, flatShading:true}));
  ground.position.z = -60; scene.add(ground);

  /* ---------- лес: инстансы стволов и крон ---------- */
  const N = mobile ? 90 : 190;
  const trunkGeo = new T.CylinderGeometry(.12, .2, 1.6, 6); trunkGeo.translate(0,.8,0);
  const coneGeo = new T.ConeGeometry(1, 1.8, 7);
  // кора берёзы (как на фирменных макетах): светлая с тёмными чёрточками
  const barkTex = canvasTex(64,256,(g,w,h)=>{ g.fillStyle="#f1efe6"; g.fillRect(0,0,w,h); g.fillStyle="#1d1f1c";
    let r2 = 3; const r = ()=> (r2 = (r2*16807)%2147483647)/2147483647;
    for(let i=0;i<26;i++){ const y = r()*h, x = r()*w*.8; g.fillRect(x, y, 6 + r()*24, 2 + r()*4); } });
  barkTex.wrapS = barkTex.wrapT = T.RepeatWrapping;
  const trunks = new T.InstancedMesh(trunkGeo, new T.MeshStandardMaterial({map:barkTex, roughness:.9}), N);
  const crowns = new T.InstancedMesh(coneGeo, new T.MeshStandardMaterial({roughness:.95, flatShading:true}), N*3);
  const m4 = new T.Matrix4(), q = new T.Quaternion(), s = new T.Vector3(), p = new T.Vector3(), col = new T.Color();
  const greens = [0x1f4a2a,0x2a5e33,0x184026,0x2f6b3a,0x234d34];
  let rnd = 7; const R = ()=> (rnd = (rnd*16807)%2147483647)/2147483647;
  for(let i=0;i<N;i++){
    let x = (R()-.5)*60; if(Math.abs(x) < 3.2) x = Math.sign(x||1)*(3.2+R()*3);
    const z = 4 - R()*150, sc = .8 + R()*1.4;
    p.set(x, 0, z); q.setFromAxisAngle(new T.Vector3(0,1,0), R()*6.28); s.set(sc,sc,sc);
    m4.compose(p,q,s); trunks.setMatrixAt(i,m4);
    trunks.setColorAt(i, col.setHex(i%3 ? 0xd9d6cc : 0x6b4a33));
    for(let k=0;k<3;k++){
      const cs = sc*(1.25-k*.3);
      p.set(x, sc*(1.4 + k*1.0), z); s.set(cs, sc*(1-k*.12), cs);
      m4.compose(p,q,s); crowns.setMatrixAt(i*3+k, m4);
      col.setHex(greens[(i+k)%greens.length]).multiplyScalar(.8 + R()*.4); crowns.setColorAt(i*3+k, col);
    }
  }
  scene.add(trunks, crowns);

  /* ---------- луна ---------- */
  const moonSpr = new T.Sprite(new T.SpriteMaterial({map:glowTex, color:0xdfe8ff, transparent:true, depthWrite:false, fog:false}));
  moonSpr.scale.set(18,18,1); moonSpr.position.set(-14, 16, -90); scene.add(moonSpr);
  const moonDisc = new T.Mesh(new T.CircleGeometry(2.4, 40), new T.MeshBasicMaterial({color:0xf3f0e0, fog:false}));
  moonDisc.position.copy(moonSpr.position).add(new T.Vector3(0,0,.1)); scene.add(moonDisc);

  /* ---------- светлячки ---------- */
  const FN = mobile ? 140 : 320;
  const fGeo = new T.BufferGeometry(), fPos = new Float32Array(FN*3), fSeed = [];
  for(let i=0;i<FN;i++){ fSeed.push({x:(R()-.5)*30, y:.4+R()*5, z:6-R()*90, a:R()*6.28, sp:.3+R()*.8});
    fPos.set([fSeed[i].x, fSeed[i].y, fSeed[i].z], i*3); }
  fGeo.setAttribute("position", new T.BufferAttribute(fPos,3));
  const fMat = new T.PointsMaterial({map:glowTex, color:0xffc56a, size:mobile?.32:.26, transparent:true, depthWrite:false, blending:T.AdditiveBlending});
  const flies = new T.Points(fGeo, fMat); scene.add(flies);

  /* ---------- угли / искры (общие для home, fire) ---------- */
  function makeEmbers(n, origin, spread){
    const g = new T.BufferGeometry(), pos = new Float32Array(n*3), seed=[];
    for(let i=0;i<n;i++){ seed.push({x:(R()-.5)*spread, z:(R()-.5)*spread, t:R(), sp:.4+R()*.9}); }
    g.setAttribute("position", new T.BufferAttribute(pos,3));
    const pts = new T.Points(g, new T.PointsMaterial({map:glowTex, color:0xff7a2c, size:.18, transparent:true, depthWrite:false, blending:T.AdditiveBlending}));
    pts.userData = {seed, origin, n}; scene.add(pts); return pts;
  }
  function tickEmbers(pts, dt){
    const {seed, origin, n} = pts.userData, a = pts.geometry.attributes.position;
    for(let i=0;i<n;i++){ const s = seed[i]; s.t += dt*s.sp*.35; if(s.t>1){ s.t=0; }
      a.setXYZ(i, origin.x + s.x*(1+s.t) + Math.sin(s.t*9+i)*.15, origin.y + s.t*4.2, origin.z + s.z*(1+s.t)); }
    a.needsUpdate = true;
  }

  /* ---------- герой сцены ---------- */
  const hero = new T.Group(); scene.add(hero);
  let embers = null, flames = [], rings = [], burgerParts = [];

  if(mode==="home") buildShawarma();
  if(mode==="burger") buildBurger();
  if(mode==="fire") buildFire();
  if(mode==="pin") buildPin();
  hero.traverse(o=>{ if(o.material && o.material.isMeshStandardMaterial){ o.material.envMap = ENV; o.material.envMapIntensity = o.material.metalness > .5 ? 1.2 : .45; o.material.needsUpdate = true; } });

  function buildShawarma(){
    const lavash = canvasTex(512,512,(g,w,h)=>{
      const gr = g.createLinearGradient(0,0,w,0); gr.addColorStop(0,"#c98a45"); gr.addColorStop(.5,"#f3d39a"); gr.addColorStop(1,"#c98a45");
      g.fillStyle=gr; g.fillRect(0,0,w,h);
      for(let i=0;i<260;i++){ const x=Math.random()*w,y=Math.random()*h,r=2+Math.random()*9; const rg=g.createRadialGradient(x,y,0,x,y,r);
        rg.addColorStop(0,"rgba(120,60,15,.75)"); rg.addColorStop(1,"rgba(120,60,15,0)"); g.fillStyle=rg; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }
      g.strokeStyle="rgba(255,240,200,.35)"; g.lineWidth=3; for(let i=0;i<6;i++){ g.beginPath(); g.moveTo(0,i*90+20); g.bezierCurveTo(w*.3,i*90+60,w*.6,i*90-10,w,i*90+40); g.stroke(); }
    });
    const pts = []; const H = 2.6;
    for(let i=0;i<=24;i++){ const t=i/24, y=t*H; let r = .62;
      if(t<.08) r = .62*Math.sin((t/.08)*Math.PI/2)*0.85+.05; if(t>.9) r = .62 + (t-.9)*1.2;
      pts.push(new T.Vector2(r, y)); }
    const roll = new T.Mesh(new T.LatheGeometry(pts, 40), new T.MeshStandardMaterial({map:lavash, roughness:.75}));
    roll.position.y = -H/2; hero.add(roll);

    // обёртка из лаваша (спираль)
    const wrapCurve = new T.CatmullRomCurve3(Array.from({length:40},(_,i)=>{ const t=i/39, a=t*Math.PI*4.2; return new T.Vector3(Math.cos(a)*.635, -H/2+.2+t*(H-.45), Math.sin(a)*.635); }));
    // (спираль только для формы шва — не рисуем)
    void wrapCurve;

    // фольга
    const foilGeo = new T.CylinderGeometry(.68, .6, 1.25, 48, 10, true);
    const fp = foilGeo.attributes.position;
    for(let i=0;i<fp.count;i++){ const x=fp.getX(i), y=fp.getY(i), z=fp.getZ(i); const n = 1 + (Math.sin(y*28+x*14)*.5+Math.sin(Math.atan2(z,x)*22)*.5)*.035;
      fp.setXYZ(i, x*n, y, z*n); }
    // зубчатый край
    for(let i=0;i<fp.count;i++){ const y=fp.getY(i); if(y>.6){ const a=Math.atan2(fp.getZ(i),fp.getX(i)); fp.setY(i, y + Math.abs(Math.sin(a*9))*.14); } }
    foilGeo.computeVertexNormals();
    const foil = new T.Mesh(foilGeo, new T.MeshStandardMaterial({color:0xdfe3ea, metalness:1, roughness:.28, side:T.DoubleSide}));
    foil.position.y = -H/2 + .6; hero.add(foil);

    // начинка сверху
    const topY = H/2 - .02;
    const fillTex = canvasTex(256,256,(g,w)=>{ g.fillStyle="#f4e6c8"; g.beginPath(); g.arc(w/2,w/2,w/2,0,7); g.fill(); g.fillStyle="#f8f2e4"; g.beginPath(); g.arc(w/2,w/2,w*.42,0,7); g.fill(); });
    const cap = new T.Mesh(new T.CircleGeometry(.68, 40), new T.MeshStandardMaterial({map:fillTex, roughness:.9}));
    cap.rotation.x = -Math.PI/2; cap.position.y = topY; hero.add(cap);
    const meatMat = new T.MeshStandardMaterial({color:0x8a3d17, roughness:.7, flatShading:true});
    const tomMat = new T.MeshStandardMaterial({color:0xe8452c, roughness:.4});
    const greenMat = new T.MeshStandardMaterial({color:0x6cbf4a, roughness:.6, flatShading:true});
    const sauceMat = new T.MeshStandardMaterial({color:0xfff6e4, roughness:.3});
    for(let i=0;i<14;i++){ const a=R()*6.28, r=R()*.48;
      const m = new T.Mesh(new T.DodecahedronGeometry(.1+R()*.08,0), meatMat); m.position.set(Math.cos(a)*r, topY+.08+R()*.12, Math.sin(a)*r); m.scale.set(1.4,.8,1); m.rotation.set(R()*3,R()*3,R()*3); hero.add(m); }
    for(let i=0;i<6;i++){ const a=R()*6.28, r=.15+R()*.4;
      const t = new T.Mesh(new T.CylinderGeometry(.11,.11,.035,16), tomMat); t.position.set(Math.cos(a)*r, topY+.18+R()*.08, Math.sin(a)*r); t.rotation.set((R()-.5)*1.2,0,(R()-.5)*1.2); hero.add(t); }
    for(let i=0;i<8;i++){ const a=R()*6.28, r=R()*.5;
      const l = new T.Mesh(new T.TetrahedronGeometry(.1,0), greenMat); l.position.set(Math.cos(a)*r, topY+.22+R()*.1, Math.sin(a)*r); l.scale.set(1.6,.5,1); l.rotation.set(R()*3,R()*3,R()*3); hero.add(l); }
    const sauce = new T.Mesh(new T.TorusGeometry(.32,.035,8,40, Math.PI*1.6), sauceMat); sauce.rotation.x = Math.PI/2; sauce.position.y = topY+.26; hero.add(sauce);

    hero.position.set(mobile?0:1.9, mobile?3.15:2.1, 0);
    hero.rotation.set(.25, 0, -.32);
    hero.scale.setScalar(mobile?.78:1);
    embers = makeEmbers(mobile?40:80, new T.Vector3(hero.position.x, 0, 0), 2.2);
  }

  function buildBurger(){
    const bunMat = new T.MeshStandardMaterial({color:0xd9862e, roughness:.55});
    const parts = [];
    const bottom = new T.Mesh(new T.CylinderGeometry(1.05,.95,.38,40), bunMat); parts.push([bottom,0]);
    const patty = new T.Mesh(new T.CylinderGeometry(1.1,1.1,.32,40), new T.MeshStandardMaterial({color:0x4a2210, roughness:.9, flatShading:true})); parts.push([patty,.4]);
    const cheeseGeo = new T.BoxGeometry(1.9,.05,1.9); const cheese = new T.Mesh(cheeseGeo, new T.MeshStandardMaterial({color:0xffc93a, roughness:.4})); cheese.rotation.y=.6; parts.push([cheese,.62]);
    const tomato = new T.Mesh(new T.CylinderGeometry(.95,.95,.12,32), new T.MeshStandardMaterial({color:0xe8452c, roughness:.35})); parts.push([tomato,.78]);
    const salGeo = new T.CylinderGeometry(1.2,1.2,.06,48,1); const sp = salGeo.attributes.position;
    for(let i=0;i<sp.count;i++){ const a=Math.atan2(sp.getZ(i),sp.getX(i)), r=Math.hypot(sp.getX(i),sp.getZ(i)); if(r>1) sp.setY(i, sp.getY(i)+Math.sin(a*12)*.07); }
    salGeo.computeVertexNormals();
    const salad = new T.Mesh(salGeo, new T.MeshStandardMaterial({color:0x6cbf4a, roughness:.6, side:T.DoubleSide})); parts.push([salad,.92]);
    const topGeo = new T.SphereGeometry(1.05, 40, 20, 0, Math.PI*2, 0, Math.PI/2); topGeo.scale(1,.72,1);
    const top = new T.Mesh(topGeo, bunMat); parts.push([top,1.0]);
    const seedGeo = new T.SphereGeometry(.04,6,4); seedGeo.scale(1.6,.6,1);
    const seeds = new T.InstancedMesh(seedGeo, new T.MeshStandardMaterial({color:0xfff3d6}), 60);
    for(let i=0;i<60;i++){ const u=R()*6.28, v=R()*1.2+.15; const x=Math.sin(v)*Math.cos(u)*1.05, y=Math.cos(v)*.72*1.05, z=Math.sin(v)*Math.sin(u)*1.05;
      m4.compose(new T.Vector3(x,y,z), new T.Quaternion().setFromEuler(new T.Euler(R(),R()*6,R())), new T.Vector3(1,1,1)); seeds.setMatrixAt(i,m4); }
    top.add(seeds);
    parts.forEach(([m,y],i)=>{ m.position.y = y; hero.add(m); burgerParts.push({m, y, k:i}); });
    hero.position.set(mobile?0:2.4, mobile?2.9:2, 0); hero.scale.setScalar(mobile?.9:1.15); hero.rotation.x = .35;
  }

  function buildFire(){
    const logMat = new T.MeshStandardMaterial({color:0x4a2c16, roughness:1, flatShading:true});
    for(let i=0;i<5;i++){ const l = new T.Mesh(new T.CylinderGeometry(.12,.14,1.8,7), logMat); l.rotation.set(Math.PI/2-.35, i/5*Math.PI*2, 0); l.position.set(Math.cos(i/5*6.28)*.35, .3, Math.sin(i/5*6.28)*.35); l.lookAt(0,.9,0); l.rotateX(Math.PI/2); hero.add(l); }
    const stoneMat = new T.MeshStandardMaterial({color:0x5a5e5a, roughness:1, flatShading:true});
    for(let i=0;i<10;i++){ const st = new T.Mesh(new T.DodecahedronGeometry(.22,0), stoneMat); st.position.set(Math.cos(i/10*6.28)*1.05, .1, Math.sin(i/10*6.28)*1.05); st.scale.y=.7; hero.add(st); }
    [[0xff4a1c,.55,1.5],[0xff9a3c,.4,1.2],[0xffe08a,.22,.8]].forEach(([c,r,h])=>{
      const f = new T.Mesh(new T.ConeGeometry(r,h,8,1,true), new T.MeshBasicMaterial({color:c, transparent:true, opacity:.85, blending:T.AdditiveBlending, depthWrite:false, side:T.DoubleSide}));
      f.position.y = .3 + h/2; hero.add(f); flames.push(f); });
    const glow = new T.Sprite(new T.SpriteMaterial({map:glowTex, color:0xff8a3c, transparent:true, opacity:.8, blending:T.AdditiveBlending, depthWrite:false}));
    glow.scale.set(5,5,1); glow.position.y = .9; hero.add(glow);
    hero.position.set(mobile?0:2.4, mobile?.9:.2, 0);
    warm.position.set(hero.position.x, 1.6, 0); warm.intensity = 4;
    embers = makeEmbers(mobile?60:120, new T.Vector3(hero.position.x, hero.position.y+.6, 0), .8);
  }

  function buildPin(){
    const mat = new T.MeshStandardMaterial({color:0xe5322d, roughness:.35, metalness:.1});
    const head = new T.Mesh(new T.SphereGeometry(.7,40,24), mat); head.position.y = 2.2;
    const cone = new T.Mesh(new T.ConeGeometry(.6,1.5,40), mat); cone.rotation.x = Math.PI; cone.position.y = 1.15;
    const hole = new T.Mesh(new T.SphereGeometry(.28,24,16), new T.MeshStandardMaterial({color:0xf3ecdc})); hole.position.set(0,2.25,.55); hole.scale.z=.5;
    const pin = new T.Group(); pin.add(head, cone, hole); hero.add(pin); hero.userData.pin = pin;
    for(let i=0;i<3;i++){ const r = new T.Mesh(new T.RingGeometry(.5,.6,48), new T.MeshBasicMaterial({color:0x9fd08c, transparent:true, side:T.DoubleSide, depthWrite:false}));
      r.rotation.x = -Math.PI/2; r.position.y = .45; hero.add(r); rings.push(r); }
    hero.position.set(mobile?0:2.6, mobile?.9:.2, 0);
  }

  /* ---------- размер ---------- */
  // раскладка: на широком экране объект справа от текста, на узком — сверху по центру
  const LAYOUT = { home:[2.1,3.75,1,.6], burger:[1.45,2.75,1,.62], fire:[.2,1.4,1,.8], pin:[.2,1.2,1,.75] };
  let narrow = mobile, baseY = 0, baseS = 1;
  const touch = matchMedia("(hover:none) and (pointer:coarse)").matches;
  let lastW = 0;
  function resize(){
    const w = host.clientWidth;
    // на телефоне высота окна меняется при каждом скролле (адресная строка) — берём
    // максимальную высоту экрана и пересчитываем сцену только при смене ширины
    if(touch && w === lastW) return;
    lastW = w;
    const h = touch ? Math.max(host.clientHeight, innerHeight, screen.height) : host.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w/h;
    narrow = camera.aspect < 1.05;
    camera.fov = narrow ? 62 : 48; camera.updateProjectionMatrix();
    camBase.z = narrow ? 8.2 : 7;
    const L = LAYOUT[mode]; if(!L) return;
    baseY = narrow ? L[1] : L[0]; baseS = narrow ? L[3] : L[2];
    const hx = narrow ? 0 : Math.min(3.2, 1.7*camera.aspect);
    hero.position.set(hx, baseY, 0); hero.scale.setScalar(baseS);
    if(embers) embers.userData.origin.x = hx;
    if(mode==="fire"){ warm.position.x = hx; embers.userData.origin.y = baseY + .6; }
  }
  resize(); addEventListener("resize", resize);

  /* ---------- ввод ---------- */
  const ptr = {x:0, y:0, tx:0, ty:0};
  addEventListener("pointermove", e=>{ ptr.tx = e.clientX/innerWidth - .5; ptr.ty = e.clientY/innerHeight - .5; }, {passive:true});
  // гироскоп на телефонах (если доступен без запроса разрешения)
  addEventListener("deviceorientation", e=>{ if(e.gamma==null) return; ptr.tx = Math.max(-.5,Math.min(.5,e.gamma/40)); ptr.ty = Math.max(-.5,Math.min(.5,(e.beta-45)/50)); }, {passive:true});

  let visible = true;
  if(!fixed) new IntersectionObserver(es=>{ visible = es[0].isIntersecting; }).observe(host);

  /* ---------- цикл ---------- */
  const clock = new T.Clock(); let t = 0;
  function frame(){
    requestAnimationFrame(frame);
    if(!visible || document.hidden) return;
    const dt = Math.min(clock.getDelta(), .05); t += reduced ? dt*.2 : dt;

    ptr.x += (ptr.tx - ptr.x)*.05; ptr.y += (ptr.ty - ptr.y)*.05;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const sp = fixed ? scrollY / maxScroll : Math.min(1, scrollY / innerHeight);

    // камера: полёт вперёд по лесной тропе
    const fly = fixed ? sp*70 : sp*4;
    camera.position.x = camBase.x + ptr.x*1.4 + Math.sin(fly*.08)*1.2*(fixed?1:0);
    camera.position.y = camBase.y - ptr.y*.8 + Math.sin(t*.6)*.05;
    camera.position.z = camBase.z - fly;
    camera.lookAt(camera.position.x*.4, 1.6 - ptr.y*.3, camera.position.z - 8);

    // светлячки
    const fa = flies.geometry.attributes.position;
    for(let i=0;i<FN;i++){ const s = fSeed[i]; s.a += dt*s.sp;
      fa.setXYZ(i, s.x + Math.sin(s.a)*.6, s.y + Math.sin(s.a*1.7)*.35, s.z + Math.cos(s.a*.8)*.6); }
    fa.needsUpdate = true;
    fMat.opacity = .75 + Math.sin(t*3)*.25;

    warm.intensity = (mode==="fire"?4:2.4) + Math.sin(t*13)*.3 + Math.sin(t*7.3)*.25;

    if(mode==="home"){
      const hp = Math.min(1, scrollY / innerHeight);
      hero.rotation.y = t*.45 + hp*3;
      hero.position.y = baseY + Math.sin(t*1.2)*.12 + hp*1.5;
      hero.position.z = camera.position.z - camBase.z;           // летит вместе с камерой
      hero.scale.setScalar(baseS*(1-hp*.55));
      hero.visible = hp < .98;
      warm.position.z = hero.position.z + 3;
      if(embers){ embers.userData.origin.z = hero.position.z; embers.userData.origin.y = hero.position.y - 2.4; tickEmbers(embers, dt); }
    }
    if(mode==="burger"){
      const open = .5 + .5*Math.sin(t*.9);
      burgerParts.forEach(b=>{ b.m.position.y = b.y + b.k*open*.32; });
      hero.rotation.y = t*.4 + ptr.x*.8; hero.position.y = baseY + Math.sin(t*1.1)*.1;
    }
    if(mode==="fire"){
      flames.forEach((f,i)=>{ f.scale.set(1+Math.sin(t*9+i)*.08, 1+Math.sin(t*11+i*2)*.18, 1+Math.cos(t*8+i)*.08); f.rotation.y = t*(1+i*.5); });
      tickEmbers(embers, dt);
    }
    if(mode==="pin"){
      const pin = hero.userData.pin; pin.position.y = .3 + Math.abs(Math.sin(t*2))*.5; pin.rotation.y = t*.8;
      rings.forEach((r,i)=>{ const k = ((t*.5 + i/3)%1); r.scale.setScalar(1+k*4); r.material.opacity = 1-k; });
    }

    renderer.render(scene, camera);
  }
  frame();
  host.classList.add("ready");})();
