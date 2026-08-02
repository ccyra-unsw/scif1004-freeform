/* ============ RADIATION CALCULATOR ============ */
(function () {
  const slider = document.getElementById('radSlider');
  const daysLabel = document.getElementById('radDaysLabel');
  const doseEl = document.getElementById('radDose');
  const ctEl = document.getElementById('radCT');
  const RATE = 1.8; // mSv/day, MSL/RAD measured average
  const CT_DOSE = 7; // mSv per chest CT
  function update() {
    const days = Number(slider.value);
    const dose = Math.round(days * RATE);
    daysLabel.textContent = `${days} DAYS`;
    doseEl.textContent = `${dose} mSv`;
    ctEl.textContent = Math.round(dose / CT_DOSE);
  }
  slider.addEventListener('input', update);
  update();
})();
