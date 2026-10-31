const key = import.meta.env.VITE_CURRENTS_API_KEY;

const BASE_URL = "https://api.currentsapi.services/v1";

async function fetchNews(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.msg || "Failed to fetch news");
  }

  return data.news || [];
}

export async function getLatestNews() {
  return fetchNews(`${BASE_URL}/latest-news`);
}

export async function searchNews(keyword) {
  const params = new URLSearchParams({
    keywords: keyword,
  });

  return fetchNews(`${BASE_URL}/search?${params}`);
}

export async function getNewsByCategory(category) {
  const supportedCategories = ["health", "sports", "technology"];

  const params = new URLSearchParams();

  if (supportedCategories.includes(category)) {
    params.set("category", category);
  } else {
    params.set("keywords", category);
  }

  return fetchNews(`${BASE_URL}/search?${params}`);
}
