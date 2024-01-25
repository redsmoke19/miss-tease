const inputFocusHandler = ({target}) => {
  const parent = target.closest('.custom-input');
  if (parent) {
    parent.classList.add('is-active');
  }
};

const inputBlurHandler = ({target}) => {
  if (!target.value.length) {
    const parent = target.closest('.custom-input');
    if (parent) {
      parent.classList.remove('is-active');
    }
  }
};

const initCustomInputs = () => {
  const elements = document.querySelectorAll('.custom-input');

  if (!elements.length) {
    return;
  }

  elements.forEach((element) => {
    const input = element.querySelector('input');
    element.classList.toggle('is-active', !!input.value.length);
    input.addEventListener('focus', inputFocusHandler);
    input.addEventListener('blur', inputBlurHandler);
  });
};

export {initCustomInputs};
