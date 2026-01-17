(function(){
  function qs(sel){return document.querySelector(sel)}
  function qsa(sel){return Array.prototype.slice.call(document.querySelectorAll(sel))}

  // Reveal blocks tagged with data-reveal when URL hash matches.
  var hash = (location.hash || "").replace("#", "").trim();
  if(hash){
    qsa('[data-reveal]').forEach(function(el){
      if((el.getAttribute('data-reveal') || '').toLowerCase() === hash.toLowerCase()){
        el.classList.remove('hidden');
      }
    });
  }

  // Soft hint on the homepage: pressing G toggles the "glass" hint.
  document.addEventListener('keydown', function(e){
    if(e.key === 'g' || e.key === 'G'){
      var el = qs('#glasshint');
      if(!el) return;
      el.classList.toggle('hidden');
    }
  });
})();
