import { images } from './data.js';
import { filterImages, sortImages } from './utils.js';
import { renderGallery } from './gallery.js';
import { openModal, initModal } from './modal.js';

const galleryContainer = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');

let filteredImages = images;

function updateGallery() {
  const searchTerm = searchInput.value.trim();
  const category = categorySelect.value;
  const sortBy = sortSelect.value;

  filteredImages = filterImages(images, searchTerm, category);
  filteredImages = sortImages(filteredImages, sortBy);

  renderGallery(filteredImages, galleryContainer, openModal);
}

searchInput.addEventListener('input', updateGallery);
categorySelect.addEventListener('change', updateGallery);
sortSelect.addEventListener('change', updateGallery);

// Инициализация модального окна с текущим набором изображений
initModal(filteredImages);

// Начальная отрисовка
updateGallery();