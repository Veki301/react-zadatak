import { INews, NewsCategoryEnum } from "../model/news/INews";

/** Simple interface for dynamically setting all possible categories in one iteration */
export interface ICategoryMap {
    [categoryId: string]: INews[];
}

export enum CategoryLabels {
    X_UNIVERSE = 'X Universe',
    ELITE_DANGEROUS = 'Elite Dangerous',
    STARPOINT_GEMINI = 'Starpoint Gemini',
    EVE_ONLINE = 'Eve Online',
    UNKNOWN = 'Unknown',
}

/** Defaults to "Unknown" if category outside of exisiting enum appears (the value of category is represented numerically so it doesn't make much sense to display that value) */
export const getCategoryLabel = (id: string) => {
    switch(id) {
        case NewsCategoryEnum.ELITE_DANGEROUS: return CategoryLabels.ELITE_DANGEROUS;
        case NewsCategoryEnum.EVE_ONLINE: return CategoryLabels.EVE_ONLINE;
        case NewsCategoryEnum.STARPOINT_GEMINI: return CategoryLabels.STARPOINT_GEMINI;
        case NewsCategoryEnum.X_UNIVERSE: return CategoryLabels.X_UNIVERSE;
        default: return CategoryLabels.UNKNOWN;
    }
}

export const getCategorizedNewsMap = (news: INews[]) => {
    // declare empty category map obj
    let categoryMap: ICategoryMap = {};

    news.forEach((article) => {
        // reference current article category in map
        const oldCategoryArticles = categoryMap[article.post_category_id];
        // create new category array from existing articles (if they exist), otherwise set an empty array
        const newCategoryArticles = oldCategoryArticles ? [...oldCategoryArticles] : [];
        // add current article to given category
        newCategoryArticles.push(article);
        // set new array of articles to current category
        categoryMap[article.post_category_id] = newCategoryArticles;
    });

    return categoryMap;
}