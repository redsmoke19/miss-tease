import {DynamicAdaptive} from '../utils/dynamic-adaptive.js';

const initDynamicAdaptive = () => {
  const dynamicAdaptive = new DynamicAdaptive('max');
  dynamicAdaptive.init();
};

export {initDynamicAdaptive};
