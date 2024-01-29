import {resizeObserver} from '../../utils/observers.js';
import {PageMenu} from './PageMenu.js';
import {setHeaderHeight} from './set-header-height.js';

const initPageMenu = () => {
  const pageMenu = new PageMenu();
  pageMenu.init();
};

const initHeaderHeight = () => {
  resizeObserver.subscribe(setHeaderHeight);
  setHeaderHeight();
};

export default {
  initPageMenu,
  initHeaderHeight,
};
