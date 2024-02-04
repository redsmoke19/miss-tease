import Swiper from 'swiper';

let instBlockSlider = null;

const initInstBlockSlider = () => {
  const parent = document.querySelector('[data-inst-block-slider="parent"]');

  if (!parent) {
    return;
  }

  instBlockSlider = new Swiper(parent, {
    slidesPerView: 'auto',
    spaceBetween: '20',
  });
};

export {initInstBlockSlider, instBlockSlider};
