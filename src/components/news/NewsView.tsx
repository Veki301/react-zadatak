import React, { useEffect, useMemo, useState } from 'react';
import { INews } from '../../model/news/INews';
import { getCategorizedNewsMap, getCategoryLabel } from '../../util/categoryUtils';
import DeleteDropdown from '../common/DeleteDropdown';
import LabeledNumberDisplay from '../common/LabeledNumberDisplay';
import NewsList from './list/NewsList';
import NewsListFilter from './list/NewsListFilter';

//////////////////////////
//  Consts and styles   //
//////////////////////////

//////////////////
//  Interfaces  //
//////////////////

export interface INewsViewOwnProps {
    news: INews[];
    allNews?: INews[];
}

//////////////////
//  Component   //
//////////////////

const NewsView: React.FC<INewsViewOwnProps> = (props) => {
    const [displayedNews, setDisplayedNews] = useState(props.news);
    const [allNews, setAllNews] = useState(props.allNews);

    useEffect(() => {
        setDisplayedNews(props.news)
    }, [props.news]);

    useEffect(() => {
        if (!props.allNews) return;
        setAllNews(props.allNews);
    }, [props.allNews]);
    
    const handleRefetch = () => {
        setAllNews(props.allNews);
    }

    const handleDeleteArticle = (id: string) => {
        const newArticles = displayedNews.filter((article) => article.slug !== id);
        setDisplayedNews(newArticles);
    }

    const handleDeleteCategory = (id: string) => {
        const filteredAllNews = allNews?.filter((article) => article.post_category_id !== id);
        const filteredDisplayedNews = displayedNews.filter((article) => article.post_category_id !== id);
        if (filteredAllNews) {
            setAllNews(filteredAllNews);
        }
        setDisplayedNews(filteredDisplayedNews);
    }

    const categories = useMemo(() => {
        if(!allNews) return;
        return getCategorizedNewsMap(allNews);
    }, [allNews]);

    const getDropdownOptions = () => {
        return categories ? Object.keys(categories).map((category) => {
            return {
                id: category,
                name: getCategoryLabel(category)
            }
        }) : [];
    }

    return (
        <React.Fragment>
            <NewsListFilter categories={categories} news={allNews} onRefetch={handleRefetch} />
            <LabeledNumberDisplay label={'Total articles:'} number={displayedNews.length} />
            <DeleteDropdown dropdownOptions={getDropdownOptions()} onDelete={handleDeleteCategory} />
            <hr />
            <NewsList onDelete={handleDeleteArticle} news={displayedNews} />
        </React.Fragment>
    );
}

export default NewsView;