import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { INews } from '../../model/news/INews';
import { fetchNews } from '../../util/api';
import { getCategorizedNewsMap } from '../../util/categoryUtils';
import { filterCategory, searchList } from '../../util/filter';
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

  // throw new Error();

  if (error) {
    throw new Error(error);
  }

  const [news, setNews] = useState(data || []);

  const handleDeleteArticle = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?'))
      return;
    const newArticles = news.filter((article) => article.slug !== id);
    setNews(newArticles);
  };

  const handleDeleteCategory = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?'))
      return;
    const filteredNews = news.filter(
      (article) => article.post_category_id !== id
    );
    setNews(filteredNews);
  };

  const categories = useMemo(() => {
    if (!news) return;
    return getCategorizedNewsMap(news);
  }, [news]);

  const displayedNews = useMemo(() => {
    let filteredNews = news;
    if (query.filter) {
      filteredNews = filterCategory(filteredNews, query.filter as string);
    }
    if (query.query) {
      filteredNews = searchList(filteredNews, query.query as string);
    }
    return filteredNews;
  }, [query, news]);

  return (
    <React.Fragment>
      <NewsListFilter
        categories={categories}
        news={news}
        onRefetch={refetch}
        onDeleteCategory={handleDeleteCategory}
      />
      <LabeledNumberDisplay
        prefix={'Currently showing'}
        number={displayedNews.length}
        suffix={'articles'}
      />
      <NewsList onDelete={handleDeleteArticle} news={displayedNews} />
    </React.Fragment>
  );
};

export default NewsView;
