(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.07,
    rootMargin: '0px 0px -32px 0px'
  });

  var targets = document.querySelectorAll(
    '.philosophy-inner, ' +
    '.two-questions-inner, ' +
    '.paths-grid, ' +
    '.section-block, ' +
    '.page-intro, ' +
    '.resonance-questions, ' +
    '.quiet-cta, ' +
    '.what-inner, ' +
    '.track-record-inner, ' +
    '.entry-points-inner'
  );

  targets.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;
    el.classList.add('fade-in');
    observer.observe(el);
  });

}());
