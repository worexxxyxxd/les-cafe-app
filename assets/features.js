/* Особенности заведения (Яндекс Карты → «Особенности») */
(function(){
  const s = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const F = [
    [s('<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>'),"Wi‑Fi","для гостей кафе"],
    [s('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>'),"Карта и наличные","оплачивайте как удобно"],
    [s('<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 9h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3"/>'),"Кофе с собой","и горячий чай"],
    [s('<path d="M10 5.2C10 3.5 8.7 2 7 2S4 3.5 4 5.2 5.3 9 7 9s3-2.1 3-3.8zM20 5.2C20 3.5 18.7 2 17 2s-3 1.5-3 3.2S15.3 9 17 9s3-2.1 3-3.8zM12 11c-3 0-6 4-6 7 0 2 1.5 3 3 3 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.5 0 3-1 3-3 0-3-3-7-6-7z"/>'),"Можно с собакой","и с любыми питомцами"],
    [s('<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4M10 8.5l4 2-4 2z"/>'),"Трансляции","спорт на экране"],
    [s('<path d="M6 8h12l-1 12H7zM9 8V6a3 3 0 0 1 6 0v2"/>'),"Навынос","упакуем в дорогу"],
    [s('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),"Доставка","привезём горячим"],
    [s('<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>'),"Акции и скидки","следите в Telegram"]
  ];
  const root = document.getElementById("feats"); if(!root) return;
  root.innerHTML = F.map((f,i)=>`<div class="feat reveal" data-d="${i%4}"><span class="i">${f[0]}</span><div><b>${f[1]}</b><span>${f[2]}</span></div></div>`).join("");
})();
