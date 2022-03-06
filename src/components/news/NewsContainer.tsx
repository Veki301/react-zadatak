import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { INews } from '../../model/news/INews';
import { fetchNews } from '../../util/api';
import NewsView from './NewsView';

//////////////////////////
//  Consts and styles   //
//////////////////////////

//////////////////
//  Interfaces  //
//////////////////

export interface INewsContainerOwnProps {
    data: INews[];
}

//////////////////
//  Component   //
//////////////////

/** News container for requests and routing logic */
const NewsContainer: React.FC<INewsContainerOwnProps> = (props) => {
    const {data}: UseQueryResult<INews[]> = useQuery<INews[]>('news', () => fetchNews({}));

    return (
        <React.Fragment>
            <NewsView news={props.data} allNews={data} />
        </React.Fragment>
    )
}

export default NewsContainer;