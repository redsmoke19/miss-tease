import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import getHtmlFontSize from '../../utils/get-html-font-size.js';

gsap.registerPlugin(ScrollTrigger);

const defaultFontSize = 16;
const mediaQuery = '(min-width:768px)';
const duration = 0.3;
const ease = 'sine.out';
const mm = gsap.matchMedia();
let currentDirection = 0;

const toggleStickyBlocksClass = (blocks = [], value, height) => {
  if (!blocks.length) {
    return;
  }
  gsap.to(blocks, {
    top(idx, target) {
      const fontSize = getHtmlFontSize();
      const scalePercent = fontSize / defaultFontSize;
      const top = Number(target.dataset.top);
      return value ? height + (top * scalePercent) : top * scalePercent;
    },
    duration,
    ease,
  });
};

const showHeader = (header, blocks, direction) => {
  setTimeout(() => {
    if (currentDirection !== direction) {
      return;
    }
    toggleStickyBlocksClass(blocks, true, header.offsetHeight);
    gsap.to(header, {yPercent: 0, duration, ease});
  }, 300);
};

const hideHeader = (header, blocks, direction) => {
  setTimeout(() => {
    if (currentDirection !== direction) {
      return;
    }
    toggleStickyBlocksClass(blocks, false, header.offsetHeight);
    gsap.to(header, {yPercent: -100, duration, ease});
  }, 300);
};

const initHeaderSticky = () => {
  const header = document.querySelector('[data-header]');

  if (!header) {
    return;
  }

  const stickyBlocks = [];
  // const stickyBlocks = document.querySelectorAll('[data-sticky-block]');

  toggleStickyBlocksClass(stickyBlocks, true, header.offsetHeight);
  mm.add(mediaQuery, () => {
    ScrollTrigger.create({
      start: 'top top-=' + header.offsetHeight,
      onUpdate(self) {
        if (self.direction === -1) {
          if (currentDirection === -1) {
            return;
          }
          showHeader(header, stickyBlocks, self.direction);
        } else {
          if (currentDirection === 1) {
            return;
          }
          hideHeader(header, stickyBlocks, self.direction);
        }
        currentDirection = self.direction;
      },
    });
  });
};

export {initHeaderSticky};
