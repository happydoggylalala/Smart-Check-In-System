// 早鳥福利：固定取報名時間最早的前 N 名候選人，但只有其中「準時報到」的人
// 才會真正顯示早鳥徽章——遲到、未到或尚未報到者不會取得早鳥資格，也不會
// 由後面名次的人遞補（名額只跟報名順序有關，跟是否遞補無關）。
export function recomputeEarlyBirds(state) {
  const { roster, event } = state;
  roster.forEach(p => { p.isEarlyBird = false; });
  const n = Number(event.earlyBirdCount) || 0;
  if (n <= 0) return;
  const sorted = [...roster].sort((a, b) => new Date(a.registeredAt) - new Date(b.registeredAt));
  for (let i = 0; i < Math.min(n, sorted.length); i++) {
    if (sorted[i].checkin.status === 'on_time') {
      sorted[i].isEarlyBird = true;
    }
  }
}
