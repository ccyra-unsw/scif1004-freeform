/* ============ BOOT SEQUENCE ============ */
(function () {
  const logEl = document.getElementById('bootLog');
  const lines = [
    'ESTABLISHING SECURE LINK...',
    'AUTHENTICATING CREW CREDENTIALS...',
    'ACCESS GRANTED.',
  ];
  let li = 0,
    ci = 0;
  function typeLine() {
    if (li >= lines.length) {
      logEl.innerHTML =
        lines[lines.length - 1] + '<span class="cursor">▌</span>';
      document.getElementById('bootTitle').classList.add('show');
      document.getElementById('bootSub').classList.add('show');
      document.getElementById('beginBtn').classList.add('show');
      document.getElementById('bootScrollcue').classList.add('show');
      return;
    }
    const line = lines[li];
    if (ci <= line.length) {
      logEl.innerHTML = line.slice(0, ci) + '<span class="cursor">▌</span>';
      ci++;
      setTimeout(typeLine, 38);
    } else {
      li++;
      ci = 0;
      setTimeout(typeLine, 260);
    }
  }
  typeLine();

  document.getElementById('beginBtn').addEventListener('click', () => {
    document.getElementById('boot').classList.add('hidden');
    document.body.classList.remove('locked');
    document.getElementById('hero').classList.add('reveal');
  });

  // subtle canvas starfield with parallax on the boot screen
  const canvas = document.getElementById('bootCanvas');
  const ctx = canvas.getContext('2d');
  let w,
    h,
    stars = [];
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.6 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));
  }
  window.addEventListener('resize', resize);
  resize();
  let mx = 0,
    my = 0;
  document.getElementById('boot').addEventListener('mousemove', (e) => {
    mx = (e.clientX / w - 0.5) * 14;
    my = (e.clientY / h - 0.5) * 14;
  });
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    t += 0.02;
    ctx.fillStyle = '#D8CFC0';
    stars.forEach((s) => {
      const alpha = s.baseAlpha + Math.sin(t + s.tw) * 0.15;
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.beginPath();
      ctx.arc(s.x + mx * s.r, s.y + my * s.r, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (!document.getElementById('boot').classList.contains('hidden')) {
      requestAnimationFrame(draw);
    }
  }
  draw();
})();
