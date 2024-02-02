import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import getHtmlFontSize from '../../utils/get-html-font-size.js';

gsap.registerPlugin(ScrollTrigger);

const defaultFontSize = 16;
const mediaQuery = '(min-width:768px)';
const duration = 0.3;
const ease = 'sine.out';
const mm = gsap.matchMedia();

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

const initHeaderSticky = () => {
  const header = document.querySelector('[data-header]');

  if (!header) {
    return;
  }

  const stickyBlocks = [];
  // const stickyBlocks = document.querySelectorAll('[data-sticky-block]');
  let direction = 0;

  toggleStickyBlocksClass(stickyBlocks, true, header.offsetHeight);
  mm.add(mediaQuery, () => {
    ScrollTrigger.create({
      start: 'top top-=' + header.offsetHeight,
      onUpdate(self) {
        if (self.direction === -1) {
          if (direction === -1) {
            return;
          }
          toggleStickyBlocksClass(stickyBlocks, true, header.offsetHeight);
          gsap.to(header, {yPercent: 0, duration, ease});
        } else {
          if (direction === 1) {
            return;
          }
          toggleStickyBlocksClass(stickyBlocks, false, header.offsetHeight);
          gsap.to(header, {yPercent: -100, duration, ease});
        }
        direction = self.direction;
      },
    });
  });
};

export {initHeaderSticky};
