const counterClickHandler = ({target}) => {
  if (!target.closest('[data-counter="increase"]') && !target.closest('[data-counter="decrease"]')) {
    return;
  }

  const counter = target.closest('[data-counter="element"]');
  const counterValue = counter.querySelector('[data-counter="value"]');
  const decreaseButton = counter.querySelector('[data-counter="decrease"]');

  let value = Number(counterValue.textContent);

  if (target.closest('[data-counter="increase"]')) {
    value++;
  }

  if (target.closest('[data-counter="decrease"]')) {
    value--;
  }

  decreaseButton.disabled = value <= 1;
  counterValue.textContent = value;
};

const initCounters = () => {
  const elements = document.querySelectorAll('[data-counter="element"]');

  if (!elements.length) {
    return;
  }

  elements.forEach((element) => {
    element.addEventListener('click', counterClickHandler);
  });
};

export {initCounters};
