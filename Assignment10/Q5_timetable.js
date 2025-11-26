// Q5 Timetable viewer — Fetch + dynamic render
const API_Q5 = 'http://localhost:3006'; // run Q5 json server on port 3006

const daySelect = document.getElementById('daySelect');
const list = document.getElementById('timetableList');

async function loadTimetable(day) {
  list.innerHTML = '<div class="empty">Loading…</div>';
  try {
    const res = await fetch(`${API_Q5}/timetable?day=${encodeURIComponent(day)}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    renderTimetable(data, day);
  } catch (err) {
    list.innerHTML = `<div class="empty">Error loading timetable: ${err.message}</div>`;
  }
}

function renderTimetable(entries, day) {
  if (!entries || entries.length === 0) {
    list.innerHTML = `<div class="empty">No classes today.</div>`;
    return;
  }

  list.innerHTML = entries.map(e => `
    <div class="row">
      <div><strong>${e.subject}</strong> — ${e.faculty}</div>
      <div style="color:#666">${e.time}</div>
    </div>
  `).join('');
}

// init
daySelect.addEventListener('change', () => loadTimetable(daySelect.value));
loadTimetable(daySelect.value);

// export for tests
if (typeof module !== 'undefined' && module.exports) module.exports = { loadTimetable };
