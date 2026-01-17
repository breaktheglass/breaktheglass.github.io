// Tap the glass reveal
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('glassTap');
  const reveal = document.getElementById('glassReveal');
  
  if (btn && reveal) {
    btn.addEventListener('click', function() {
      const isShown = reveal.classList.contains('show');
      if (isShown) {
        reveal.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        const encoded = reveal.getAttribute('data-hidden');
        if (encoded) {
          reveal.textContent = atob(encoded);
        }
        reveal.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Hash echo for hidden navigation
  const hashEcho = document.getElementById('hashEcho');
  if (hashEcho && window.location.hash) {
    const hash = window.location.hash.substring(1);
    hashEcho.textContent = `// anchor: ${hash}`;
    hashEcho.classList.remove('hidden');
  }
});
