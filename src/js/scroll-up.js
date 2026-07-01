export function initScrollUp() {
  const scrollUpBtn = document.querySelector('[data-scroll-up]');

  if (!scrollUpBtn) return;

  const toggleScrollUpBtn = () => {
    scrollUpBtn.classList.toggle('is-visible', window.scrollY > 300);
  };

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  toggleScrollUpBtn();
  window.addEventListener('scroll', toggleScrollUpBtn, { passive: true });
}
