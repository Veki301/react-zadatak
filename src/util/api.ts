import { INewsListFilter } from "../model/news/INews";
import { filterCategory, searchList } from "./filter";

const baseUrl = 'https://www.alpha-orbital.com/';
const newsUrl = 'last-100-news.json';
const imageUrl = 'assets/images/post_img/';
const articleUrl = '/news/';

export const fetchNews = async(query: INewsListFilter) => {
    const res = await fetch(baseUrl + newsUrl);
    const data = await res.json();
    let filteredList = data;

    if (query.filter) {
        filteredList = filterCategory(filteredList, query.filter);
    }

    if (query.query) {
        filteredList = searchList(filteredList, query.query);
    }
    
    return filteredList;
}

/** Resolve article URL from given id/slug */
export const resolveArticleUrl = (id: string) => {
    return baseUrl + articleUrl + id;
}

/** Resolve image URL from given id/slug */
export const resolveImgUrl = (id: string) => {
    return baseUrl + imageUrl + id;
}
