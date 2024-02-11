import Swiper, {Navigation} from 'swiper';


const initShowMoreSlider = () => {
  const parent = document.querySelectorAll('[data-show-more-slider="parent"]');

  if (!parent.length) {
    return;
  }

  parent.forEach((item) => {
    const nextButton = item.querySelector('[data-show-more-slider="next"]');
    const prevButton = item.querySelector('[data-show-more-slider="prev"]');

    const showMoreSlider = new Swiper(item, {
      slidesPerView: 'auto',
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
  });
};

export {initShowMoreSlider};
