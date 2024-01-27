import Swiper, {Pagination} from 'swiper';

let slider = null;
const breakpoint = window.matchMedia('(min-width: 1024px)');
const initProductSlider = () => {
  const parent = document.querySelector('[data-product-slider="parent"]');

  if (!parent) {
    return;
  }

  const paginationEl = parent.querySelector('[data-product-slider="pagination"]');
  const slides = parent.querySelectorAll('.swiper-slide');

  slides.forEach((slide) => {
    slide.addEventListener('mouseenter', () => {
      if (!breakpoint.matches) {
        return;
      }
      const video = slide.querySelector('video');
      if (!video) {
        return;
      }
      slide.classList.add('play');
      video.play();
      slide.addEventListener('mouseleave', () => {
        video.pause();
        slide.classList.remove('play');
      }, {once: true});
    });
  });

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      slider?.destroy(true, true);
      slider = null;
    } else {
      slider = new Swiper(parent, {
        pagination: {
          el: paginationEl,
          clickable: false,
        },
        on: {
          init(s) {
            s.emit('slideChange', s);
          },
          slideChange({slides: swiperSlides, activeIndex}) {
            Array.prototype.forEach.call(swiperSlides, (slide, idx) => {
              const video = slide.querySelector('video');
              if (!video) {
                return;
              }
              if (idx === activeIndex) {
                slide.classList.add('play');
                video.play();
              } else {
                slide.classList.remove('play');
                video.pause();
              }
            });
          },
        },
        modules: [Pagination],
      });
    }
  };

  breakpoint.addEventListener('change', breakpointChecker);
  breakpointChecker();
};

export {initProductSlider};
