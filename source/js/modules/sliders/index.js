import {initMainCollectionSlider} from './init-main-collection.js';
import {initProductSlider} from './init-product.js';
import {initGallerySlider} from './init-gallery.js';
import {initHeroSlider} from './init-hero.js';
import {initInstBlockSlider} from './init-inst-block.js';
import {initShowMoreSlider} from './init-show-more.js';

const initSliders = () => {
  initHeroSlider();
  initMainCollectionSlider();
  initGallerySlider();
  initProductSlider();
  initInstBlockSlider();
  initShowMoreSlider();
};

export default initSliders;
