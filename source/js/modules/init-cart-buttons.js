import {modals} from './modals/init-modals.js';

const breakpoint = window.matchMedia('(max-width:767px)');

const cartButtonClickHandler = (e) => {
  if (breakpoint.matches) {
    return;
  }
  e.preventDefault();
  modals.open('cart');
};

const initCartButtons = () => {
  const cartButtons = document.querySelectorAll('[data-cart-button]');

  if (!cartButtons.length) {
    return;
  }

  cartButtons.forEach((button) => {
    button.addEventListener('click', cartButtonClickHandler);
  });
};

export {initCartButtons};
