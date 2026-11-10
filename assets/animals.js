/* Мультяшные лесные жители «Леса»: SVG с обводкой, моргающие глаза.
   ANIMAL(name) → строка <svg>. Глаза в группе .eyes (моргание через CSS). */
(function(){
  const OL = "#13241a";             // обводка
  const st = `stroke="${OL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const eye = (x,y,r=4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${OL}"/><circle cx="${x+1.2}" cy="${y-1.3}" r="${r*.34}" fill="#fff"/>`;
  const blush = (x,y) => `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="2.6" fill="#f08a7e" opacity=".75"/>`;
  const wrap = (body, cls) => `<svg class="critter ${cls}" viewBox="0 0 120 120" aria-hidden="true">${body}</svg>`;

  const A = {
    /* лиса — шаверма */
    fox: () => wrap(`
      <path d="M74 98c22 4 38-10 34-30-2-10-10-14-14-12 4 10-2 22-22 26z" fill="#e8743a" ${st}/>
      <path d="M100 58c6 2 10 8 8 14-6-2-9-6-8-14z" fill="#fbf4e6" ${st}/>
      <path d="M40 112c-4-22 4-38 20-38s24 16 20 38z" fill="#e8743a" ${st}/>
      <path d="M50 112c-2-14 3-26 10-26s12 12 10 26z" fill="#fbf4e6"/>
      <path d="M28 40 40 12l14 20h12l14-20 12 28c2 18-12 34-32 38-20-4-34-20-32-38z" fill="#e8743a" ${st}/>
      <path d="M37 33l4-12 7 10zM83 33l-4-12-7 10z" fill="${OL}"/>
      <path d="M30 46c6 12 16 20 30 32 14-12 24-20 30-32-8 6-18 8-30 8s-22-2-30-8z" fill="#fbf4e6" ${st}/>
      <g class="eyes">${eye(46,44)}${eye(74,44)}</g>${blush(40,54)}${blush(80,54)}
      <ellipse cx="60" cy="62" rx="5" ry="3.6" fill="${OL}"/>
      <path d="M55 68c3 3 7 3 10 0" fill="none" ${st} stroke-width="2.4"/>
      <ellipse cx="50" cy="112" rx="7" ry="4" fill="#3a2418"/><ellipse cx="70" cy="112" rx="7" ry="4" fill="#3a2418"/>`, "fox"),

    /* сова — бургеры (как в макете на доске «Бургеры») */
    owl: () => wrap(`
      <path d="M6 108c30-6 76-6 108 0" fill="none" stroke="#6b4a33" stroke-width="6" stroke-linecap="round"/>
      <path d="M96 106c6-8 14-8 18-4-6 4-12 6-18 4z" fill="#8fbf8a" ${st} stroke-width="2"/>
      <path d="M30 62c0-26 14-40 30-40s30 14 30 40c0 26-12 42-30 42S30 88 30 62z" fill="#8fbf8a" ${st}/>
      <path d="M36 36 30 14l18 12zM84 36l6-22-18 12z" fill="#8fbf8a" ${st}/>
      <path d="M44 78c10 16 22 16 32 0-4 20-28 20-32 0z" fill="#d7ecd0"/>
      <path d="M50 84l4 4 4-4M62 84l4 4 4-4M56 94l4 4 4-4" fill="none" ${st} stroke-width="2"/>
      <circle cx="47" cy="50" r="14" fill="#fbf4e6" ${st}/><circle cx="73" cy="50" r="14" fill="#fbf4e6" ${st}/>
      <g class="eyes">${eye(48,51,6)}${eye(72,51,6)}</g>
      <path d="M55 60h10l-5 10z" fill="#f2b33a" ${st} stroke-width="2.4"/>
      <path d="M30 64c-8 12-6 28 6 34M90 64c8 12 6 28-6 34" fill="none" ${st}/>
      <path d="M50 104v6M56 104v6M64 104v6M70 104v6" ${st} stroke="#f2b33a" stroke-width="3"/>`, "owl"),

    /* ёжик — закуски (с грибочком на спине) */
    hedgehog: () => wrap(`
      <path d="M30 96 26 78l12 2-2-16 13 7 1-17 11 11 7-15 6 15 12-8v15l13-2-4 13 12 4-9 11z" fill="#6b4a33" ${st}/>
      <path d="M12 90c4-12 16-22 30-20 12 2 18 14 16 26H22c-6-1-10-3-10-6z" fill="#f1dcb8" ${st}/>
      <circle cx="12" cy="89" r="4" fill="${OL}"/>
      <g class="eyes">${eye(30,82,3.6)}</g>${blush(38,90)}
      <path d="M24 96c3 2 6 2 8 0" fill="none" ${st} stroke-width="2"/>
      <ellipse cx="38" cy="98" rx="7" ry="4" fill="#3a2418"/><ellipse cx="84" cy="98" rx="7" ry="4" fill="#3a2418"/>
      <path d="M74 44c0-14 22-14 22 0z" fill="#e5322d" ${st}/><circle cx="80" cy="38" r="2" fill="#fff"/><circle cx="89" cy="40" r="2" fill="#fff"/>
      <path d="M81 44h8v10h-8z" fill="#fbf4e6" ${st} stroke-width="2.4"/>`, "hedgehog"),

    /* медведь-богатырь — тарелочки */
    bear: () => wrap(`
      <path d="M22 118c0-26 16-38 38-38s38 12 38 38z" fill="#9a6a44" ${st}/>
      <ellipse cx="60" cy="104" rx="16" ry="12" fill="#e8cfa6"/>
      <circle cx="30" cy="40" r="11" fill="#9a6a44" ${st}/><circle cx="90" cy="40" r="11" fill="#9a6a44" ${st}/>
      <ellipse cx="60" cy="60" rx="34" ry="30" fill="#9a6a44" ${st}/>
      <path d="M30 42c2-20 14-34 30-38 16 4 28 18 30 38-18-6-42-6-60 0z" fill="#c9ced6" ${st}/>
      <path d="M60 4v-2" ${st}/><path d="M54 4h12" ${st}/>
      <path d="M58 14h4v24h-4z" fill="#9ea4ae"/>
      <ellipse cx="60" cy="72" rx="15" ry="11" fill="#e8cfa6" ${st}/>
      <ellipse cx="60" cy="66" rx="6" ry="4.5" fill="${OL}"/>
      <path d="M60 70v4M54 76c3 3 9 3 12 0" fill="none" ${st} stroke-width="2.4"/>
      <g class="eyes">${eye(46,56)}${eye(74,56)}</g>${blush(40,66)}${blush(80,66)}`, "bear"),

    /* зайчик — супы */
    hare: () => wrap(`
      <path d="M44 50c-8-22-8-42 0-44 8 2 10 22 8 44zM68 50c-2-22 2-42 10-42 8 2 4 24-4 44z" fill="#ece7dc" ${st}/>
      <path d="M45 44c-4-14-4-28 0-30 4 2 4 16 3 30zM71 44c0-14 3-28 7-28 3 2 0 16-3 28z" fill="#f4b5ad"/>
      <ellipse cx="60" cy="104" rx="24" ry="16" fill="#ece7dc" ${st}/>
      <ellipse cx="60" cy="70" rx="27" ry="23" fill="#ece7dc" ${st}/>
      <g class="eyes">${eye(49,66)}${eye(71,66)}</g>${blush(43,76)}${blush(77,76)}
      <path d="M56 74h8l-4 4z" fill="#f08a7e" ${st} stroke-width="2"/>
      <path d="M60 78v4M54 82h12v6H54z" fill="#fff" ${st} stroke-width="2"/><path d="M60 82v6" ${st} stroke-width="2"/>
      <path d="M38 76l-12-2M38 80l-12 2M82 76l12-2M82 80l12 2" ${st} stroke-width="1.6"/>
      <path d="M86 92l16-24" stroke="#c8a46a" stroke-width="5" stroke-linecap="round"/><ellipse cx="104" cy="64" rx="7" ry="5" fill="#c8a46a" ${st} stroke-width="2"/>`, "hare"),

    /* белка — напитки (со стаканчиком кофе) */
    squirrel: () => wrap(`
      <path d="M66 110c30 2 48-24 38-52-8-20-28-22-34-8 14 0 22 14 16 30-4 12-12 18-22 20z" fill="#c9692c" ${st}/>
      <path d="M78 52c8-2 16 4 16 12" fill="none" stroke="#e89a5a" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="52" cy="90" rx="20" ry="22" fill="#d97a36" ${st}/>
      <ellipse cx="50" cy="94" rx="11" ry="14" fill="#fbf4e6"/>
      <path d="M36 40l-4-18 12 12zM60 36l6-16 2 18z" fill="#d97a36" ${st}/>
      <circle cx="50" cy="54" r="18" fill="#d97a36" ${st}/>
      <ellipse cx="42" cy="60" rx="9" ry="7" fill="#fbf4e6"/>
      <g class="eyes">${eye(44,50)}${eye(58,50)}</g>${blush(38,58)}
      <ellipse cx="38" cy="58" rx="3" ry="2.4" fill="${OL}"/>
      <path d="M36 78h18l-2 18H38z" fill="#fbf4e6" ${st} stroke-width="2.4"/><path d="M37 84h16" stroke="#8fbf8a" stroke-width="4"/>
      <path d="M34 76h22" ${st}/><path d="M42 70c-3-4 3-6 0-10M49 70c-3-4 3-6 0-10" fill="none" stroke="#8fbf8a" stroke-width="2.4" stroke-linecap="round"/>`, "squirrel"),

    /* птичка с логотипа — соусы, допы */
    bird: () => wrap(`
      <path d="M14 96c30-4 66-4 96 0" fill="none" stroke="#6b4a33" stroke-width="5" stroke-linecap="round"/>
      <path d="M86 70l26-8-12 16z" fill="#6f9e6a" ${st}/>
      <path d="M26 66c2-20 20-30 38-24 14 4 24 16 22 30-2 14-18 22-36 20-16-2-26-12-24-26z" fill="#8fbf8a" ${st}/>
      <path d="M44 70c8 10 24 10 32 0-4 12-28 14-32 0z" fill="#d7ecd0"/>
      <path d="M58 60c8-6 20-4 22 6" fill="none" ${st}/>
      <circle cx="38" cy="38" r="16" fill="#8fbf8a" ${st}/>
      <path d="M22 38l-12 4 12 4z" fill="#f2b33a" ${st} stroke-width="2.4"/>
      <g class="eyes">${eye(34,35,3.6)}</g>${blush(38,44)}
      <path d="M48 92v6M56 92v6" ${st} stroke="#f2b33a"/>`, "bird")
  };
  window.ANIMAL = n => (A[n] ? A[n]() : "");

  /* рисованная веточка в стиле печатного меню */
  window.BRANCH = (cls="") => `<svg class="branch ${cls}" viewBox="0 0 200 80" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 70C40 60 80 44 120 40s56-14 76-30"/>
    <path d="M40 60c-2-12 6-20 14-22-2 10-6 18-14 22zM70 50c2-14 12-20 20-20-4 10-10 16-20 20zM104 42c4-12 14-16 22-14-6 8-12 12-22 14zM138 34c6-10 16-12 22-8-6 6-14 8-22 8zM164 22c6-6 14-6 18-2-6 4-12 4-18 2z"/>
    <path d="M56 58c10 4 18 12 18 20-8-4-14-10-18-20zM92 46c10 2 18 8 20 16-8-2-16-8-20-16zM128 38c10 0 18 6 20 12-8 0-16-4-20-12z"/></svg>`;
})();
