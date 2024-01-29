import Swiper, {Pagination, Navigation, Autoplay} from 'swiper';

let heroSlider = null;

const initHeroSlider = () => {
  const parent = document.querySelector('[data-hero-slider="parent"]');

  if (!parent) {
    return;
  }

  const nextButton = parent.querySelector('[data-hero-slider="next"]');
  const prevButton = parent.querySelector('[data-hero-slider="prev"]');
  const paginationEl = parent.querySelector('[data-hero-slider="pagination"]');

  heroSlider = new Swiper(parent, {
    speed: 600,
    pagination: {
      el: paginationEl,
      clickable: false,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    rewind: true,
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
      autoplayTimeLeft(s, time, progress) {
        parent.style.setProperty('--progress', `${(progress * 100).toFixed(2)}%`);
      },
    },
    breakpoints: {
      1023: {
        allowTouchMove: false,
      },
    },
    modules: [Pagination, Navigation, Autoplay],
  });
};

export {initHeroSlider, heroSlider};
