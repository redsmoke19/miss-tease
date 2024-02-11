import scrollLock from '../../vendor/scroll-lock.min.js';

const breakpoint = window.matchMedia('(max-width:1023px)');
const subMenu = document.querySelector('[data-sub-menu="parent"]');
const navLinks = document.querySelectorAll('[data-nav-link]');
const subMenuLink = document.querySelector('[data-sub-menu="link"]');
const subMenuWrapper = document.querySelector('[data-sub-menu="wrapper"]');
let delay = null;
let isHovered = false;

const setNavLinkMouseEnterListeners = () => {
  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', closeMenu);
  });
};

const removeNavLinkMouseEnterListeners = () => {
  navLinks.forEach((link) => {
    link.removeEventListener('mouseenter', closeMenu);
  });
};

const openMenu = () => {
  if (subMenu.classList.contains('is-active') || delay) {
    return;
  }
  delay = 2;
  subMenu.classList.add('is-active');
  setNavLinkMouseEnterListeners();
  scrollLock.disablePageScroll();
};

const closeMenu = () => {
  subMenu.classList.remove('is-active');
  subMenuWrapper.removeEventListener('mouseout', mouseOutHandler);
  removeNavLinkMouseEnterListeners();
  setTimeout(() => {
    delay = null;
  }, 1000);

  setTimeout(() => {
    scrollLock.enablePageScroll();
  }, 600);
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
      subMenuWrapper.addEventListener('mouseout', mouseOutHandler);
    }
  }, 300);
};

const mouseOutHandler = (evt) => {
  if (evt.relatedTarget.closest('[data-sub-menu="wrapper"]')) {
    return;
  }

  closeMenu();
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    delay = null;
    subMenu.classList.remove('is-active');
    scrollLock.enablePageScroll();
    subMenuWrapper.removeEventListener('mouseout', mouseOutHandler);
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
