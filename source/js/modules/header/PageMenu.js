// import { resizeObserver } from '../utils/observers';
import scrollLock from '../../vendor/scroll-lock.min.js';

export class PageMenu {
  constructor() {
    this._breakpoint = window.matchMedia('(max-width:1023px)');
    this._sandwich = document.querySelector('[data-sandwich]');
    this._navMenu = document.querySelector('[data-nav="menu"]');
    this._unlock = true;
    this._onSandwichToggler = this._onSandwichToggler.bind(this);
    this._onDocumentClick = this._onDocumentClick.bind(this);
    this._breakpointChecker = this._breakpointChecker.bind(this);
    // this._sandwich.pagemenu = this;
  }

  init() {
    if (!this._sandwich) {
      return;
    }

    this._sandwich.addEventListener('click', this._onSandwichToggler);
    this._breakpoint.addEventListener('change', this._breakpointChecker);
    this._breakpointChecker();
    // resizeObserver.subscribe(this._breakpointChecker);
  }

  _onSandwichToggler(evt) {
    evt.preventDefault();
    if (this._sandwich.classList.contains('is-active')) {
      this.closeMenu();
      return;
    }
    this.openMenu();
  }

  _onDocumentClick(evt) {
    const target = evt.target;
    if (target.closest('[data-nav="wrapper"]') || target.closest('[data-sandwich]')) {
      return;
    }
    this.closeMenu();
  }

  openMenu() {
    this._sandwich.classList.add('is-active');
    this._sandwich.ariaPressed = 'true';
    this._navMenu.classList.add('is-active');
    document.addEventListener('click', this._onDocumentClick);
    if (this._breakpoint.matches) {
      this._unlock = false;
      scrollLock.disablePageScroll();
    }
  }

  closeMenu() {
    this._sandwich.classList.remove('is-active');
    this._sandwich.ariaPressed = 'false';
    this._navMenu.classList.remove('is-active');
    if (!this._unlock) {
      scrollLock.enablePageScroll();
      this._unlock = true;
    }
    document.removeEventListener('click', this._onDocumentClick);
  }

  _breakpointChecker() {
    if (this._sandwich.classList.contains('is-active')) {
      this.closeMenu();
    }
  }
}
