const getHtmlFontSize = () => {
  return Number(window.getComputedStyle(document.documentElement).getPropertyValue('font-size').replace(/px$/, ''));
};

export default getHtmlFontSize;
