/* Телефон: страница прокручивается внутри своего блока, а не всем документом.
   Зачем: в Safari на iPhone при прокрутке документа браузер прячет и снова показывает
   адресную строку и нижнюю панель. Высота экрана при этом скачет, и всё закреплённое
   (шапка, нижние кнопки, 3D-фон) дёргается — особенно при прокрутке вверх.
   Когда прокручивается внутренний блок, панели Safari стоят на месте и прыгать нечему.
   Остальные скрипты сайта продолжают пользоваться scrollY, scrollTo и событием scroll —
   здесь они перенаправляются на этот блок. */
(function(){
  if(!matchMedia("(max-width:760px) and (pointer:coarse)").matches) return;
  const body = document.body, html = document.documentElement;

  const css = document.createElement("style");
  css.textContent = `
    html.mscroll,html.mscroll body{height:100%;overflow:hidden;overscroll-behavior:none}
    #page-scroller{position:fixed;inset:0;z-index:1;overflow-x:hidden;overflow-y:auto;
      -webkit-overflow-scrolling:touch;overscroll-behavior-y:contain}`;
  document.head.appendChild(css);

  // в блок переносим всё, кроме закреплённых элементов (шапка, меню, кнопки, окна, 3D-фон)
  const sc = document.createElement("div");
  sc.id = "page-scroller";
  const keep = el => el.tagName === "SCRIPT" || el.tagName === "DIALOG" || el.tagName === "STYLE" ||
                     getComputedStyle(el).position === "fixed";
  [...body.children].filter(el => !keep(el)).forEach(el => sc.appendChild(el));
  const header = document.getElementById("header");
  body.insertBefore(sc, header ? header.nextSibling : body.firstChild);
  html.classList.add("mscroll");
  window.__scroller = sc;

  // scrollY / scrollTo / событие scroll теперь относятся к блоку
  const def = (o, k, get) => { try{ Object.defineProperty(o, k, {configurable:true, get}); }catch(e){} };
  def(window, "scrollY", () => sc.scrollTop);
  def(window, "pageYOffset", () => sc.scrollTop);
  window.scrollTo = function(x, y){ if(typeof x === "object") sc.scrollTo(x); else sc.scrollTo(x || 0, y || 0); };
  window.scrollBy = function(x, y){ if(typeof x === "object") sc.scrollBy(x); else sc.scrollBy(x || 0, y || 0); };
  sc.addEventListener("scroll", () => window.dispatchEvent(new Event("scroll")), {passive:true});

  // прокрутка к элементу с учётом закреплённой шапки
  const goTo = (t, smooth) => {
    const hh = header ? header.getBoundingClientRect().height : 0;
    sc.scrollTo({top: t.getBoundingClientRect().top + sc.scrollTop - hh - 12, behavior: smooth ? "smooth" : "auto"});
  };

  // ссылки вида page.html#id и возврат на прежнее место при «Назад»
  const KEY = "scroll:" + location.pathname;
  addEventListener("pagehide", () => { try{ sessionStorage.setItem(KEY, sc.scrollTop); }catch(e){} });
  requestAnimationFrame(() => {
    const t = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(t){ goTo(t); return; }
    let y = 0; try{ y = +sessionStorage.getItem(KEY) || 0; }catch(e){}
    const nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    if(y && nav && nav.type === "back_forward") sc.scrollTop = y;
  });
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]'); if(!a) return;
    const t = document.getElementById(a.getAttribute("href").slice(1)); if(!t) return;
    e.preventDefault(); goTo(t, true);
  });
  window.dispatchEvent(new Event("scroll"));
})();
