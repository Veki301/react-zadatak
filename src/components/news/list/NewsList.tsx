import React from 'react';
import { INews } from '../../../model/news/INews';
import NewsListItem from './NewsListItem';

//////////////////////////
//  Consts and styles   //
//////////////////////////

//////////////////
//  Interfaces  //
//////////////////

export interface INewsListOwnProps {
    news: INews[];
    onDelete: (id: string) => void;
}

//////////////////
//  Component   //
//////////////////

const NewsList: React.FC<INewsListOwnProps> = (props) => {
    return (
        <React.Fragment>
            {props.news.map((article) => {
                return <NewsListItem key={article.slug} onDelete={props.onDelete} article={article} />
            })}
        </React.Fragment>
    );
}

export default NewsList;