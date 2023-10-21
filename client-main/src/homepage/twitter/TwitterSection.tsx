import React, { Component } from 'react';
import axios from 'axios';
import { config } from 'config';
import {
  ScreenContentSection,
  ScreenContentBody,
  ScreenContentHeading,
  ActionScreenSubheading,
  ButtonNavLink,
  LoadingScreen,
  NoContent
} from '@igg/common';
import styled from '@emotion/styled';
import { deviceScreenQuery, colors } from '@igg/common/lib/styleSettings';
import { TweetModel } from './types';
import Slider from 'react-slick';
import LatestTweetCard from './LatestTweetCard';

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

export const BackgroundContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    height: 300,
    width: '200%',
    position: 'absolute',
    left: '-50%',
    top: '5%',
    zIndex: -1,
    backgroundColor: colors.action,
    transform: 'skew(-35deg)',
    borderRadius: 85,

    [`@media ${deviceScreenQuery.small}`]: {
      width: '100vw',
      maxWidth: 1115,
      height: 400
    }
  }
});

export const ContentContainer = styled('div')({
  maxWidth: '1175px',
  width: '100%',
  height: '100%',
  margin: '0 auto',
  padding: '50px 30px',

  [`@media ${deviceScreenQuery.medium}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '50px 60px'
  }
});

export const TwitterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

interface TwitterContentProps {
  isSlider?: boolean;
}

export const TwitterContent = styled('div')(
  ({ isSlider }: TwitterContentProps) => ({
    width: '100%',

    [`@media ${deviceScreenQuery.small}`]: {
      width: isSlider ? '280px' : '50%',
      paddingBottom: isSlider ? 0 : 50
    },

    [`@media ${deviceScreenQuery.xsmallDown}`]: {
      marginTop: isSlider ? 20 : 0
    }
  })
);

export const TwitterTextContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: 60,

  [`@media ${deviceScreenQuery.medium}`]: {
    paddingRight: 120
  },

  [`@media ${deviceScreenQuery.xsmallDown}`]: {
    paddingRight: 0,
    marginTop: 20,

    '& > *': {
      textAlign: 'center'
    }
  }
});

export const TwitterButtonContainer = styled('div')({
  marginTop: 15
});

export const FadeoutContainer = styled('div')({});

const sliderSettings = {
  dots: false,
  slidesToShow: 2.3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  infinite: true,
  vertical: true,
  arrows: false,
  verticalSwiping: true,
  rtl: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        vertical: false,
        verticalSwiping: false,
        rtl: false
      }
    }
  ]
};

export class TwitterSection extends Component {
  state = {
    loading: true,
    error: false,
    tweets: [] as TweetModel[]
  };

  componentDidMount() {
    httpClient
      .get(`/twitter/get-latest`)
      .then(res => {
        const tweets = res.data.tweets;
        this.setState({ tweets, loading: false });
      })
      .catch(e => {
        console.error(e); // TODO: Handle this properly
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    const { loading, error, tweets } = this.state;
    if (loading) {
      return <LoadingScreen />;
    }
    if (error || !tweets) {
      return <NoContent message="Error" note="Please try again later" />;
    }
    return (
      <BackgroundContainer>
        <FadeoutContainer className="fadeout-elements-join">
          <ContentContainer>
            <ScreenContentSection>
              <ScreenContentBody>
                <TwitterContainer>
                  <TwitterContent>
                    <TwitterTextContent>
                      <ScreenContentHeading data-cy="aut-l-sign-up-header">
                        Join our Community
                      </ScreenContentHeading>
                      <ActionScreenSubheading data-cy="aut-l-sign-up-subheader">
                        Build a profile of victories over your opponents in
                        various games.
                      </ActionScreenSubheading>
                      <TwitterButtonContainer>
                        <ButtonNavLink to="/signup" secondary={true} data-cy="aut-b-community-sign-up">
                          Sign Up
                        </ButtonNavLink>
                      </TwitterButtonContainer>
                    </TwitterTextContent>
                  </TwitterContent>
                  <TwitterContent isSlider={true}>
                    <Slider
                      {...sliderSettings}
                      className="fadeout-elements-signup"
                    >
                      {tweets.map(tweet => (
                        <LatestTweetCard tweet={tweet} key={tweet.id} />
                      ))}
                    </Slider>
                  </TwitterContent>
                </TwitterContainer>
              </ScreenContentBody>
            </ScreenContentSection>
          </ContentContainer>
        </FadeoutContainer>
      </BackgroundContainer>
    );
  }
}

export default TwitterSection;
