import React, { Component } from 'react';
import axios from 'axios';
import { config } from 'config';
import {
  ScreenLayout,
  LandingNav,
  ScreenContentHeading,
  LoadingScreen,
  StarBackground
} from '@igg/common';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AppFooter from 'core/AppFooter';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import LatestNewsListSection from './LatestNewsListSection';
import { NewsModel } from './types';
import { StatusLabel } from 'shared/StatusLabel';
import qs from 'query-string';
import './custom.css';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton,
  FacebookIcon,
  GooglePlusIcon,
  LinkedinIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  EmailIcon
} from 'react-share';
import Helmet from 'react-helmet';
import NoContentScreen from 'shared/NoContentScreen';

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

export const HeaderTextContainer = styled('div')({
  width: '100%',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 30
});

export interface HeaderImageContainerProps {
  imagePath?: string;
}

const HeaderImageContainer = styled('div')(
  ({ imagePath }: HeaderImageContainerProps) => ({
    [`@media ${deviceScreenQuery.xsmall}`]: {
      height: 200
    },
    [`@media ${deviceScreenQuery.small}`]: {
      height: 350
    },
    [`@media ${deviceScreenQuery.medium}`]: {
      display: 'none'
    },
    background: 'url(' + imagePath + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  })
);

const HeaderNoMobileNav = styled('div')({
  [`@media ${deviceScreenQuery.smallDown}`]: {
    display: 'none'
  }
});

const NewsArticleContent = styled('p')({
  paddingBottom: 30
});

const NewsArticleText = styled('div')({});

const NewsArticleInfoBar = styled('div')({
  width: '100%',
  display: 'flex',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
  borderRadius: 2,
  borderStyle: 'solid',
  backgroundColor: '#28223d',
  marginBottom: 30,
  height: 150,
  flexDirection: 'column',

  [`@media ${deviceScreenQuery.medium}`]: {
    width: '35%',
    marginLeft: 30,
    marginBottom: 40,
    float: 'right'
  }
});

const NewsArticleInfoBarItem = styled('div')({
  width: '50%',
  height: '100%',
  borderRight: 2,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '& > *': {
    textTransform: 'uppercase'
  }
});

const NewsArticleInfoBarHeading = styled('div')({
  fontSize: 14,
  color: 'rgba(255, 255, 255, 0.55)'
});

const NewsArticleInfoBarContentText = styled('div')({
  fontSize: 17,
  padding: 5,
  width: '100%',
  textAlign: 'center',
  lineHeight: 1
});

const NewsArticleInfoBarRow = styled('div')({
  display: 'flex',
  width: '100%',
  height: '50%'
});

const NewsArticleDateStatusContainer = styled('div')({
  display: 'flex'
});

const NewsArticleDate = styled('div')({
  display: 'inline-flex',
  fontSize: 18,
  fontWeight: 400,
  textTransform: 'uppercase',

  '&:not(:last-child)': {
    marginRight: 18
  }
});

const NewsArticleImage = styled('img')({
  height: '100%',
  maxHeight: 400,
  marginBottom: 40,
  [`@media ${deviceScreenQuery.smallDown}`]: {
    display: 'none'
  }
});

export const LimitedMaxWidthContainer = styled('div')({
  maxWidth: 1175,
  width: '100%',
  margin: '0 auto'
});

export const PaddingContainer = styled('div')({
  width: '100%',
  padding: '0px 30px 50px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '0px 60px 50px'
  }
});

export const HeaderFullImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 50
});

export const SocialContainer = styled('div')({
  display: 'flex',
  marginBottom: 30,
  flexWrap: 'wrap',

  '& > *': {
    cursor: 'pointer',
    marginRight: 15,
    marginBottom: 15
  }
});

export const StyledScreenBody = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  paddingTop: 0,

  [`@media ${deviceScreenQuery.smallDown}`]: {
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export interface NewsArticleDetailScreenProps {
  slug: string;
}

export interface NewsArticleDetailScreenState {
  loading: boolean;
  error: boolean;
  newsArticle: NewsModel | undefined;
}

export function formatDate(dateString: string, longDate: boolean) {
  const options = {
    day: 'numeric',
    month: longDate ? 'long' : 'short',
    year: 'numeric'
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options);
}

export function getShareUrl(slug: string) {
  let url = '';

  if (typeof window !== 'undefined') {
    url = location.protocol + '//' + location.host + '/news/' + slug; // (or whatever)
  }

  return url;
}

export class NewsArticleDetailScreen extends Component<
  NewsArticleDetailScreenProps,
  NewsArticleDetailScreenState
> {
  constructor(props: NewsArticleDetailScreenProps) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      newsArticle: (Object as unknown) as NewsModel
    };
  }

  componentDidMount() {
    const { slug } = this.props;
    httpClient
      .get(`/news/${slug}`)
      .then(res => {
        const newsArticle = res.data.newsArticle;
        this.setState({ newsArticle, loading: false });
      })
      .catch(e => {
        const id = qs.parse(location.search).id as string;
        httpClient
          .get(`/news.php?id=${encodeURIComponent(id)}`)
          .then(res => {
            const newsArticle = res.data.newsArticle;
            this.setState({ newsArticle, loading: false });
          })
          .catch(er => {
            console.error(er); // TODO: Handle this properly
            this.setState({ loading: false, error: true });
          });
      });
  }

  render() {
    const { loading, error, newsArticle } = this.state;

    if (loading) {
      return <LoadingScreen />;
    }
    if (error || !newsArticle) {
      return <NoContentScreen />;
    }
    return (
      <>
        <Helmet
          meta={[
            { property: 'og:title', content: 'IG | ' + newsArticle.title },
            { property: 'og:url', content: getShareUrl(newsArticle.slug) },
            { property: 'og:image', content: newsArticle.imageUrl },
            {
              property: 'og:description',
              content:
                newsArticle.text.substr(0, 200).replace(/<\/?[^>]+(>|$)/g, '') +
                '...'
            }
          ]}
        >
          <title>IG | {newsArticle.title}</title>
        </Helmet>

        <ScreenLayout>
          <StarBackground />
          <LimitedMaxWidthContainer>
            <PaddingContainer>
              <HeaderImageContainer imagePath={newsArticle.imageUrl}>
                <LandingNav />
              </HeaderImageContainer>
              <HeaderNoMobileNav>
                <LandingNav />
              </HeaderNoMobileNav>
              <HeaderFullImageContainer>
                <NewsArticleImage src={newsArticle.imageUrl} />
              </HeaderFullImageContainer>

              <HeaderTextContainer>
                <NewsArticleDateStatusContainer>
                  <NewsArticleDate>
                    {formatDate(newsArticle.published, true)}
                  </NewsArticleDate>
                  <StatusLabel text={newsArticle.newsCategory.name} />
                </NewsArticleDateStatusContainer>
                <ScreenContentHeading>{newsArticle.title}</ScreenContentHeading>
              </HeaderTextContainer>

              <NewsArticleContent>
                <NewsArticleInfoBar>
                  <NewsArticleInfoBarRow>
                    <NewsArticleInfoBarItem>
                      <NewsArticleInfoBarHeading>
                        Author
                      </NewsArticleInfoBarHeading>
                      <NewsArticleInfoBarContentText>
                        {newsArticle.authorTemp}
                      </NewsArticleInfoBarContentText>
                    </NewsArticleInfoBarItem>
                    <NewsArticleInfoBarItem>
                      <NewsArticleInfoBarHeading>
                        Category
                      </NewsArticleInfoBarHeading>
                      <NewsArticleInfoBarContentText>
                        {newsArticle.newsCategory.name}
                      </NewsArticleInfoBarContentText>
                    </NewsArticleInfoBarItem>
                  </NewsArticleInfoBarRow>
                  <NewsArticleInfoBarRow>
                    <NewsArticleInfoBarItem>
                      <NewsArticleInfoBarHeading>
                        Date Published
                      </NewsArticleInfoBarHeading>
                      <NewsArticleInfoBarContentText>
                        {formatDate(newsArticle.published, false)}
                      </NewsArticleInfoBarContentText>
                    </NewsArticleInfoBarItem>
                    <NewsArticleInfoBarItem>
                      <NewsArticleInfoBarHeading>
                        Read Time
                      </NewsArticleInfoBarHeading>
                      <NewsArticleInfoBarContentText>
                        {newsArticle.readTime} Minutes
                      </NewsArticleInfoBarContentText>
                    </NewsArticleInfoBarItem>
                  </NewsArticleInfoBarRow>
                </NewsArticleInfoBar>
                <NewsArticleText
                  dangerouslySetInnerHTML={{ __html: newsArticle.text }}
                />
              </NewsArticleContent>
              <SocialContainer>
                <FacebookShareButton url={getShareUrl(newsArticle.slug)}>
                  <FacebookIcon />
                </FacebookShareButton>
                <GooglePlusShareButton url={getShareUrl(newsArticle.slug)}>
                  <GooglePlusIcon />
                </GooglePlusShareButton>
                <LinkedinShareButton url={getShareUrl(newsArticle.slug)}>
                  <LinkedinIcon />
                </LinkedinShareButton>
                <TwitterShareButton url={getShareUrl(newsArticle.slug)}>
                  <TwitterIcon />
                </TwitterShareButton>
                <TelegramShareButton url={getShareUrl(newsArticle.slug)}>
                  <TelegramIcon />
                </TelegramShareButton>
                <WhatsappShareButton url={getShareUrl(newsArticle.slug)}>
                  <WhatsappIcon />
                </WhatsappShareButton>
                <PinterestShareButton
                  url={getShareUrl(newsArticle.slug)}
                  media={newsArticle.imageUrl}
                >
                  <PinterestIcon />
                </PinterestShareButton>
                <RedditShareButton url={getShareUrl(newsArticle.slug)}>
                  <RedditIcon />
                </RedditShareButton>
                <TumblrShareButton url={getShareUrl(newsArticle.slug)}>
                  <TumblrIcon />
                </TumblrShareButton>
                <EmailShareButton url={getShareUrl(newsArticle.slug)}>
                  <EmailIcon />
                </EmailShareButton>
              </SocialContainer>
              <LatestNewsListSection />
              <AppFooter />
            </PaddingContainer>
          </LimitedMaxWidthContainer>
        </ScreenLayout>
      </>
    );
  }
}

export interface NewsArticleDetailScreenRouteParams {
  slug: string;
}

export function NewsArticleDetailScreenConnected({
  match
}: RouteComponentProps<NewsArticleDetailScreenRouteParams>) {
  return <NewsArticleDetailScreen slug={match.params.slug} />;
}

export default withRouter(NewsArticleDetailScreenConnected);
