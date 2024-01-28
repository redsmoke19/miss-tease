import {gsap} from 'gsap';
import {Draggable} from 'gsap/Draggable';
import {customSelect} from './select/init-selects.js';
import scrollLock from '../vendor/scroll-lock.min';

gsap.registerPlugin(Draggable);

const breakpoint = window.matchMedia('(min-width: 768px)');
const onSelectOpen = (select) => {
  const list = select.querySelector('.custom-select__list');
  const handle = select.querySelector('.custom-select__handle');
  const threshold = list.offsetHeight * 0.7;
  let close = false;
  scrollLock.disablePageScroll(select);

  select.draggableInst = Draggable.create(list, {
    type: 'y',
    trigger: handle,
    edgeResistance: 1,
    bounds: {minY: 0, maxY: list.offsetHeight},
    inertia: true,
    onDragEnd() {
      if (close) {
        customSelect._closeSelect();
        close = false;
      } else {
        gsap.to(list, {y: 0, duration: 0.1, ease: 'none'});
      }
    },
    onMove() {
      if (this.y > this.minY + threshold) {
        close = true;
        this.endDrag();
      }
    },
  });
};

const onSelectClose = (select) => {
  select.draggableInst?.forEach((item) => {
    item.kill();
  });
  select.draggableInst = null;
  setTimeout(() => {
    scrollLock.enablePageScroll(select);
  }, 300);
};
const callback = (mutationList) => {
  if (breakpoint.matches) {
    return;
  }
  let match = false;
  for (const mutation of mutationList) {
    if (mutation.attributeName === 'class') {
      if (match) {
        return;
      }
      match = true;
      const {target} = mutation;
      const list = target.querySelector('.custom-select__list');
      if (target.classList.contains('is-open')) {
        gsap.set(list, {opacity: '1', visibility: 'visible', y: list.offsetHeight});
        gsap.to(list, {y: 0, duration: 0.2, onComplete: onSelectOpen.bind(null, target)});
      } else {
        gsap.to(list, {y: list.offsetHeight, duration: 0.1, onComplete: onSelectClose.bind(null, target), ease: 'none'});
      }
    }
  }
};

const initDrag = () => {
  const selects = document.querySelectorAll('.custom-select');
  selects.forEach((select) => {

    const observer = new MutationObserver(callback);
    observer.observe(select, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });
};

export {initDrag};
