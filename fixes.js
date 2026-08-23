/* Interaction hotfixes — loaded after the original script. */
(()=>{
  const menuEl=document.getElementById('mobileMenu');
  const burger=document.getElementById('burger');
  const bottom=document.querySelector('.bottom');
  if(!menuEl||!burger)return;

  // Original document click handler closes the menu on the same click that opens
  // it from the bottom “Ещё” button. Stop that click before it reaches document.
  bottom?.addEventListener('click',e=>{
    const more=e.target.closest('button:not([data-bottom])');
    if(!more)return;
    e.stopPropagation();
    const open=menuEl.classList.toggle('open');
    burger.textContent=open?'×':'☰';
    burger.setAttribute('aria-expanded',String(open));
  });

  burger.setAttribute('aria-expanded',menuEl.classList.contains('open')?'true':'false');
  burger.addEventListener('click',()=>requestAnimationFrame(()=>burger.setAttribute('aria-expanded',menuEl.classList.contains('open')?'true':'false')));

  // Close with Escape and prevent the page behind an open menu from receiving taps.
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuEl.classList.contains('open')){menuEl.classList.remove('open');burger.textContent='☰';burger.setAttribute('aria-expanded','false')}});

  // Decode card images at their natural quality before display where supported.
  document.querySelectorAll('.product img,.photo img').forEach(img=>{img.decoding='async';img.loading='lazy'});
})();
