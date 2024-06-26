import {modals} from './modals/init-modals.js';

const breakpoint = window.matchMedia('(max-width:767px)');

const modalCartButtonClickHandler = (e) => {
  if (breakpoint.matches) {
    return;
  }
  e.preventDefault();
  modals.open('cart');
};

const cartAddButtonClickHandler = (e) => {
  e.preventDefault();
  const {target} = e;
  const button = target.closest('[data-cart-button="add"]');
  const parent = target.closest('[data-cart-button="parent"]');
  button?.classList.add('is-added');
  parent?.classList.add('is-added');
};

const cartRemoveButtonClickHandler = (e) => {
  e.preventDefault();
  const {target} = e;
  const parent = target.closest('[data-cart-button="parent"]') || target;
  const button = parent?.querySelector('[data-cart-button="add"]');
  parent.classList?.remove('is-added');
  button.classList?.remove('is-added');
};

const initCartButtons = () => {
  const modalCartButtons = document.querySelectorAll('[data-cart-button="modal"]');
  const cartAddButtons = document.querySelectorAll('[data-cart-button="add"]');
  const cartRemoveButtons = document.querySelectorAll('[data-cart-button="remove"]');

  if (modalCartButtons.length) {
    modalCartButtons.forEach((button) => {
      button.addEventListener('click', modalCartButtonClickHandler);
    });
  }

  if (cartAddButtons.length) {
    cartAddButtons.forEach((button) => {
      button.addEventListener('click', cartAddButtonClickHandler);
    });
  }

  if (cartRemoveButtons.length) {
    cartRemoveButtons.forEach((button) => {
      button.addEventListener('click', cartRemoveButtonClickHandler);
    });
  }
};

export {initCartButtons};
