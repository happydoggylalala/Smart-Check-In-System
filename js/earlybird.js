export function recomputeEarlyBirds(state) {
  const { roster, event } = state;
  roster.forEach(p => { p.isEarlyBird = false; });
  const n = Number(event.earlyBirdCount) || 0;
  if (n <= 0) return;
  const sorted = [...roster].sort((a, b) => new Date(a.registeredAt) - new Date(b.registeredAt));
  for (let i = 0; i < Math.min(n, sorted.length); i++) {
    sorted[i].isEarlyBird = true;
  }
}
