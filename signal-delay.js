/* ============ SIGNAL DELAY SIMULATOR ============ */
(function () {
  const slider = document.getElementById('distSlider');
  const distLabel = document.getElementById('distLabel');
  const delayReal = document.getElementById('delayReal');
  const delayRoundtrip = document.getElementById('delayRoundtrip');
  const input = document.getElementById('comlinkText');
  const sendBtn = document.getElementById('comlinkSend');
  const log = document.getElementById('comlinkLog');
  const LIGHT_MIN_PER_AU = 8.317;

  function currentDelayMinutes() {
    return Number(slider.value) * LIGHT_MIN_PER_AU;
  }
  function updateReadout() {
    const au = Number(slider.value);
    const oneWay = currentDelayMinutes();
    distLabel.textContent = `${au.toFixed(2)} AU`;
    delayReal.textContent = `${oneWay.toFixed(1)} MIN`;
    delayRoundtrip.textContent = `${(oneWay * 2).toFixed(1)} MIN`;
  }
  slider.addEventListener('input', updateReadout);
  updateReadout();

  const responses = [
    'Copy that. Telemetry nominal, habitat pressure holding steady.',
    'Received. Forwarding your update to the flight surgeon.',
    'Acknowledged, good to hear from you. Everyone here says hi.',
    'Logged. Weather window for the next EVA still looks clear.',
    "Copy. We'll relay that to the science team on the next pass.",
  ];

  function appendLog(cls, text) {
    const line = document.createElement('div');
    line.className = cls;
    line.textContent = text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  sendBtn.addEventListener('click', () => {
    const msg = input.value.trim();
    if (!msg) return;
    const oneWayMin = currentDelayMinutes();
    const demoDelayMs = Math.min(1200 + oneWayMin * 250, 4500);
    appendLog('you', `YOU → EARTH: ${msg}`);
    appendLog(
      'sys',
      `// transmitting… real one-way delay would be ${oneWayMin.toFixed(1)} min`,
    );
    input.value = '';
    sendBtn.disabled = true;
    setTimeout(() => {
      const reply =
        // randomise one of the responses :p
        responses[Math.floor(Math.random() * responses.length)];
      appendLog('mars', `EARTH → YOU: ${reply}`);
      sendBtn.disabled = false;
    }, demoDelayMs);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });
})();
