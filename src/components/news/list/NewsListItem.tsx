import React from 'react';
import { INews } from '../../../model/news/INews';
import commonStyleVariables from '../../../styles/variables';
import { resolveArticleUrl, resolveImgUrl } from '../../../util/api';
import parse from 'html-react-parser';
import { css } from '@emotion/css';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const articleContainerCss = css`
    padding: ${commonStyleVariables.paddings.large};
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    margin: ${commonStyleVariables.margins.medium} auto;
    display: flex;
    width: 600px;
`

const articleCss = css`
    width: 100%;
    text-align: center;
    margin-left: ${commonStyleVariables.margins.xs}
`

const deleteButtonContainerCss = css`
    height: 10px;
    text-align: end;
    span {
        display: inline-block;
        height: 15px;
        width: 15px;
        button {
            display: none;
        }
    }
    span:hover {
        button {
            display: block;
        }
    }
`

const dateCss = css`
    text-align: end;
`

const titleCss = css`
    display: inline-block;
    width: 80%;
`

//////////////////
//  Interfaces  //
//////////////////

export interface INewsListItemOwnProps {
    article: INews;
    onDelete: (id: string) => void;
}

//////////////////
//  Component   //
//////////////////

const NewsListItem: React.FC<INewsListItemOwnProps> = (props) => {
    const articleId = props.article.slug;
    const articleElement = parse(props.article.excerpt);

    const handleClick = () => {
        props.onDelete(articleId);
    }

    return (
        <article className={articleContainerCss}>
            <a href={resolveArticleUrl(articleId)} target="_blank">
                <img src={resolveImgUrl(props.article.post_thumbnail)} />
            </a>
            <div className={articleCss}>
                <div className={deleteButtonContainerCss}>
                    <span>
                        <button onClick={handleClick}>X</button>
                    </span>
                </div>
                <a className={titleCss} href={resolveArticleUrl(articleId)} target="_blank">{props.article.title}</a>

                {articleElement}

                <a href={resolveArticleUrl(articleId)} target="_blank">Full article</a>
                <div className={dateCss}>{props.article.date}</div>
            </div>
        </article>
    );
}

export default NewsListItem;