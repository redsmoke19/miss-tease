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
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    //   pauseOnMouseEnter: true,
    // },
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    rewind: true,
    // on: {
    //   autoplayTimeLeft(s, time, progress) {
    //     parent.style.setProperty('--progress', `${progress * 100}%`);
    //   },
    // },
    breakpoints: {
      1023: {
        allowTouchMove: false,
      },
    },
    modules: [Pagination, Navigation, Autoplay],
  });
};

export {initHeroSlider, heroSlider};
