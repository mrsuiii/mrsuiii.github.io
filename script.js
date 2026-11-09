(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Theme toggle
  var toggle = document.querySelector('.theme-toggle');
  function currentTheme() {
    return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Nav border on scroll
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Project filters
  var chips = document.querySelectorAll('.chip');
  var projects = document.querySelectorAll('#work [data-cat]');
  var empty = document.querySelector('#work .empty');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      var shown = 0;
      projects.forEach(function (p) {
        var match = f === 'all' || p.dataset.cat === f;
        if (match) { p.removeAttribute('data-hidden'); p.classList.add('in'); shown++; }
        else p.setAttribute('data-hidden', '');
      });
      empty.hidden = shown > 0;
    });
  });

  // Active nav link
  var links = document.querySelectorAll('.nav-links a');
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) so.observe(s); });
  }
})();
