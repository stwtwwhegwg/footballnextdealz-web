const newsContainer = document.getElementById('news-container');

async function fetchNews() {
  newsContainer.innerHTML = '<p>Lade News...</p>';
  try {
    // Beispiel API: Fußball-News (ersetze durch deine echte API oder eine schnelle News-API)
    const response = await fetch('https://newsapi.org/v2/top-headlines?category=sports&q=football&apiKey=DEINE_API_KEY');
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = '<p>Keine News gefunden.</p>';
      return;
    }

    newsContainer.innerHTML = '';
    data.articles.forEach(article => {
      const articleEl = document.createElement('article');
      articleEl.innerHTML = `
        <h2><a href="${article.url}" target="_blank" rel="noopener">${article.title}</a></h2>
        <p>${article.description || ''}</p>
      `;
      newsContainer.appendChild(articleEl);
    });
  } catch (error) {
    newsContainer.innerHTML = '<p>Fehler beim Laden der News.</p>';
    console.error(error);
  }
}

// News alle 5 Minuten automatisch aktualisieren
fetchNews();
setInterval(fetchNews, 300000);
