export function initHeader() {
  const menu = document.querySelector('[data-menu]');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  setActiveNavLink(navLinks);

  if (!menu || !openBtn || !closeBtn) return;

  menu.setAttribute('inert', '');

  const openMenu = () => {
    menu.classList.add('is-open');
    menu.removeAttribute('aria-hidden');
    menu.removeAttribute('inert');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    closeBtn.focus();
  };

  const closeMenu = () => {
    if (!menu.classList.contains('is-open')) return;

    if (menu.contains(document.activeElement)) {
      openBtn.focus();
    }

    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) closeMenu();
  });
}

function setActiveNavLink(navLinks) {
  const isFavoritesPage = window.location.pathname.includes('favorites');
  const activePage = isFavoritesPage ? 'favorites' : 'home';

  navLinks.forEach(link => {
    const isActive = link.dataset.navLink === activePage;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
