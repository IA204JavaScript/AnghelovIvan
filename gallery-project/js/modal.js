const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let imagesList = [];

export function initModal(images) {
  imagesList = images;

  closeModalBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('visible')) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
  });
}

export function openModal(index) {
  currentIndex = index;
  updateModalContent();
  modal.classList.add('visible');
}

export function closeModal() {
  modal.classList.remove('visible');
}

function updateModalContent() {
  const img = imagesList[currentIndex];
  modalImg.src = img.url;
  modalImg.alt = img.title;
  modalTitle.textContent = img.title;
}

function showNext() {
  currentIndex = (currentIndex + 1) % imagesList.length;
  updateModalContent();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
  updateModalContent();
}
