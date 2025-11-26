"use strict";

/* Q1 - Dynamic Product List Manager
   - add new products
   - inline edit via input element
   - delete items
   - uses event delegation on <ul id="productList">
   - auto-save when clicking outside the edited element
*/

const inputEl = document.getElementById('productInput');
const addBtn = document.getElementById('addBtn');
const listRoot = document.getElementById('productList');

let products = []; // simple in-memory store
let editingItemId = null; // id of item currently in edit mode

function renderList() {
  listRoot.innerHTML = '';

  if (products.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-note';
    empty.textContent = 'No products yet — add one above.';
    listRoot.appendChild(empty);
    return;
  }

  products.forEach(item => {
    const li = document.createElement('li');
    li.dataset.id = item.id;

    // name (either span or input if editing)
    const nameWrap = document.createElement('div');
    nameWrap.className = 'item-name';
    if (editingItemId === item.id) {
      const editInput = document.createElement('input');
      editInput.className = 'edit-input';
      editInput.value = item.name;
      editInput.dataset.id = item.id;
      editInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          finishEdit(item.id, editInput.value.trim());
        } else if (e.key === 'Escape') {
          cancelEdit();
        }
      });
      // stop propagation to avoid outside click handler saving immediately when typing inside
      editInput.addEventListener('click', e => e.stopPropagation());
      nameWrap.appendChild(editInput);
    } else {
      const span = document.createElement('span');
      span.textContent = item.name;
      nameWrap.appendChild(span);
    }

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn edit';
    editBtn.textContent = 'Edit';
    editBtn.dataset.action = 'edit';
    editBtn.dataset.id = item.id;

    const delBtn = document.createElement('button');
    delBtn.className = 'action-btn delete';
    delBtn.textContent = 'Delete';
    delBtn.dataset.action = 'delete';
    delBtn.dataset.id = item.id;

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(nameWrap);
    li.appendChild(actions);

    listRoot.appendChild(li);
  });
}

function addProduct(name) {
  const newItem = { id: Date.now().toString(36), name };
  products.push(newItem);
  renderList();
}

function startEdit(itemId) {
  editingItemId = itemId;
  renderList();
  // focus the input
  const input = document.querySelector(`input.edit-input[data-id="${itemId}"]`);
  if (input) input.focus();
}

function finishEdit(itemId, newName) {
  if (!newName) {
    // if empty, don't change
    cancelEdit();
    return;
  }
  const idx = products.findIndex(p => p.id === itemId);
  if (idx > -1) products[idx].name = newName;
  editingItemId = null;
  renderList();
}

function cancelEdit() {
  editingItemId = null;
  renderList();
}

function deleteItem(itemId) {
  products = products.filter(p => p.id !== itemId);
  if (editingItemId === itemId) editingItemId = null;
  renderList();
}

// Event delegation: handle clicks from the <ul>
listRoot.addEventListener('click', e => {
  const actionBtn = e.target.closest('button[data-action]');
  if (!actionBtn) return; // not an action button

  const action = actionBtn.dataset.action;
  const id = actionBtn.dataset.id;

  if (action === 'edit') {
    startEdit(id);
  } else if (action === 'delete') {
    deleteItem(id);
  }
});

// Auto-save: if click outside an edit input, commit the edit
// Use document click to detect outside clicks
document.addEventListener('click', e => {
  // If we're not editing, nothing to do
  if (!editingItemId) return;

  // If click is inside the edited input, do nothing
  const inside = e.target.closest(`li[data-id="${editingItemId}"]`);
  if (inside) return; // still inside the edited item

  // Otherwise, get current input value and save
  const input = document.querySelector(`input.edit-input[data-id="${editingItemId}"]`);
  if (input) {
    finishEdit(editingItemId, input.value.trim());
  } else {
    cancelEdit();
  }
});

// Add product from controls
addBtn.addEventListener('click', () => {
  const val = inputEl.value.trim();
  if (!val) return;
  addProduct(val);
  inputEl.value = '';
  inputEl.focus();
});

// Add on Enter key in main input
inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addBtn.click();
  }
});

// initial render
renderList();

// Exports for testing (Node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addProduct, startEdit, finishEdit, deleteItem, products };
}
