const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

function openMenu(){
  menu.classList.add('open');
  menu.setAttribute('aria-hidden','false');      
}
function closeMenu(){
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden','true');
}

burger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menu.addEventListener('click', (e)=>{ if(e.target===menu) closeMenu(); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeMenu(); });