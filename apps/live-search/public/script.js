const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
let timeoutId;

searchInput.addEventListener('input', () => {
  clearTimeout(timeoutId);
  const query = searchInput.value.trim();

  if (query === '') {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  timeoutId = setTimeout(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/fruits?q=${query}`
      );
      const data = await response.json();

      if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
      }

      resultsContainer.innerHTML = data
        .map(fruit => `<div class="result-item">${fruit.name}</div>`)
        .join('');

      document.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', () => {
          searchInput.value = item.textContent;
          resultsContainer.innerHTML = '';
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 700);
});
