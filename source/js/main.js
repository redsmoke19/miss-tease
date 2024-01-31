import {mobileVhFix} from './utils/mobile-vh-fix.js';
import {initModals} from './modules/modals/init-modals';
import headerInit from './modules/header/index.js';
import cardProduct from './modules/card-product/init-product-card.js';
import {Form} from './modules/form-validate/form';
import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';
import {initAccordions} from './modules/accordions/init-accordion.js';
import {initCounters} from './modules/init-counters.js';
import {initCustomInputs} from './modules/init-custom-inputs.js';
import {initDynamicAdaptive} from './modules/init-dynamic-adaptive.js';
import {initTabs} from './modules/tabs/init-tabs.js';
import {initSelects} from './modules/select/init-selects.js';
import initSliders from './modules/sliders/index.js';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  mobileVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    initDynamicAdaptive();
    uploadFile();
    uploadImageDrop();
    initSelects();
    const form = new Form();
    window.form = form;
    form.init();
    headerInit.initPageMenu();
    headerInit.initHeaderHeight();
    headerInit.initSubmenu();
    cardProduct.getPlayVideo();
    initAccordions();
    initTabs();
    initCounters();
    initCustomInputs();
    initSliders();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
