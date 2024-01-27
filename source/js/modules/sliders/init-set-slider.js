import Swiper, {Navigation, Thumbs, FreeMode, Pagination} from 'swiper';

const initSetSlider = () => {
  const parent = document.querySelector('[data-product-slider="parent"]');

  if (!parent) {
    return;
  }

  const sliderEl = parent.querySelector('[data-product-slider="slider"]');
  const thumbsEl = parent.querySelector('[data-product-slider="thumbs"]');
  const nextButton = parent.querySelector('[data-product-slider="next"]');
  const prevButton = parent.querySelector('[data-product-slider="prev"]');
  const paginationEl = parent.querySelector('[data-product-slider="pagination"]');

  const thumbs = new Swiper(thumbsEl, {
    direction: 'vertical',
    spaceBetween: 12,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    modules: [FreeMode],
  });

  const slider = new Swiper(sliderEl, {
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
    breakpoints: {
      1023: {
        allowTouchMove: false,
      },
    },
    modules: [Thumbs, Navigation, Pagination],
  });
};

export {initSetSlider};
