// Q2 - Employee Status Dashboard
// Using vanilla XMLHttpRequest to GET employees and PATCH status

const API_BASE_Q2 = 'http://localhost:3002'; // run Q2 JSON server on port 3002 serving Q2_db.json
const empBody = document.getElementById('empBody');
const messageEl = document.getElementById('message');

function clearMessage() { messageEl.textContent = ''; }

// Render the employee rows from data
function renderEmployees(employees) {
  empBody.innerHTML = '';
  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td class="statusCell">${emp.status === 'active' ? '<span class="activeLabel">Active</span>' : '<span class="inactiveLabel">Inactive</span>'}</td>
      <td><label class="toggle"><input type="checkbox" ${emp.status === 'active' ? 'checked' : ''} data-id="${emp.id}"> Toggle</label></td>
    `;
    empBody.appendChild(tr);
  });
}

// Fetch employees using XMLHttpRequest
function fetchEmployees() {
  clearMessage();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${API_BASE_Q2}/employees`);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      renderEmployees(data);
    } else {
      messageEl.textContent = 'Failed to load employee data (status ' + xhr.status + ')';
    }
  };
  xhr.onerror = function() {
    messageEl.textContent = 'Network error while fetching employees';
  };
  xhr.send();
}

// Attach click listener via event delegation to toggle checkbox
empBody.addEventListener('change', function(e) {
  const input = e.target.closest('input[type="checkbox"]');
  if (!input) return;

  const id = input.dataset.id;
  const newStatus = input.checked ? 'active' : 'inactive';

  // optimistically update UI
  const row = input.closest('tr');
  const statusCell = row.querySelector('.statusCell');
  statusCell.innerHTML = newStatus === 'active' ? '<span class="activeLabel">Active</span>' : '<span class="inactiveLabel">Inactive</span>';

  // send PATCH using XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('PATCH', `${API_BASE_Q2}/employees/${id}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (!(xhr.status >= 200 && xhr.status < 300)) {
      // revert UI and show error
      input.checked = !input.checked;
      const revertedStatus = input.checked ? 'active' : 'inactive';
      statusCell.innerHTML = revertedStatus === 'active' ? '<span class="activeLabel">Active</span>' : '<span class="inactiveLabel">Inactive</span>';
      messageEl.textContent = 'Failed to update status (status ' + xhr.status + ')';
    } else {
      clearMessage();
    }
  };
  xhr.onerror = function() {
    // network error
    input.checked = !input.checked; // revert
    const revertedStatus = input.checked ? 'active' : 'inactive';
    statusCell.innerHTML = revertedStatus === 'active' ? '<span class="activeLabel">Active</span>' : '<span class="inactiveLabel">Inactive</span>';
    messageEl.textContent = 'Network error while updating status';
  };

  xhr.send(JSON.stringify({ status: newStatus }));
});

// Initialize
fetchEmployees();

// Export for tests
if (typeof module !== 'undefined' && module.exports) module.exports = { fetchEmployees };
