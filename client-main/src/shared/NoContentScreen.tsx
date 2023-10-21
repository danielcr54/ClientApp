import React from 'react';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { FaTimes } from 'react-icons/fa';
import { StarBackground, ScreenLayout, LandingNav, ScreenBodyLayout, ScreenContent, ScreenContentContainer } from '@igg/common/lib';
import AppFooter from 'core/AppFooter';

const NoContentRoot = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px 20px',
  backgroundColor: 'rgba(59, 50, 82, 0.3)',
  borderRadius: 2,
  textAlign: 'center',
  margin: '20px 0px',
  height: 500
});

const NoContentIcon = styled('div')({
  fontSize: 36,
  lineHeight: 1,
  color: 'rgba(255, 255, 255, 0.8)',

  '&:not(:last-of-type)': {
    marginBottom: 15
  }
});

const NoContentMessage = styled('div')({
  fontSize: 18,
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 1)',
  lineHeight: 1.3,

  '&:not(:last-of-type)': {
    marginBottom: 8
  }
});

const NoContentNote = styled('div')({
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)',
  lineHeight: 1.3
});

export const LimitedMaxWidthContainer = styled('div')({
  maxWidth: 1300,
  width: '100%',
  margin: '0 auto'
});

export function NoContentScreen() {
  return (
    <>
      <Helmet
        meta=
        {
          [
            {"property": "og:title", "content": "IG | 404 - No Signs of Life!"},
            {"property": "og:url", "content": "https://www.iggalaxy.com"},
            {"property": "og:image", "content": "https://www.iggalaxy.com/ig.png"},
            {"property": "og:description", "content": "Welcome to the IGGalaxy! We're Intergalactic Gaming, an esports organisation dedicated to evolving the future of online competitive gaming. Through the IGGalaxy, we will unite the fragmented esports landscape, rewarding all participants regardless of skill level! Join the IGGalaxy to take your gaming to the next level."},
          ]
        }
      >
        <title>IG | 404 - No Signs of Life!</title>
      </Helmet>
      <ScreenLayout>
        <StarBackground />
        <LimitedMaxWidthContainer>
          <LandingNav />
          <ScreenBodyLayout>
            <ScreenContent>
              <ScreenContentContainer>
                <NoContentRoot>
                  <NoContentIcon>
                    <FaTimes />
                  </NoContentIcon>
                  <NoContentMessage>Sorry, we've searched the entire IGGalaxy and have not found what you were searching for!</NoContentMessage>
                  <NoContentNote>Please search again ensuring your coordinates are correct!</NoContentNote>
                </NoContentRoot>
              </ScreenContentContainer>
            </ScreenContent>
          </ScreenBodyLayout>
          <AppFooter />
        </LimitedMaxWidthContainer>
      </ScreenLayout>
    </>
  );
}

export default NoContentScreen;
