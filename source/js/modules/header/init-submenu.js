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
  scrollLock.enablePageScroll();
};

const mouseOutHandler = (evt) => {
  console.log(evt.relatedTarget);
  if (evt.relatedTarget.closest('[data-sub-menu="wrapper"]')) {
    return;
  }

  getCloseMenu();
  subMenuWrapper.removeEventListener('mouseout', mouseOutHandler);
  setTimeout(() => {
    delay = null;
  }, 2000);
};

const initSubmenu = () => {
  subMenuLink.addEventListener('mouseover', () => {
    if (breakpoint.matches) {
      return;
    }
    getOpenMenu();
    subMenuWrapper.addEventListener('mouseout', mouseOutHandler);
  });
};

export {initSubmenu};
