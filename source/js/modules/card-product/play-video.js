const getPlayVideo = () => {
  const cardProducts = document.querySelectorAll('[data-card-product]');
  const breakpoint = window.matchMedia('(min-width: 1024px)');

  cardProducts.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (!breakpoint.matches) {
        return;
      }
      const video = card.querySelector('video');
      if (!video) {
        return;
      }
      card.classList.add('play');
      video.play();
      card.addEventListener('mouseleave', () => {
        video.pause();
        card.classList.remove('play');
      }, {once: true});
    });
  });
};

export {getPlayVideo};
