const initDeliveryForm = () => {
  const parent = document.querySelector('[data-delivery-form="parent"]');

  if (!parent) {
    return;
  }

  const form = parent.querySelector('[data-delivery-form="form"]');

  parent.addEventListener('tabOpen', ({detail}) => {
    parent.setAttribute('data-current-tab', detail.currentIndex);
    form.classList.toggle('is-hidden', detail.currentIndex !== '0');
  });
};

export {initDeliveryForm};
