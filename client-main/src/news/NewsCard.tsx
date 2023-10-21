import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardHeaderCell,
  CardContent,
  CardMainSection,
  CardContentCell,
  CardContentActions
} from 'shared/card';
import { NewsModel } from './types';
import { StatusLabel } from 'shared/StatusLabel';
import styled from '@emotion/styled';
import { ButtonNavLink } from '@igg/common';
import { NavLink } from 'react-router-dom';
import isPropValid from '@emotion/is-prop-valid';

const NewsDate = styled('div')({
  fontSize: 11,
  textTransform: 'uppercase',

  '&:not(:last-child)': {
    marginBottom: 8
  }
});

const NewsText = styled('div')({
  fontSize: 13,
  lineHeight: '1.5em',
  height: '3em',
  color: 'rgba(255, 255, 255, 0.55)',
  overflow: 'hidden',
  wordBreak: 'break-word',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',

  '&:not(:last-child)': {
    marginBottom: 18
  }
});

const NewsContainer = styled('div')({
  height: '160px',
  alignContent: 'flex-start',
  marginTop: 10
});

const StyledNavLink = styled(NavLink)({
  width: '100%',
  textDecoration: 'none',
});

export interface NewsHeaderImageProps {
  imagePath?: string;
}

export const NewsHeaderImage = styled('div')(
  ({ imagePath }: NewsHeaderImageProps) => ({
    width: '100%',
    height: '160px',
    backgroundSize: 'cover',
    backgroundImage: 'url(' + imagePath + ')',
    backgroundPosition: 'center center'
  })
);

export const NewsCardTitle = styled('span')({
  marginBottom: 10,
  fontSize: 18,
  fontWeight: 400,
  lineHeight: '1.3em',
  height: '2.6em',
  color: 'white',
  textAlign: 'left',
  textDecoration: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',

  '&:hover': {
    textDecoration: 'none'
  }
});

export const NewsCardTitleLink = styled(NewsCardTitle.withComponent(NavLink), {
  shouldForwardProp: prop => isPropValid(prop)
})();

export const NewsCardStyled = styled(Card)({
  padding: 10,
  '&:hover, &:hover:focus': {
    backgroundColor: '#4d3e74'
  }
});

export function formatDate(dateString: string) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return(date.toLocaleDateString('en-GB', options));
}

export interface NewsCardProps {
  news: NewsModel;
}

export class NewsCard extends Component<NewsCardProps> {
  render() {
    const {
      news
    } = this.props;

    return (
      <NewsCardStyled>
        <CardHeader>
          <StyledNavLink to={`/news/${news.slug}`}>
            <NewsHeaderImage imagePath={news.imageUrl}>
              <CardHeaderCell main={true}>
                <StatusLabel text={news.newsCategory.name} />
              </CardHeaderCell>
            </NewsHeaderImage>
          </StyledNavLink>
        </CardHeader>

        <CardMainSection>
          <CardContent padding={10}>
            <NewsContainer>
              <CardContentCell main={true} forceAlignStart={true}>
                <NewsDate>{formatDate(news.published)}</NewsDate>
                <NewsCardTitleLink to={`/news/${news.slug}`} >{news.title}</NewsCardTitleLink>
                <NewsText>{news.text.substr(0, 200).replace(/<\/?[^>]+(>|$)/g, "")}</NewsText>
                <CardContentActions>
                  <ButtonNavLink to={`/news/${news.slug}`} inverse={true} small={true}>Read more</ButtonNavLink>
                </CardContentActions>
              </CardContentCell>
            </NewsContainer>
          </CardContent>
        </CardMainSection>
      </NewsCardStyled>
    );
  }
}

export default  NewsCard;
