(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
  }

  const current = document.body.dataset.path || '/';
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const path = new URL(link.href).pathname;
    if (path !== '/' && current.startsWith(path)) link.setAttribute('aria-current', 'page');
  });

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();

