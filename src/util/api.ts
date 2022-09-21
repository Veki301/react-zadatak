const baseUrl = 'https://www.alpha-orbital.com/';
const newsUrl = 'last-100-news.json';
const imageUrl = 'assets/images/post_img/';
const articleUrl = '/news/';

export const fetchNews = async () => {
  const res = await fetch(baseUrl + newsUrl);
  const data = await res.json();

  return data;
};

/** Resolve article URL from given id/slug */
export const resolveArticleUrl = (id: string) => {
  return baseUrl + articleUrl + id;
};

/** Resolve image URL from given id/slug */
export const resolveImgUrl = (id: string) => {
  return baseUrl + imageUrl + id;
};
