document.addEventListener('click', e => {
  if (e.target.closest('[data-close-note]')) document.getElementById('demoNote').classList.add('hide');
});
