import Fuse from "fuse.js";
import { INews, NewsCategoryEnum } from "../model/news/INews";

const searchOptions = {
    includeScore: true,
    // Search in `title` and in `excerpt` array
    keys: ['title', 'excerpt']
}

export const filterCategory = (list: INews[], categoryId: string) => {
    if (categoryId === NewsCategoryEnum.ALL) return list;
    return list.filter((listItem) => listItem.post_category_id === categoryId);
}

export const searchList = (list: INews[], searchTerm: string) => {
    const fuse = new Fuse(list, searchOptions);
    const result = fuse.search(searchTerm ?? '');

    return result.map((item) => item.item);
}