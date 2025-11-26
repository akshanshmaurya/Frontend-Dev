"use strict";

// Q5 - Image Gallery with Modal Preview
const galleryRoot = document.getElementById('gallery');
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

// sample image sources (public placeholder images)
const images = [
  'https://picsum.photos/id/1015/800/600',
  'https://picsum.photos/id/1025/800/600',
  'https://picsum.photos/id/1035/800/600',
  'https://picsum.photos/id/1041/800/600',
  'https://picsum.photos/id/1052/800/600',
  'https://picsum.photos/id/1060/800/600'
];

function buildGallery() {
  galleryRoot.innerHTML = '';
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src + '?auto=compress';
    img.alt = `Image ${idx+1}`;
    img.dataset.index = idx;
    galleryRoot.appendChild(img);
  });
}

// Open modal with selected image
function openModalBySrc(src) {
  modalImage.src = src;
  modalOverlay.classList.remove('hidden');
}

// Close modal
function closeModal() {
  modalOverlay.classList.add('hidden');
  // remove src to stop large downloads when closed
  modalImage.src = '';
}

// Event delegation for gallery clicks
galleryRoot.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img) return;
  openModalBySrc(img.src);
});

// Clicking outside modalContent should close modal
modalOverlay.addEventListener('click', () => closeModal());

// Clicking inside modalContent should NOT close modal (stopPropagation)
modalContent.addEventListener('click', (e) => e.stopPropagation());

// close button
modalClose.addEventListener('click', closeModal);

// keyboard escape
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// init
buildGallery();

// export for tests if needed
if (typeof module !== 'undefined' && module.exports) module.exports = { images, openModalBySrc, closeModal };
