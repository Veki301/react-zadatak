export interface INews {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    post_image: string;
    post_thumbnail: string;
    post_category_id: string;
}

export interface INewsListFilter {
    filter?: string;
    query?: string;
}

export enum NewsCategoryEnum {
    ALL = 'ALL',
    X_UNIVERSE = '1',
    ELITE_DANGEROUS = '2',
    STARPOINT_GEMINI = '3',
    EVE_ONLINE = '4',
}