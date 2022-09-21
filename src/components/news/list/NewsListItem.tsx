import React from 'react';
import { INews } from '../../../model/news/INews';
import commonStyleVariables from '../../../styles/variables';
import { resolveArticleUrl, resolveImgUrl } from '../../../util/api';
import parse from 'html-react-parser';
import { css } from '@emotion/css';
import styled from '@emotion/styled';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const articleContainerCss = css`
  padding: ${commonStyleVariables.paddings.large};
  margin: ${commonStyleVariables.margins.medium} auto;
  width: 100%;
  background-color: black;
`;

const ImageContainer = styled.div`
  width: 50%;
  img {
    object-fit: cover;
    width: auto;
    height: 300px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
`;

const Article = styled.div`
  width: 50%;
  text-align: left;
  margin-left: ${commonStyleVariables.margins.xs};
`;

const Header = styled.div`
  height: 20px;
  text-align: end;
  span {
    display: inline-block;
    height: 25px;
    width: 25px;
    button {
      display: none;
    }
  }
  span:hover {
    button {
      display: block;
    }
  }
`;

const DateContainer = styled.div`
  font-size: 12px;
  color: lightgray;
`;

const Footer = styled.div`
  margin: ${commonStyleVariables.margins.xs};
  text-align: right;
  color: lightblue;
`;

const titleCss = css`
  display: inline-block;
  width: 80%;
`;

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
  };

  return (
    <article className={articleContainerCss}>
      <Header>
        <span>
          <button onClick={handleClick}>X</button>
        </span>
      </Header>
      <ContentContainer>
        <ImageContainer>
          <a href={resolveArticleUrl(articleId)} target="_blank">
            <img src={resolveImgUrl(props.article.post_thumbnail)} />
          </a>
        </ImageContainer>
        <Article>
          <h3>
            <a
              className={titleCss}
              href={resolveArticleUrl(articleId)}
              target="_blank"
            >
              {props.article.title}
            </a>
          </h3>

          <DateContainer>{props.article.date}</DateContainer>

          {articleElement}
        </Article>
      </ContentContainer>
      <Footer>
        <a href={resolveArticleUrl(articleId)} target="_blank">
          Full article
        </a>
      </Footer>
    </article>
  );
};

export default NewsListItem;
