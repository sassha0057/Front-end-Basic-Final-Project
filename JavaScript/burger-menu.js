const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

const body = document.body;
let lastScrollY = 0;
let touchMoveHandler = null;

function lockScroll() {
  // запоминаем позицию
  lastScrollY = window.scrollY || window.pageYOffset;

  // компенсация пропажи скроллбара (на десктопах)
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  if (sbw > 0) body.style.paddingRight = `${sbw}px`;

  // фиксируем body
  body.style.position = 'fixed';
  body.style.top = `-${lastScrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  body.style.overflow = 'hidden';

  // защита от iOS bounce
  touchMoveHandler = (e) => {
    // разрешаем скролл внутри самого меню, но блокируем фон
    if (!menu.contains(e.target)) e.preventDefault();
  };
  document.addEventListener('touchmove', touchMoveHandler, { passive: false });
}

function unlockScroll() {
  document.removeEventListener('touchmove', touchMoveHandler, { passive: false });
  touchMoveHandler = null;

  // снимаем фиксацию
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.width = '';
  body.style.overflow = '';
  body.style.paddingRight = '';

  // возвращаемся туда, где были
  window.scrollTo(0, lastScrollY);
}

function openMenu(){
  menu.classList.add('open');
  menu.setAttribute('aria-hidden','false');
  lockScroll();
}

function closeMenu(){
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden','true');
  unlockScroll();
}

burger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menu.addEventListener('click', (e)=>{ if(e.target===menu) closeMenu(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeMenu(); });