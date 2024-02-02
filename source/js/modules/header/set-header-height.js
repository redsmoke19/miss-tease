export const setHeaderHeight = () => {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }

  const main = document.querySelector('.wrapper main');
  document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  main.style.paddingTop = 'var(--header-height)';
};
