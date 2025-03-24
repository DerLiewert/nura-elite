// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

//==== displacement .contacts to .nav on (max-width: 479.98px) ============================================================================================================

function displacementHeaderContacts() {
  const contacts = document.querySelector('.header__contacts');
  const nav = document.querySelector('.header__nav');

  if (!contacts || !nav) return;

  const smallMobileMatchMedia = window.matchMedia('(max-width: 479.98px)');
  const onScreenWidthChange = (e) => {
    if (e.matches) {
      nav.insertAdjacentElement('beforeend', contacts);
    } else {
      nav.insertAdjacentElement('beforebegin', contacts);
    }
  };
  smallMobileMatchMedia.addEventListener('change', onScreenWidthChange);
  onScreenWidthChange(smallMobileMatchMedia);
}

displacementHeaderContacts();

//==== Open menu on burgerClick ====================================================================================================================================================
function closeMenu() {
  document.documentElement.classList.remove('menu-open');
  document.documentElement.classList.remove('lock');
  document.querySelector('.burger').setAttribute('aria-label', 'Открыть меню');
}
function openMenu() {
  document.documentElement.classList.add('menu-open');
  document.documentElement.classList.add('lock');
  document.querySelector('.burger').setAttribute('aria-label', 'Закрыть меню');
}

function initBurger() {
  const burger = document.querySelector('.burger');
  if (!burger) return;

  burger.addEventListener('click', () => {
    if (document.documentElement.classList.contains('menu-open')) {
      closeMenu();
    } else {
      // поскольку header не absolute, а высота nav при открытии навигаци 100vw - 100% (высота header)
      // то при открытии меню при неполной прокрутке страницы вверх под nav будет пустое пространство
      // в зависимости от того насколько прокручен header. Поэтому делаем скрол вверх страницы
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      openMenu();
    }
  });

  const pcMatchMedia = window.matchMedia('(min-width: 991.98px)');
  const onScreenWidthChange = (e) => {
    if (e.matches) closeMenu();
  };
  pcMatchMedia.addEventListener('change', onScreenWidthChange);
  onScreenWidthChange(pcMatchMedia);
}

initBurger();

//==== Go to block on menu link click ====================================================================================================================================================
function goto() {
  // data-goto - указать ID / класс блока
  const gotoLinks = document.querySelectorAll('[data-goto]');
  if (!gotoLinks.length) return;

  gotoLinks.forEach((gotoLink) => {
    gotoLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu(); // если на мобильных устройствах

      const gotoElement = document.querySelector(gotoLink.dataset.goto);
      if (!gotoElement) return;

      window.scrollTo({
        top: gotoElement.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      });
    });
  });
}

goto();

//===== Hide or show go-top-btn, when .intro block is vissible or not ===================================================================================================================================================
let goTopObserver = new IntersectionObserver((entries) => {
  const goTopBtn = document.querySelector('.go-top-btn');
  if (!goTopBtn) return;

  if (entries[0].isIntersecting) {
    goTopBtn.classList.add('_hide');
  } else {
    goTopBtn.classList.remove('_hide');
  }
}, {});

goTopObserver.observe(document.querySelector('.intro'));

//===== Open img in a popup in full size ===================================================================================================================================================
function zoomImage() {
  const zoomImgs = document.querySelectorAll('[data-zoom]');
  const zoomBlock = document.querySelector('.zoom-image');
  const zoomImage = document.querySelector('.zoom-image img');

  if (!zoomImgs.length || !zoomBlock || !zoomImage) return;

  zoomImgs.forEach((img) => {
    img.addEventListener('click', () => {
      zoomImage.setAttribute('src', img.getAttribute('src'));
      zoomImage.setAttribute('alt', img.getAttribute('alt'));
      document.documentElement.classList.add('lock');
      document.documentElement.classList.add('zoom-open');
    });
  });

  zoomBlock.addEventListener('click', (e) => {
    if (e.target.closest('.zoom-image__body')) return;
    zoomImage.setAttribute('src', '');
    zoomImage.setAttribute('alt', '');
    document.documentElement.classList.remove('zoom-open');
    document.documentElement.classList.remove('lock');
  });
}

zoomImage();
