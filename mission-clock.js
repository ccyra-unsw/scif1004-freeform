/* ============ MISSION CLOCK ============ */
(function () {
  const LAUNCH = new Date('2026-10-14T00:00:00Z').getTime();
  const el = document.getElementById('missionClock');
  function tick() {
    const now = Date.now();
    const diff = LAUNCH - now;
    const sign = diff >= 0 ? 'T-MINUS' : 'T-PLUS';
    const abs = Math.abs(diff);
    const days = Math.floor(abs / 86400000);
    const hrs = Math.floor((abs % 86400000) / 3600000);
    const mins = Math.floor((abs % 3600000) / 60000);
    const secs = Math.floor((abs % 60000) / 1000);
    el.textContent = `${sign} ${days}D ${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  tick();
  setInterval(tick, 1000);
})();
