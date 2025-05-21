export function filterImages(images, search, category) {
  const searchLower = search.toLowerCase();
  return images.filter(img => {
    const matchCategory = category === 'all' || img.category === category;
    const matchSearch = img.title.toLowerCase().includes(searchLower);
    return matchCategory && matchSearch;
  });
}

export function sortImages(images, sortBy) {
  return [...images].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });
}
