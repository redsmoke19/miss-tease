const priceLink = document.querySelector('[data-header-price="link"]');
const priceContent = document.querySelector('[data-header-price="content"]');
// const priceClose = document.querySelector('[data-header-price="close"]');
// const body = document.body;

const initPrice = () => {
  if (!priceLink) {
    return;
  }

  const onDocumentClick = (evt) => {
    const target = evt.target;
    if (target.closest('[data-header-price="content"]') && !target.closest('[data-header-price="close"]') || target.closest('[data-header-price="link"]')) {
      return;
    }
    closeMenu();
  };
  const openMenu = () => {
    priceContent.classList.add('is-active');
    document.addEventListener('click', onDocumentClick);
  };

  const closeMenu = () => {
    priceContent.classList.remove('is-active');
    document.removeEventListener('click', onDocumentClick);
  };

  priceLink.addEventListener('click', () => {
    openMenu();
  });
};

export {initPrice};
