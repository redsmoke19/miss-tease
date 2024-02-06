const initDeliveryForm = () => {
  const parent = document.querySelector('[data-delivery-form="parent"]');

  if (!parent) {
    return;
  }

  const form = parent.querySelector('[data-delivery-form="form"]');
  const requiredFields = form.querySelectorAll('[data-required]');

  parent.addEventListener('tabOpen', ({detail}) => {
    parent.setAttribute('data-current-tab', detail.currentIndex);
    const currentIndex = Number(detail.currentIndex);
    if (currentIndex > 0) {
      form.classList.add('is-hidden');
      requiredFields.forEach((field) => {
        field.removeAttribute('data-required');
      });
    } else {
      form.classList.remove('is-hidden');
      requiredFields.forEach((field) => {
        field.setAttribute('data-required', '');
      });
    }
  });
};

export {initDeliveryForm};
