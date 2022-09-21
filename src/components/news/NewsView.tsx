import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { INews } from '../../model/news/INews';
import { fetchNews } from '../../util/api';
import {
  getCategorizedNewsMap,
  getCategoryLabel,
} from '../../util/categoryUtils';
import { filterCategory, searchList } from '../../util/filter';
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

export interface INewsViewOwnProps {}

//////////////////
//  Component   //
//////////////////

const NewsView: React.FC<INewsViewOwnProps> = (props) => {
  const { query } = useRouter();
  const { isLoading, error, data, refetch } = useQuery(['news'], fetchNews, {
    onSuccess: (data: INews[]) => {
      setNews(data);
    },
  });

  const [news, setNews] = useState(data || []);

  const handleDeleteArticle = (id: string) => {
    const newArticles = news.filter((article) => article.slug !== id);
    setNews(newArticles);
  };

  const handleDeleteCategory = (id: string) => {
    const filteredNews = news.filter(
      (article) => article.post_category_id !== id
    );
    setNews(filteredNews);
  };

  const categories = useMemo(() => {
    if (!news) return;
    return getCategorizedNewsMap(news);
  }, [news]);

  const getDropdownOptions = () => {
    return categories
      ? Object.keys(categories).map((category) => {
          return {
            id: category,
            name: getCategoryLabel(category),
          };
        })
      : [];
  };

  const getDisplayedNews = (): INews[] => {
    let filteredNews = news;
    if (query.filter) {
      filteredNews = filterCategory(filteredNews, query.filter as string);
    }
    if (query.query) {
      filteredNews = searchList(filteredNews, query.query as string);
    }
    return filteredNews;
  };

  return (
    <React.Fragment>
      <NewsListFilter categories={categories} news={news} onRefetch={refetch} />
      <LabeledNumberDisplay label={'Total articles:'} number={news.length} />
      <DeleteDropdown
        dropdownOptions={getDropdownOptions()}
        onDelete={handleDeleteCategory}
      />
      <hr />
      <NewsList onDelete={handleDeleteArticle} news={getDisplayedNews()} />
    </React.Fragment>
  );
};

export default NewsView;
