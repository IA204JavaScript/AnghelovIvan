export function renderGallery(images, container, onImageClick) {
  container.innerHTML = '';
  images.forEach((image, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${image.url}" alt="${image.title}" data-index="${index}">`;
    div.addEventListener('click', () => onImageClick(index));
    container.appendChild(div);
  });
}
