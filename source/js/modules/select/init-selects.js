import {CustomSelect} from './custom-select.js';

let customSelect;

const initSelects = () => {
  customSelect = new CustomSelect();
  customSelect.init();
};

export {initSelects, customSelect};
