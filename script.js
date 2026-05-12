/* ─────────────────────────────────────────
   Dashboard Partai Buaya – Konoha 2026
   script.js
   ───────────────────────────────────────── */

/* ── WARNA GLOBAL ── */
const C = {
  green : '#3ddc68',
  gold  : '#c9a227',
  red   : '#e05c5c',
  blue  : '#4da8da',
  grid  : 'rgba(42,61,46,.5)',
  text  : '#6b8c6e',
};

/* ── NAMA WILAYAH (ganti sesuai data riil) ── */
const WILAYAH = [
  'Konoha Tengah', 'Amegakure', 'Sunagakure', 'Kirigakure',
  'Kumogakure', 'Iwagakure', 'Takigakure', 'Yugakure',
  'Otogakure', 'Kusagakure'
];

/* ── DEFAULT FONT Chart.js ── */
Chart.defaults.color = C.text;
Chart.defaults.font  = { family: "'IBM Plex Mono'", size: 11 };


/* ════════════════════════════════════════
   1. BAR CHART — Pengangguran per Wilayah
   ════════════════════════════════════════ */
new Chart(document.getElementById('barChart'), {
  type: 'bar',
  data: {
    labels: WILAYAH,
    datasets: [{
      label: 'Tingkat Pengangguran (%)',
      // ⬇️ GANTI DATA INI dengan data riil dari BPS / World Bank
      data: [5.2, 7.8, 11.4, 10.9, 6.3, 8.1, 7.0, 9.2, 8.8, 6.5],
      backgroundColor: [
        C.green, '#5ec97e', C.red, C.red, '#5ec97e',
        C.gold,  '#5ec97e', C.gold, C.gold, '#5ec97e'
      ],
      borderRadius: 4,
      borderSkipped: false,
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: C.grid }, ticks: { maxRotation: 35 } },
      y: { grid: { color: C.grid }, beginAtZero: true,
           ticks: { callback: v => v + '%' } }
    }
  }
});


/* ════════════════════════════════════════
   2. LINE CHART — Pertumbuhan Ekonomi
   ════════════════════════════════════════ */
new Chart(document.getElementById('lineChart'), {
  type: 'line',
  data: {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Nasional',
        // ⬇️ GANTI DATA INI
        data: [-2.1, 3.7, 5.3, 5.1, 4.9],
        borderColor: C.green,
        backgroundColor: 'rgba(61,220,104,.08)',
        tension: .4, fill: true, pointRadius: 5,
      },
      {
        label: 'Konoha Tengah',
        data: [-1.5, 4.2, 6.1, 5.8, 5.5],
        borderColor: C.blue,
        backgroundColor: 'transparent',
        tension: .4, borderDash: [4, 3], pointRadius: 4,
      },
      {
        label: 'Sunagakure',
        data: [-3.2, 2.1, 3.4, 3.0, 2.8],
        borderColor: C.red,
        backgroundColor: 'transparent',
        tension: .4, borderDash: [4, 3], pointRadius: 4,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { boxWidth: 12 } } },
    scales: {
      x: { grid: { color: C.grid } },
      y: { grid: { color: C.grid }, ticks: { callback: v => v + '%' } }
    }
  }
});


/* ════════════════════════════════════════
   3. HEATMAP — Kemiskinan per Wilayah × Tahun
   ════════════════════════════════════════ */

// ⬇️ GANTI DATA INI — nilai dalam persen (%)
const heatData = [
  ['Konoha Tengah',  8.2,  7.9,  7.4,  7.0,  6.8],
  ['Amegakure',     12.1, 11.8, 11.5, 11.0, 10.5],
  ['Sunagakure',    18.4, 19.0, 18.7, 18.2, 17.9],
  ['Kirigakure',    17.1, 17.5, 17.0, 16.8, 16.5],
  ['Kumogakure',    10.3, 10.1,  9.8,  9.5,  9.2],
  ['Iwagakure',     13.5, 13.8, 13.2, 12.9, 12.7],
  ['Takigakure',    11.0, 10.9, 10.6, 10.2,  9.9],
  ['Yugakure',      14.7, 15.1, 14.8, 14.3, 13.9],
  ['Otogakure',     15.3, 15.8, 15.4, 15.0, 14.6],
  ['Kusagakure',     9.1,  8.9,  8.6,  8.2,  8.0],
];

function heatClass(v) {
  if (v < 9)  return 'heat-1';
  if (v < 12) return 'heat-2';
  if (v < 15) return 'heat-3';
  if (v < 18) return 'heat-4';
  return 'heat-5';
}

const tbody = document.getElementById('heatmapBody');
heatData.forEach(row => {
  const tr = document.createElement('tr');
  row.forEach((cell, i) => {
    const td = document.createElement('td');
    if (i === 0) {
      td.textContent = cell;
    } else {
      td.textContent = cell.toFixed(1) + '%';
      td.className = heatClass(cell);
    }
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});


/* ════════════════════════════════════════
   4. PIE / DONUT CHART — Sektor Ekonomi
   ════════════════════════════════════════ */
new Chart(document.getElementById('pieChart'), {
  type: 'doughnut',
  data: {
    // ⬇️ GANTI DATA INI
    labels: ['Pertanian', 'Industri Manufaktur', 'Perdagangan', 'Jasa', 'Konstruksi', 'Lainnya'],
    datasets: [{
      data: [22, 18, 25, 20, 9, 6],
      backgroundColor: [
        '#3ddc68', '#c9a227', '#4da8da', '#9d6de0', '#e05c5c', '#6b8c6e'
      ],
      borderColor: '#111915',
      borderWidth: 3,
      hoverOffset: 6,
    }]
  },
  options: {
    responsive: true,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'right',
        labels: { boxWidth: 12, padding: 10 }
      }
    }
  }
});


/* ════════════════════════════════════════
   5. SCATTER PLOT — Investasi vs Pengangguran
   ════════════════════════════════════════ */

// ⬇️ GANTI DATA INI — x: investasi (triliun Rp), y: pengangguran (%)
const scatterRaw = [
  { x: 2.1, y: 5.2,  label: 'Konoha Tengah' },
  { x: 0.8, y: 7.8,  label: 'Amegakure' },
  { x: 0.3, y: 11.4, label: 'Sunagakure' },
  { x: 0.4, y: 10.9, label: 'Kirigakure' },
  { x: 1.1, y: 6.3,  label: 'Kumogakure' },
  { x: 0.6, y: 8.1,  label: 'Iwagakure' },
  { x: 0.9, y: 7.0,  label: 'Takigakure' },
  { x: 0.5, y: 9.2,  label: 'Yugakure' },
  { x: 0.4, y: 8.8,  label: 'Otogakure' },
  { x: 1.0, y: 6.5,  label: 'Kusagakure' },
];

new Chart(document.getElementById('scatterChart'), {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Wilayah',
      data: scatterRaw,
      backgroundColor: scatterRaw.map(d => d.y > 10 ? C.red : d.y > 8 ? C.gold : C.green),
      pointRadius: 8,
      pointHoverRadius: 11,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => {
            const d = scatterRaw[ctx.dataIndex];
            return `${d.label}: Inv Rp${d.x}T | Peng ${d.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: C.grid },
        title: { display: true, text: 'Realisasi Investasi (Rp Triliun)', color: C.text },
      },
      y: {
        grid: { color: C.grid },
        title: { display: true, text: 'Tingkat Pengangguran (%)', color: C.text },
        ticks: { callback: v => v + '%' }
      }
    }
  }
});


/* ════════════════════════════════════════
   6. BAR CHART HORIZONTAL — Skor Infrastruktur
   ════════════════════════════════════════ */

// ⬇️ GANTI DATA INI — skor 0–100
new Chart(document.getElementById('infraChart'), {
  type: 'bar',
  data: {
    labels: WILAYAH,
    datasets: [{
      label: 'Skor Infrastruktur',
      data: [82, 54, 31, 35, 60, 47, 58, 42, 45, 62],
      backgroundColor: (ctx) => {
        const v = ctx.raw;
        return v >= 70 ? C.green : v >= 50 ? C.blue : v >= 40 ? C.gold : C.red;
      },
      borderRadius: 4,
      borderSkipped: false,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: C.grid }, max: 100 },
      y: { grid: { color: C.grid } }
    }
  }
});