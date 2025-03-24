/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, EffectFade, Pagination } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

window.addEventListener('load', function (e) {
  const cottagesSliders = document.querySelectorAll('.cottages .swiper');
  if (cottagesSliders.length) {
    cottagesSliders.forEach((slider) => {
      const cottagesSlider = new Swiper(slider, {
        modules: [Navigation, EffectFade, Pagination],
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 500,
        loop: true,

        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },

        pagination: {
          el: '.cottages__slider-pagination',
          clickable: true,
        },

        navigation: {
          prevEl: slider.querySelector('.cottages__slider-btn.swiper-button_prev'),
          nextEl: slider.querySelector('.cottages__slider-btn.swiper-button_next'),
        },
      });
    });
  }
});
