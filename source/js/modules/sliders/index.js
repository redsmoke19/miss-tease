import {initMainCollectionSlider} from './init-main-collection.js';
import {initProductSlider} from './init-product.js';
import {initGallerySlider} from './init-gallery.js';
import {initHeroSlider} from './init-hero.js';

const initSliders = () => {
  initHeroSlider();
  initMainCollectionSlider();
  initGallerySlider();
  initProductSlider();
};

export default initSliders;
