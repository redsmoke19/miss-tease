import scrollLock from '../../vendor/scroll-lock.min.js';

const breakpoint = window.matchMedia('(max-width:1023px)');
const subMenu = document.querySelector('[data-sub-menu="parent"]');
const subMenuLink = document.querySelector('[data-sub-menu="link"]');
const subMenuWrapper = document.querySelector('[data-sub-menu="wrapper"]');
let delay = null;
let isHovered = false;

const openMenu = () => {
  if (subMenu.classList.contains('is-active') || delay) {
    return;
  }
  delay = 2;
  subMenu.classList.add('is-active');
  scrollLock.disablePageScroll();
};

const closeMenu = () => {
  subMenu.classList.remove('is-active');
};

const mouseLeaveHandler = () => {
  isHovered = false;
};

const mouseEnterHandler = () => {
  isHovered = true;
  subMenuLink.addEventListener('mouseleave', mouseLeaveHandler, {once: true});
};

const mouseInHandler = () => {
  setTimeout(() => {
    if (isHovered) {
      openMenu();
      document.addEventListener('mousemove', mouseMoveHandler);
    }
  }, 300);
};

const mouseMoveHandler = (evt) => {
  if (evt.target.closest('[data-sub-menu="wrapper"]') || evt.target.closest('[data-sub-menu="link"]')) {
    return;
  }

  closeMenu();
  document.removeEventListener('mousemove', mouseMoveHandler);
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
    subMenuWrapper.removeEventListener('mousemove', mouseMoveHandler);
    subMenuLink.removeEventListener('mouseover', mouseInHandler);
    subMenuLink.removeEventListener('mouseenter', mouseEnterHandler);
  } else {
    subMenuLink.addEventListener('mouseover', mouseInHandler);
    subMenuLink.addEventListener('mouseenter', mouseEnterHandler);
  }
};

const initSubmenu = () => {
  if (!subMenu) {
    return;
  }
  breakpoint.addEventListener('change', breakpointChecker);
  breakpointChecker();
};

export {initSubmenu};
