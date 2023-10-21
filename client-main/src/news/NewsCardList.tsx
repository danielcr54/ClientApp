import React, { Component } from 'react';
import axios from 'axios';
import { config } from 'config';
import { CardList, CardListItem } from 'shared/card';
import { NewsModel } from './types';
import NewsCard from './NewsCard';
import styled from '@emotion/styled';

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

const StyledCardListItem = styled(CardListItem)({
  [`@media (max-width: 976px) and (min-width: 614px)`]: {
    '&:last-child': {
      display: 'none'
    }
  }
});

export class NewsCardList extends Component {

  state = {
    latestNews: [] as NewsModel[]
  }

  componentDidMount() {
    httpClient.get(`/news/get-latest`)
      .then(res => {
        const latestNews = res.data.latestNews;
        this.setState({ latestNews });
      })
  }

  render() {
    return (
      <CardList>
        {this.state.latestNews.map(news => (
          <StyledCardListItem key={news.id}>
            <NewsCard news={news} />
          </StyledCardListItem>
        ))}
      </CardList>
    );
  }
}

export default NewsCardList;
