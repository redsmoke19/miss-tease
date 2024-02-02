import scrollLock from '../../vendor/scroll-lock.min.js';

const breakpoint = window.matchMedia('(max-width:1023px)');
const subMenu = document.querySelector('[data-sub-menu="parent"]');
const subMenuLink = document.querySelector('[data-sub-menu="link"]');
const subMenuWrapper = document.querySelector('[data-sub-menu="wrapper"]');
let delay = null;

const getOpenMenu = () => {
  if (subMenu.classList.contains('is-active') || delay) {
    return;
  }
  delay = 2;
  subMenu.classList.add('is-active');
  scrollLock.disablePageScroll();
};

const getCloseMenu = () => {
  subMenu.classList.remove('is-active');
};

const mouseInHandler = () => {
  getOpenMenu();
  subMenuWrapper.addEventListener('mouseout', mouseOutHandler);
};

const mouseOutHandler = (evt) => {
  if (evt.relatedTarget.closest('[data-sub-menu="wrapper"]')) {
    return;
  }

  getCloseMenu();
  subMenuWrapper.removeEventListener('mouseout', mouseOutHandler);
  setTimeout(() => {
    delay = null;
  }, 1000);

  setTimeout(() => {
    scrollLock.enablePageScroll();
  }, 600);
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    delay = null;
    subMenu.classList.remove('is-active');
    scrollLock.enablePageScroll();
    subMenuWrapper.removeEventListener('mouseout', mouseOutHandler);
    subMenuLink.removeEventListener('mouseover', mouseInHandler);
  } else {
    subMenuLink.addEventListener('mouseover', mouseInHandler);
  }
};

const initSubmenu = () => {
  breakpoint.addEventListener('change', breakpointChecker);
  breakpointChecker();
};

export {initSubmenu};
