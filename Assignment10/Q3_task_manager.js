// Q3 - Task Manager (jQuery AJAX + query params)
const API_BASE_Q3 = 'http://localhost:3004'; // run JSON Server for Q3 on port 3004 with Q3_db.json

$(function() {
  const $list = $('#taskList');
  const $filter = $('#filterSelect');

  function renderTasks(tasks) {
    $list.empty();
    if (!tasks || tasks.length === 0) {
      $list.html('<div style="color:#999;padding:10px">No tasks found</div>');
      return;
    }

    tasks.forEach(t => {
      const $item = $(`
        <div class="task" data-id="${t.id}">
          <div>
            <input type="checkbox" class="completeToggle" ${t.completed ? 'checked' : ''}> 
            <strong>${t.title}</strong> <small style="color:#666;margin-left:8px">(${t.priority})</small>
          </div>
          <div>${t.completed ? '<em style="color:green">Done</em>' : '<em style="color:#888">Pending</em>'}</div>
        </div>
      `);
      $list.append($item);
    });
  }

  // Load tasks with optional filter
  function loadTasks(filterVal) {
    let url = `${API_BASE_Q3}/tasks`;
    if (filterVal === 'completed') {
      url += '?completed=true';
    } else if (filterVal) {
      // use ?priority=High etc
      url += '?priority=' + encodeURIComponent(filterVal);
    }

    $list.html('<div style="padding:12px;color:#777">Loading…</div>');

    $.get(url).done(function(data) {
      renderTasks(data);
    }).fail(function() {
      $list.html('<div style="color:#b30000;padding:12px">Failed to load tasks</div>');
    });
  }

  // toggle completed via PATCH
  $list.on('change', '.completeToggle', function() {
    const $checkbox = $(this);
    const $row = $checkbox.closest('.task');
    const id = $row.data('id');
    const newVal = $checkbox.is(':checked');

    // optimistically update label
    $row.find('div:last').html(newVal ? '<em style="color:green">Done</em>' : '<em style="color:#888">Pending</em>');

    $.ajax({
      url: `${API_BASE_Q3}/tasks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify({ completed: newVal })
    }).fail(function() {
      // revert UI on failure
      $checkbox.prop('checked', !newVal);
      $row.find('div:last').html(!newVal ? '<em style="color:green">Done</em>' : '<em style="color:#888">Pending</em>');
      alert('Failed to update status');
    });
  });

  $filter.on('change', function() {
    loadTasks(this.value);
  });

  // initial load
  loadTasks('');
});