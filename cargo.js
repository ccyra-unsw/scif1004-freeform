/* ============ CARGO MANIFEST ============ */

(function () {
  const items = [
    {
      name: 'Radiation shielding (water-wall)',
      mass: 45,
      category: 'protection',
      what: 'A layer of water-filled panels lining part of the spacecraft can be used as a physical barrier against space radiation.',
      real: "Space is full of ionising radiation that Earth's atmosphere and magnetic field normally block for us. Transit vehicles carry water or polyethylene walls as passive shielding, since the water crew need to drink anyway can double as a radiation barrier.",
    },
    {
      name: 'Water reclamation system',
      mass: 30,
      category: 'life-support',
      what: 'Equipment that filters and purifies wastewater, including urine, sweat, and humidity, back into drinking water.',
      real: 'Closed-loop recycling systems filter and purify wastewater back into drinking water. This technology already exists on the International Space Station, and recovers over 90% of onboard water.',
      seenIn: 'THE MARTIAN',
    },
    {
      name: 'Crop growth kit',
      mass: 15,
      category: 'life-support',
      what: 'Seeds, growth substrate, and lighting needed to grow a small amount of food during the mission.',
      real: 'Growing food on Mars is plausible in principle, but Martian soil contains toxic perchlorates that would need to be removed before anything could be safely planted in it.',
      seenIn: 'THE MARTIAN',
    },
    {
      name: 'Mars-surface EVA suit',
      mass: 120,
      category: 'protection',
      what: 'A pressurised suit built for walking and working on the Martian surface, distinct from suits designed for orbital spacewalks.',
      real: 'A suit built for the surface of Mars needs to handle fine, static-charged dust, a thin CO₂ atmosphere, and drastic temperature swings.',
      seenIn: 'GRAVITY',
    },
    {
      name: 'Isolation & comms-delay support kit',
      mass: 5,
      category: 'comms',
      what: 'Resources such as pre-recorded messages, mental health tools, and offline entertainment, meant to help crew cope with long communication gaps.',
      real: "At Mars' farthest point from Earth, a message takes up to 22 minutes to arrive one-way, making live conversation physically impossible. Crews need tools like these to manage the isolation this creates.",
      seenIn: 'INTERSTELLAR',
    },
    {
      name: 'Deployable solar array',
      mass: 60,
      category: 'power',
      what: 'Foldable solar panels that unfold once on the surface to generate electricity for the habitat.',
      real: 'Solar output on Mars is roughly 40 to 50% of what the same panel would generate on Earth, and dust accumulation on the panels is an ongoing maintenance problem for any surface mission.',
    },
    {
      name: 'Telemedicine & first-aid kit',
      mass: 10,
      category: 'life-support',
      what: 'Medical supplies and remote-diagnostic tools for treating injuries or illness without a doctor physically present.',
      real: "With a doctor rarely on hand, real mission plans lean on remote-guided telemedicine, though the same communication delay limits how 'live' that guidance can actually be.",
      seenIn: 'THE MARTIAN',
    },
    {
      name: 'Dust mitigation gear',
      mass: 8,
      category: 'protection',
      what: 'Brushes, seals, and filters designed to stop fine, static-charged Martian dust from damaging equipment and suits.',
      real: "Mars' atmosphere is about 1% the density of Earth's, so even a 100km/h Martian wind would feel like a gentle breeze. The real hazard is much finer, static-charged dust that clings to equipment over time.",
      seenIn: 'THE MARTIAN',
    },
    {
      name: 'Backup communications relay',
      mass: 12,
      category: 'comms',
      what: 'A secondary radio and antenna system kept in reserve in case the primary communications link fails.',
      real: 'Mission architectures typically plan for relay satellites and redundant communication links, since a single point of failure could isolate a crew entirely.',
    },
    {
      name: 'ISRU oxygen generation unit',
      mass: 90,
      category: 'life-support',
      what: "A device that extracts oxygen from the Martian atmosphere's carbon dioxide, a process known as in-situ resource utilisation (ISRU).",
      real: "NASA's MOXIE experiment aboard the Perseverance rover has already demonstrated extracting oxygen from Martian CO₂ at small scale.",
      seenIn: 'THE MARTIAN',
    },
  ];
  const BUDGET = 400;
  const list = document.getElementById('manifestList');
  const gaugeFill = document.getElementById('gaugeFill');
  const gaugeReadout = document.getElementById('gaugeReadout');
  let total = 0;

  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'item';
    el.dataset.cat = item.category || '';
    el.innerHTML = `
      <div class="item-row" data-idx="${i}">
        <input type="checkbox" data-mass="${item.mass}" id="chk${i}">
        <div class="item-name">${item.name}</div>
        <div class="item-mass">${item.mass} KG</div>
        <div class="item-caret">▸</div>
      </div>
     <div class="item-detail">
        <div class="item-what">${item.what}</div>
        <div class="item-science">${item.real}</div>
        ${item.seenIn ? `<div class="item-seen">SEEN IN: ${item.seenIn}</div>` : ''}
      </div>
    `;
    list.appendChild(el);
  });

  function updateGauge() {
    const pct = Math.min((total / BUDGET) * 100, 100);
    gaugeFill.style.width = pct + '%';
    const over = total > BUDGET;
    gaugeFill.classList.toggle('over', over);
    gaugeReadout.classList.toggle('over', over);
    gaugeReadout.textContent = over
      ? `${total} / ${BUDGET} KG · OVER BUDGET, MISSION SCRUB RISK`
      : `${total} / ${BUDGET} KG LOADED`;
  }

  list.addEventListener('click', (e) => {
    const row = e.target.closest('.item-row');
    if (!row) return;
    const itemEl = row.parentElement;
    if (e.target.tagName === 'INPUT') {
      total += e.target.checked
        ? Number(e.target.dataset.mass)
        : -Number(e.target.dataset.mass);
      updateGauge();
      return;
    }
    const wasOpen = itemEl.classList.contains('open');
    document
      .querySelectorAll('.item.open')
      .forEach((el) => el.classList.remove('open'));
    if (!wasOpen) itemEl.classList.add('open');
  });
  updateGauge();
})();
