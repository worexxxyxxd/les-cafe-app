/* Данные кафе «Лес» (источник: Яндекс Карты — организация 126400507925) */
window.CAFE = {
  name: "Лес",
  address: "Софийская ул., 22, Санкт-Петербург",
  phone: "+7 (921) 368-13-83",
  phoneHref: "tel:+79213681383",
  hours: "Круглосуточно",
  rating: "5,0", votes: 276, reviews: 218,
  check: "350–550 ₽",
  tg: "https://t.me/lesrest", tgName: "@lesrest",
  vk: "https://vk.ru/club230654123",
  mapUrl: "https://yandex.ru/maps/org/les/126400507925/",
  routeUrl: "https://yandex.ru/maps/?rtext=~59.875985%2C30.401220&rtt=auto",
  lat: 59.875985, lon: 30.401220
};

/* ---------- SVG-иллюстрации (объём за счёт градиентов и теней) ---------- */
(function(){
  let uid = 0;
  const id = p => p + (++uid);
  const shadow = (cy=184, rx=60) => `<ellipse cx="100" cy="${cy}" rx="${rx}" ry="9" fill="#000" opacity=".4"/>`;

  const ART = {
    /* шаверма в лаваше: срез с начинкой + фольга */
    shawarma(o={}){ const g=id("sw"); const meat=o.meat||"#9a4a1e", acc=o.acc||"#e8452c", acc2=o.acc2||"#8fd16a";
      return `<svg viewBox="0 0 200 200"><defs>
        <linearGradient id="${g}l" x1="0" x2="1"><stop offset="0" stop-color="#c98a45"/><stop offset=".35" stop-color="#f3d39a"/><stop offset=".7" stop-color="#e6b672"/><stop offset="1" stop-color="#a86a2c"/></linearGradient>
        <linearGradient id="${g}f" x1="0" x2="1"><stop offset="0" stop-color="#8a8f96"/><stop offset=".3" stop-color="#f2f4f7"/><stop offset=".55" stop-color="#b9bec6"/><stop offset=".8" stop-color="#eef0f3"/><stop offset="1" stop-color="#7d828a"/></linearGradient>
        <radialGradient id="${g}c" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#fff3d8"/><stop offset="1" stop-color="#e2b46e"/></radialGradient></defs>
        ${shadow(186,48)}
        <g transform="rotate(-14 100 110)">
          <path d="M62 64h76l-6 116a10 10 0 0 1-10 9H78a10 10 0 0 1-10-9z" fill="url(#${g}l)"/>
          ${Array.from({length:7},(_,i)=>`<ellipse cx="${74+i*9}" cy="${100+(i%3)*26}" rx="4" ry="2.4" fill="#8a4a16" opacity=".55"/>`).join("")}
          <path d="M66 128h68l-4 52a10 10 0 0 1-10 9H80a10 10 0 0 1-10-9z" fill="url(#${g}f)"/>
          <path d="M66 128l10 8 10-8 10 8 10-8 10 8 10-8 8 6" stroke="#9aa0a8" stroke-width="1.5" fill="none"/>
          <ellipse cx="100" cy="64" rx="38" ry="15" fill="url(#${g}c)"/>
          <ellipse cx="100" cy="64" rx="31" ry="11" fill="#f6ead2"/>
          <g>
            <path d="M76 62c4-8 14-10 18-4-2 7-12 10-18 4z" fill="${meat}"/>
            <path d="M98 58c6-6 16-4 18 2-4 6-14 6-18-2z" fill="${meat}"/>
            <path d="M88 70c6-4 16-2 16 4-6 4-14 4-16-4z" fill="${meat}" opacity=".9"/>
            <circle cx="112" cy="68" r="5" fill="${acc}"/><circle cx="84" cy="56" r="4" fill="${acc}"/>
            <path d="M104 54l10 2-6 6z" fill="${acc2}"/><path d="M80 68l8-2-2 7z" fill="${acc2}"/>
            <path d="M74 64c10 6 34 8 52 0" stroke="#fffaf0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>
          </g>
          <path d="M70 80l-2 40" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".18"/>
        </g></svg>`;},
    plate(o={}){ const g=id("pt"); const meat=o.meat||"#9a4a1e";
      return `<svg viewBox="0 0 200 200"><defs><radialGradient id="${g}p" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fdfbf4"/><stop offset=".8" stop-color="#e2dccb"/><stop offset="1" stop-color="#a9a28e"/></radialGradient></defs>
        <ellipse cx="100" cy="110" rx="92" ry="86" fill="#000" opacity=".38"/><circle cx="100" cy="100" r="90" fill="url(#${g}p)"/><circle cx="100" cy="100" r="72" fill="none" stroke="#2e5a3a" stroke-width="2" opacity=".35"/>
        <g>${Array.from({length:9},(_,i)=>`<rect x="${110+(i%3)*12}" y="${60+Math.floor(i/3)*14}" width="9" height="34" rx="3" transform="rotate(${-30+i*7} ${114+(i%3)*12} ${76+Math.floor(i/3)*14})" fill="${i%2?'#f6c45a':'#e9a93a'}"/>`).join("")}</g>
        <g>${Array.from({length:8},(_,i)=>`<path d="M${52+(i%4)*14} ${78+Math.floor(i/4)*22}c6-6 14-6 16 2-4 6-12 6-16-2z" fill="${meat}" opacity="${.85+(i%2)*.15}"/>`).join("")}</g>
        <circle cx="74" cy="138" r="13" fill="#e8452c"/><circle cx="74" cy="138" r="8" fill="#ff7a5c"/><circle cx="102" cy="144" r="11" fill="#8fd16a"/><circle cx="102" cy="144" r="6" fill="#d8f2c4"/>
        <ellipse cx="136" cy="134" rx="16" ry="11" fill="#f7f1e2"/><path d="M126 132c6 4 14 4 20 0" stroke="#d6cfbb" stroke-width="2" fill="none"/>
        ${o.shrimp?`<path d="M84 64c10-10 26-6 26 6-4-6-14-8-20 0z" fill="#ff8a5c"/><path d="M58 112c10-10 26-6 26 6-4-6-14-8-20 0z" fill="#ff8a5c"/>`:""}
        ${o.veg?`<g fill="#b0702a">${[60,76,92,68,84].map((x,i)=>`<circle cx="${x}" cy="${86+(i%2)*18}" r="8"/>`).join("")}</g>`:""}</svg>`;},
    burger(o={}){ const g=id("bg"); const pat=o.pat||"#5a2a14";
      return `<svg viewBox="0 0 200 200"><defs><radialGradient id="${g}b" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#ffc56b"/><stop offset=".7" stop-color="#d8862e"/><stop offset="1" stop-color="#8f4a14"/></radialGradient></defs>
        ${shadow(178,74)}
        <path d="M30 132h140a8 8 0 0 1-8 28H38a8 8 0 0 1-8-28z" fill="#d48a38"/>
        <rect x="26" y="112" width="148" height="20" rx="10" fill="${pat}"/>
        ${o.cheese?`<path d="M28 110h144l-14 14-12-8-14 12-14-10-14 12-14-10-14 12-14-10-14 10-12-8z" fill="#ffc93a"/>`:""}
        <path d="M24 108c20 10 40-6 60 4s40-6 60 2 30-4 32-4v-8H24z" fill="#6cbf4a"/><rect x="30" y="94" width="140" height="10" rx="5" fill="#e8452c"/>
        ${o.fire?`<path d="M44 92c6-10 14-6 12-16 10 6 8 14 14 14 2-8 8-10 8-18 10 10 8 20 18 20" stroke="#ff9a3c" stroke-width="3" fill="none" opacity=".0"/>`:""}
        <path d="M30 94c0-40 30-60 70-60s70 20 70 60z" fill="url(#${g}b)"/><path d="M48 78c6-20 26-32 52-32" stroke="#ffe0a8" stroke-width="6" fill="none" stroke-linecap="round" opacity=".55"/>
        <g fill="#fff3d6">${Array.from({length:12},(_,i)=>`<ellipse cx="${55+(i%6)*18}" cy="${58+Math.floor(i/6)*16+(i%2)*4}" rx="3" ry="1.6"/>`).join("")}</g>
        ${o.fire?`<g><path d="M150 40c8 10 2 16 8 22 4-6 10-8 8-18 8 8 10 24-2 32-10 6-24 0-24-12 0-8 6-12 10-24z" fill="#ff6a2c"/><path d="M156 58c4 4 2 8 6 10 2-4 4-4 4-10 4 6 2 14-4 16-6 2-10-2-10-6 0-4 2-6 4-10z" fill="#ffd25a"/></g>`:""}</svg>`;},
    wrapBurger(){ return ART.shawarma({meat:"#7a3a18"}); },
    nuggets(){ let n=""; [[70,120],[110,126],[90,96],[132,100],[58,90],[118,72]].forEach(([x,y],i)=>{n+=`<g transform="rotate(${i*31} ${x} ${y})"><path d="M${x-22} ${y}c0-14 10-20 24-18s22 8 20 18-10 16-24 14-20-4-20-14z" fill="#d9902e"/><path d="M${x-14} ${y-6}c6-6 14-6 20-2" stroke="#ffd48a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>${Array.from({length:6},(_,k)=>`<circle cx="${x-12+k*5}" cy="${y+2+(k%2)*5}" r="1.4" fill="#9a5414"/>`).join("")}</g>`;});
      return `<svg viewBox="0 0 200 200">${shadow(170,70)}${n}<ellipse cx="150" cy="150" rx="22" ry="14" fill="#e8452c"/><ellipse cx="146" cy="146" rx="10" ry="5" fill="#ff8a6c" opacity=".7"/></svg>`;},
    fries(){ const g=id("fr"); let f=""; for(let i=0;i<11;i++){const x=56+i*8.5,h=56+((i*37)%30),rot=-12+i*2.4;f+=`<rect x="${x}" y="${92-h}" width="9" height="${h+40}" rx="2" transform="rotate(${rot} ${x} 120)" fill="${i%2?'#ffd25a':'#f4b63a'}"/>`;}
      return `<svg viewBox="0 0 200 200"><defs><linearGradient id="${g}b" x1="0" x2="1"><stop offset="0" stop-color="#9e1f14"/><stop offset=".5" stop-color="#e8452c"/><stop offset="1" stop-color="#8a1a10"/></linearGradient></defs>
        ${shadow(184,52)}${f}<path d="M50 96h100l-12 86H62z" fill="url(#${g}b)"/><path d="M84 120c6 12 26 12 32 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
        <path d="M86 136l6-12 4 10 6-12 4 12 6-10" stroke="#ffd25a" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;},
    shrimp(){ let s=""; [[70,90,0],[124,86,40],[96,128,-30],[140,130,70]].forEach(([x,y,r])=>{s+=`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-24 0a24 24 0 1 1 30 22l-6-10a12 12 0 1 0-14-14z" fill="#e88a3a"/><path d="M-20-6a20 20 0 0 1 30-10" stroke="#ffc07a" stroke-width="3" fill="none" opacity=".7"/>${[0,1,2,3].map(k=>`<path d="M${-18+k*8} ${-14+k*2}l4 6" stroke="#b5571c" stroke-width="2"/>`).join("")}<path d="M6 22l8 10-12-2z" fill="#ff6a3a"/></g>`;});
      return `<svg viewBox="0 0 200 200">${shadow(176,72)}${s}<path d="M150 50l12 8-14 2z" fill="#ffe14a"/><ellipse cx="54" cy="148" rx="16" ry="10" fill="#f7f1e2"/></svg>`;},
    falafel(){ let s=""; [[68,110],[104,96],[138,116],[84,140],[120,144],[100,124]].forEach(([x,y],i)=>{s+=`<circle cx="${x}" cy="${y}" r="20" fill="#7a4a1c"/><circle cx="${x}" cy="${y}" r="20" fill="url(#ff)"/>${Array.from({length:7},(_,k)=>`<circle cx="${x-10+((k*7)%20)}" cy="${y-10+((k*11)%20)}" r="1.6" fill="${k%2?'#4a7a2a':'#c48a3a'}"/>`).join("")}`;});
      return `<svg viewBox="0 0 200 200"><defs><radialGradient id="ff" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#d9a04a"/><stop offset="1" stop-color="#5a2e0e" stop-opacity=".9"/></radialGradient></defs>${shadow(174,72)}${s}<g fill="#8fd16a"><path d="M40 70c10-12 24-10 26 2-10 6-20 6-26-2z"/><path d="M150 70c8-10 22-8 22 2-8 6-18 6-22-2z"/></g></svg>`;},
    sticks(){ let s=""; for(let i=0;i<5;i++){const y=70+i*20;s+=`<g transform="rotate(${-18+i*6} 100 ${y})"><rect x="40" y="${y-9}" width="120" height="18" rx="9" fill="#e3a23e"/>${Array.from({length:14},(_,k)=>`<circle cx="${46+k*8.5}" cy="${y-3+(k%2)*5}" r="1.5" fill="#a5601a"/>`).join("")}<rect x="150" y="${y-7}" width="12" height="14" rx="6" fill="#fff4c2"/></g>`;}
      return `<svg viewBox="0 0 200 200">${shadow(180,70)}${s}</svg>`;}
  };
  window.ART = ART;
})();

/* [название, порция/описание, цена, иллюстрация, хит, опции иллюстрации] */
window.MENU = [
  { id:"shaverma", title:"Шаверма", items:[
    ["Золотой стандарт","Классика: курица на углях, свежие овощи, фирменный соус",329,"shawarma",true],
    ["Традиционная","Та самая, с которой начинают знакомство",329,"shawarma"],
    ["Мини","Когда хочется перекусить",239,"shawarma"],
    ["Коронная","Фирменный рецепт Леса",419,"shawarma",true],
    ["Лесная с грибами","С грибами — как из чащи",449,"shawarma",false,{acc:"#a87a4a",acc2:"#6cbf4a"}],
    ["Огнезмей","Для тех, кто любит с огоньком",449,"shawarma",true,{acc:"#ff3a1c",acc2:"#ffb02c"}],
    ["Охотничья с колбасками","С охотничьими колбасками",449,"shawarma",false,{meat:"#7a2a14"}],
    ["4 сыра","Четыре сыра и тянучка",519,"shawarma",false,{acc:"#ffd25a",acc2:"#ffe38a"}],
    ["Боярская с беконом","С хрустящим беконом",519,"shawarma",false,{meat:"#b04a3a"}],
    ["Царская с креветкой","С креветками — по-царски",569,"shawarma",false,{meat:"#ff8a5c"}],
    ["Мраморная гриль","Мраморная говядина на гриле",599,"shawarma",true,{meat:"#6a2410"}],
    ["Рваная свинина","Томлёная рваная свинина",599,"shawarma",false,{meat:"#8a3c1c"}],
    ["Вегетарианская с фалафелем","Фалафель и много овощей",339,"shawarma",false,{meat:"#b0702a",acc2:"#4ab04a"}]
  ]},
  { id:"plate", title:"Шаверма на тарелке", items:[
    ["Стандартная","Мясо, картофель фри, овощи и соус на тарелке",519,"plate"],
    ["Богатырская","Порция для богатыря",599,"plate",true,{meat:"#7a3414"}],
    ["Царская с креветкой","С креветками",649,"plate",false,{shrimp:true}],
    ["Рваная свинина","С томлёной рваной свининой",619,"plate",false,{meat:"#8a3c1c"}],
    ["Вегетарианская с фалафелем","С фалафелем",519,"plate",false,{veg:true}]
  ]},
  { id:"burgers", title:"Бургеры", items:[
    ["Горыныч бургер","Огненный — трёхголовый не дремлет",529,"burger",true,{fire:true}],
    ["Традиционный бургер","Котлета, овощи, соус",459,"burger"],
    ["Сырный бургер","С расплавленным сыром",539,"burger",false,{cheese:true}],
    ["Заморский бургер","Рецепт из-за моря",589,"burger",false,{cheese:true,pat:"#4a2010"}],
    ["Бургер в тортилье","Всё как в бургере, но в тортилье",619,"shawarma",false,{meat:"#6a2a10"}],
    ["Куриный бургер","С куриной котлетой",359,"burger",false,{pat:"#c07a2a"}]
  ]},
  { id:"snacks", title:"Закуски", items:[
    ["Картофель фри","Хрустящий, золотистый",179,"fries",true],
    ["Наггетсы","Куриные, с соусом",199,"nuggets"],
    ["Фалафель","Нутовые шарики",229,"falafel"],
    ["Сырные палочки","Тянутся как надо",319,"sticks"],
    ["Креветки","В хрустящей панировке",419,"shrimp"]
  ]}
];
