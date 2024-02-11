import Swiper, {Navigation} from 'swiper';

let mainCollectionSlider = null;

const initMainCollectionSlider = () => {
  const parent = document.querySelector('[data-main-collection-slider="parent"]');

  if (!parent) {
    return;
  }

  const nextButton = parent.querySelector('[data-main-collection-slider="next"]');
  const prevButton = parent.querySelector('[data-main-collection-slider="prev"]');

  mainCollectionSlider = new Swiper(parent, {
    slidesPerView: 'auto',
    // spaceBetween: '40',
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    breakpoints: {
      1023: {
        // allowTouchMove: false,
      },
    },
    modules: [Navigation],
  });
};

export {initMainCollectionSlider, mainCollectionSlider};
