import { css } from '@emotion/css';
import { useRouter } from 'next/router';
import React from 'react';
import { UrlObject } from 'url';
import { INews, INewsListFilter, NewsCategoryEnum } from '../../../model/news/INews';
import commonStyleVariables from '../../../styles/variables';
import { getCategoryLabel, ICategoryMap } from '../../../util/categoryUtils';
import SearchForm from '../../common/SearchForm';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const filterButtonCss = css`
    margin: 0 ${commonStyleVariables.margins.xs};
`

//////////////////
//  Interfaces  //
//////////////////

export interface INewsListFilterOwnProps {
    categories?: ICategoryMap;
    news?: INews[];
    onRefetch: () => void;
}

//////////////////
//  Component   //
//////////////////

/** Filter component for news list */
const NewsListFilter: React.FC<INewsListFilterOwnProps> = (props) => {
    const router = useRouter();
    const filter = router.query as INewsListFilter;
    const changeRoute = (filter: INewsListFilter) => {
        const url: UrlObject = {pathname: '/', query: { ...filter}}
        router.push(url);
    }
    
    const handleClick = (value: string) => {
        changeRoute({ filter: value});
    }

    const handleClickRefetch = () => {
        props.onRefetch();
    }

    const handleSubmit = (value?: string) => {
        changeRoute({...filter, query: value});
    }

    return (
        <React.Fragment>
            {props.news && props.news.length < 100 && <button onClick={handleClickRefetch}>Refetch</button>}
            <button className={filterButtonCss} onClick={() => handleClick(NewsCategoryEnum.ALL)}>Show all</button>
            {
                props.categories && Object.entries(props.categories).map(([category, articles]) => {
                    if (!articles.length) return; // if category doesn't have any articles, dont render anything
                    return (
                        <button key={category} className={filterButtonCss} onClick={() => handleClick(category)}>
                            {`${getCategoryLabel(category)}`}
                        </button>
                    );
                })
            }
            <SearchForm value={filter.query} onSubmit={handleSubmit} />
        </React.Fragment>
    );
}

export default NewsListFilter;