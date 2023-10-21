import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import qs from 'query-string';
import axios from 'axios';
import { config } from 'config';
import {
  ScreenLayout,
  LandingNav,
  ButtonNavLink,
  NoContent,
  LoadingScreen,
  Dropdown,
  SelectLikeButton,
  DropdownContent,
  StarBackground
} from '@igg/common';
import AppFooter from 'core/AppFooter';
import { NewsModel, PageInfo, NewsCategory } from './types';
import { CardList, CardListItem } from 'shared/card';
import NewsCard from './NewsCard';
import styled from '@emotion/styled';
import { deviceScreenQuery, colors } from '@igg/common/lib/styleSettings';
import PaginationLinks from 'shared/PaginationLinks';
import { GoSearch } from 'react-icons/go';
import { SearchFilter } from 'shared/SearchFilter';
import Helmet from 'react-helmet';
import NoContentScreen from 'shared/NoContentScreen';

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

const NewsCardListItem = styled(CardListItem)({
  [`@media ${deviceScreenQuery.medium}`]: {
    '&:first-child': {
      gridColumnStart: 1,
      gridColumnEnd: 3
    }
  }
});

const NewsTitle = styled('div')({
  fontSize: 45,
  marginBottom: 18,
  textAlign: 'center',
  marginTop: 50,

  [`@media ${deviceScreenQuery.small}`]: {
    fontSize: 65
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 90,
    textAlign: 'left'
  }
});

const NewsSearchContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginBottom: 25,

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  },

  '& > *': {
    [`@media ${deviceScreenQuery.smallDown}`]: {
      marginBottom: 18
    }
  }
});

const NewsSearchText = styled('div')({
  width: '100%',
  fontSize: 12,
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 300,
  textAlign: 'center',

  [`@media ${deviceScreenQuery.medium}`]: {
    width: '50%',
    fontSize: 17,
    textAlign: 'left'
  }
});

const NewsSearchCriteriaContainer = styled('div')({
  width: '100%',

  [`@media ${deviceScreenQuery.medium}`]: {
    width: '25%',
    paddingLeft: 15
  }
});

const NewsCategoriesSelectDropdown = styled(Dropdown)({
  width: '100%',
  height: 27
});

const NewsCategoriesSelectMenu = styled('div')({
  width: '100%',
  maxHeight: 250,
  overflowY: 'scroll'
});

const NewsCategoriesMenuItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: 'transparent',
  transition: 'all 0.2s',
  color: 'rgba(255, 255, 255, 0.55)',
  fontSize: 11,

  '&:hover': {
    backgroundColor: '#764cb3',
    color: colors.white,
    cursor: 'pointer'
  },

  '&:active': {
    backgroundColor: colors.main,
    color: colors.white
  }
});

const NewsBottomJoinContainer = styled('div')({
  width: '100%',
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#36304f',
  marginBottom: 18,
  marginTop: 30
});

const NewsBottomJoinTitle = styled('div')({
  fontSize: 50,
  fontWeight: 500,
  textAlign: 'center',
  marginBottom: 25,

  [`@media ${deviceScreenQuery.small}`]: {
    fontSize: 60
  }
});

const NewsBottomJoinText = styled('div')({
  fontSize: 18,
  textAlign: 'center',
  color: 'rgba(255,255,255,0.7)',
  lineHeight: 1.7,
  marginBottom: 25
});

const NewsBottomButtonContainer = styled('div')({
  textAlign: 'center'
});

export const LimitedMaxWidthContainer = styled('div')({
  maxWidth: 1175,
  width: '100%',
  margin: '0 auto'
});

export const PaddingContainer = styled('div')({
  width: '100%',
  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '0px 60px 50px'
  }
});

export interface AllNewsListScreenState {
  loading: boolean;
  newsArticles: NewsModel[];
  newsCategories: NewsCategory[];
  pageInfo: PageInfo;
  totalCount: number;
  error?: any;
}

export class AllNewsListScreen extends Component<
  RouteComponentProps,
  AllNewsListScreenState
> {
  state = {
    loading: true,
    newsArticles: new Array<NewsModel>(),
    newsCategories: new Array<NewsCategory>(),
    pageInfo: (Object as unknown) as PageInfo,
    totalCount: (Object as unknown) as number,
    error: undefined
  };

  componentDidMount() {
    let page = qs.parse(location.search).page as string;
    if (page === undefined) {
      page = '1';
    }

    let searchString = qs.parse(location.search).search as string;
    if (searchString === undefined) {
      searchString = '%';
    }

    let category = qs.parse(location.search).category as string;
    if (category === undefined) {
      category = '%';
    }

    httpClient
      .get(
        `/news/get-all/${encodeURIComponent(page)}/${encodeURIComponent(
          searchString
        )}/${encodeURIComponent(category)}`
      )
      .then(res => {
        const newsArticles = res.data.newsArticles.items;
        const pageInfo = res.data.newsArticles.pageInfo;
        const totalCount = res.data.newsArticles.totalCount;
        this.setState({ newsArticles, pageInfo, totalCount, loading: false });
      })
      .catch(e => {
        console.error(e); // TODO: Handle this properly
        this.setState({ loading: false, error: true });
      });

    httpClient.get(`/news/get-categories`).then(res => {
      const newsCategories = res.data.newsCategories;
      this.setState({ newsCategories });
    });
  }

  componentDidUpdate(previousProps: any) {
    if (
      qs.parse(location.search).page !==
        qs.parse(previousProps.location.search).page ||
      qs.parse(location.search).search !==
        qs.parse(previousProps.location.search).search ||
      qs.parse(location.search).category !==
        qs.parse(previousProps.location.search).category
    ) {
      let page = qs.parse(location.search).page as string;
      if (page === undefined) {
        page = '1';
      }

      let searchString = qs.parse(location.search).search as string;
      if (searchString === undefined) {
        searchString = '%';
      }

      let category = qs.parse(location.search).category as string;
      if (category === undefined) {
        category = '%';
      }

      httpClient
        .get(
          `/news/get-all/${encodeURIComponent(page)}/${encodeURIComponent(
            searchString
          )}/${encodeURIComponent(category)}`
        )
        .then(res => {
          const newsArticles = res.data.newsArticles.items;
          const pageInfo = res.data.newsArticles.pageInfo;
          const totalCount = res.data.newsArticles.totalCount;
          this.setState({ newsArticles, pageInfo, totalCount, loading: false });
        })
        .catch(e => {
          console.error(e); // TODO: Handle this properly
          this.setState({ loading: false, error: true });
        });
    }
  }

  render() {
    const {
      loading,
      error,
      newsArticles,
      newsCategories,
      pageInfo,
      totalCount
    } = this.state;

    if (loading) {
      return <LoadingScreen />;
    }
    if (error) {
      return <NoContentScreen />;
    }
    return (
      <>
        <Helmet
          meta={[
            { property: 'og:title', content: 'IG | News' },
            { property: 'og:url', content: 'https://www.iggalaxy.com' },
            {
              property: 'og:image',
              content: 'https://www.iggalaxy.com/ig.png'
            },
            {
              property: 'og:description',
              content:
                "Welcome to the IGGalaxy! We're Intergalactic Gaming, an esports organisation dedicated to evolving the future of online competitive gaming. Through the IGGalaxy, we will unite the fragmented esports landscape, rewarding all participants regardless of skill level! Join the IGGalaxy to take your gaming to the next level."
            }
          ]}
        >
          <title>IG | News</title>
        </Helmet>

        <ScreenLayout>
          <StarBackground />
          <LimitedMaxWidthContainer>
            <PaddingContainer>
              <LandingNav />
              <NewsTitle>Intergalactic News</NewsTitle>
              <NewsSearchContainer>
                <NewsSearchText>
                  Stay up to date with all the latest updates from the IGGalaxy!
                </NewsSearchText>
                <NewsSearchCriteriaContainer>
                  <NewsCategoriesSelectDropdown>
                    {({ isExpanded, toggle, hide }) => (
                      <>
                        <SelectLikeButton xsmall={true} onClick={toggle}>
                          News Categories
                        </SelectLikeButton>

                        <DropdownContent
                          visible={isExpanded}
                          alignRight={true}
                          stretch={true}
                        >
                          <NewsCategoriesSelectMenu>
                            <NewsCategoriesMenuItem
                              key="all-categories"
                              onClick={() => {
                                this.props.history.push('/news');
                                hide();
                              }}
                            >
                              All Categories
                            </NewsCategoriesMenuItem>
                            {newsCategories.map(newsCategory => (
                              <NewsCategoriesMenuItem
                                key={newsCategory.id}
                                onClick={() => {
                                  this.props.history.push(
                                    `?category=${encodeURIComponent(
                                      newsCategory.id || '%'
                                    )}`
                                  );
                                  hide();
                                }}
                              >
                                {newsCategory.name}
                              </NewsCategoriesMenuItem>
                            ))}
                          </NewsCategoriesSelectMenu>
                        </DropdownContent>
                      </>
                    )}
                  </NewsCategoriesSelectDropdown>
                </NewsSearchCriteriaContainer>
                <NewsSearchCriteriaContainer>
                  <SearchFilter
                    placeholder="Search news"
                    onSubmit={value => {
                      this.props.history.push(
                        `?search=${encodeURIComponent(value || '%')}`
                      );
                    }}
                  />
                </NewsSearchCriteriaContainer>
              </NewsSearchContainer>
              {newsArticles.length ? (
                <>
                  <CardList>
                    {newsArticles.map(news => (
                      <NewsCardListItem key={news.id}>
                        <NewsCard news={news} />
                      </NewsCardListItem>
                    ))}
                  </CardList>
                  <PaginationLinks
                    totalPages={Math.ceil(totalCount / pageInfo.pageSize)}
                    currentPage={pageInfo.page}
                  />
                </>
              ) : (
                <NoContent
                  icon={GoSearch}
                  message="Nothing found!"
                  note="Try searching again!"
                />
              )}

              <NewsBottomJoinContainer>
                <NewsBottomJoinTitle>Join our Community!</NewsBottomJoinTitle>
                <NewsBottomJoinText>
                  Interact with other Galacticans in the IGGalaxy to build your
                  reputation!
                </NewsBottomJoinText>
                <NewsBottomButtonContainer>
                  <ButtonNavLink to="/signup" secondary={true}>
                    Sign Up
                  </ButtonNavLink>
                </NewsBottomButtonContainer>
              </NewsBottomJoinContainer>

              <AppFooter />
            </PaddingContainer>
          </LimitedMaxWidthContainer>
        </ScreenLayout>
      </>
    );
  }
}

export function AllNewsListScreenConnected(props: any) {
  return (
    <AllNewsListScreen
      history={props.history}
      location={props.location}
      match={props.match}
    />
  );
}

export default AllNewsListScreenConnected;
