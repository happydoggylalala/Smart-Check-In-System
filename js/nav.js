export function initNav(onShow) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target, onShow));
  });
}

export function showScreen(id, onShow) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  onShow && onShow(id);
}
