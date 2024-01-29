import Swiper, {Navigation, Thumbs, FreeMode, Pagination} from 'swiper';
import {modals} from '../modals/init-modals.js';

const thumbsSliderSettings = {
  direction: 'vertical',
  spaceBetween: 12,
  slidesPerView: 'auto',
  freeMode: true,
  watchSlidesProgress: true,
  modules: [FreeMode],
};

const getGallerySliderSettings = (parent, thumbs) => {
  const nextButton = parent.querySelector('[data-gallery-slider="next"]');
  const prevButton = parent.querySelector('[data-gallery-slider="prev"]');
  const paginationEl = parent.querySelector('[data-gallery-slider="pagination"]');
  return {
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      el: paginationEl,
      clickable: false,
    },
    thumbs: {
      swiper: thumbs,
    },
    on: {
      init(s) {
        s.emit('slideChange', s);
      },
      slideChange({slides, activeIndex}) {
        Array.prototype.forEach.call(slides, (slide, idx) => {
          const video = slide.querySelector('video');
          if (!video) {
            return;
          }
          if (idx === activeIndex) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
    },
    breakpoints: {
      1023: {
        allowTouchMove: false,
      },
    },
    modules: [Thumbs, Navigation, Pagination],
  };
};

const initSwiper = (parent) => {
  const sliderEl = parent.querySelector('[data-gallery-slider="slider"]');
  const thumbsEl = parent.querySelector('[data-gallery-slider="thumbs"]');
  const thumbs = new Swiper(thumbsEl, thumbsSliderSettings);

  return new Swiper(sliderEl, getGallerySliderSettings(parent, thumbs));
};

const initGallerySlider = () => {
  const gallerySliderParent = document.querySelector('[data-gallery-slider="parent"]');

  if (!gallerySliderParent) {
    return;
  }

  const modalSliderParent = document.querySelector('[data-gallery-slider="modal"]');

  const gallerySlider = initSwiper(gallerySliderParent);
  const modalSlider = initSwiper(modalSliderParent);

  gallerySlider.on('click', (s, {target}) => {
    if (!target?.closest('.swiper-slide')) {
      return;
    }
    modals.open('gallery');
    modalSlider.slideTo(s.activeIndex, 0);
    modalSlider.update();
  });
};

export {initGallerySlider};
