const form = document.querySelector('[data-order="form"]');
const blocks = form?.querySelectorAll('[data-order="block"]');
const submitButton = form?.querySelector('[data-order="submit"]');
const nextButtons = form?.querySelectorAll('[data-order="next"]');
const editButtons = form?.querySelectorAll('[data-order="edit"]');
let step = 1;

const clearBlocks = (index) => {
  blocks.forEach((block, idx) => {
    if (idx + 1 === index) {
      block.classList.remove('is-filled');
    }
    if (idx + 1 > index) {
      block.classList.remove('is-active');
      block.classList.remove('is-filled');
    }
  });
};

const blockSubmitButton = () => {
  if (!submitButton) {
    return;
  }
  submitButton.disabled = step !== blocks.length;
}

const nextButtonClickHandler = (button, evt) => {
  evt.preventDefault();
  const currentBlock = button.closest('[data-order="block"]');
  const isValid = window.form.validateForm({
    type: 'submit',
    target: currentBlock,
  });
  if (!isValid) {
    return;
  }
  currentBlock.classList.add('is-filled');
  step++;
  blockSubmitButton();
  const nextBlock = Array.prototype.find.call(blocks, (block) => Number(block.dataset.step) === step);
  nextBlock.classList.add('is-active');
};

const editButtonClickHandler = (button, evt) => {
  evt.preventDefault();
  const currentBlock = button.closest('[data-order="block"]');
  clearBlocks(Number(currentBlock.dataset.step));
  step = Number(currentBlock.dataset.step);
  blockSubmitButton();
};

const initPlacingOrder = () => {
  if (!form) {
    return;
  }
  nextButtons.forEach((button) => {
    button.addEventListener('click', nextButtonClickHandler.bind(null, button));
  });

  editButtons.forEach((button) => {
    button.addEventListener('click', editButtonClickHandler.bind(null, button));
  });
};

export default initPlacingOrder;
