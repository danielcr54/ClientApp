import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { FaTimes } from 'react-icons/fa';
import { StarBackground, ScreenLayout, ScreenBodyLayout, ScreenContent, ScreenContentContainer } from './';

const ErrorScreenRoot = styled('div')({
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

const ErrorScreenIcon = styled('div')({
  fontSize: 36,
  lineHeight: 1,
  color: 'rgba(255, 255, 255, 0.8)',

  '&:not(:last-of-type)': {
    marginBottom: 15
  }
});

const ErrorScreenMessage = styled('div')({
  fontSize: 18,
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 1)',
  lineHeight: 1.3,

  '&:not(:last-of-type)': {
    marginBottom: 8
  }
});

const ErrorScreenNote = styled('div')({
  fontSize: 13,
  color: 'rgba(255, 255, 255, 0.55)',
  lineHeight: 1.3
});

export const LimitedMaxWidthContainer = styled('div')({
  maxWidth: 1300,
  width: '100%',
  margin: '0 auto'
});

export interface ErrorScreenProps {
  title: string;
  children: ReactNode;
}

export function ErrorScreen(props: ErrorScreenProps) {
  return (
    <>
      <Helmet
        meta=
        {
          [
            {"property": "og:title", "content": "IG | Unknown Error!"},
            {"property": "og:url", "content": "https://www.iggalaxy.com"},
            {"property": "og:image", "content": "https://www.iggalaxy.com/ig.png"},
            {"property": "og:description", "content": "Welcome to the IGGalaxy! We're Intergalactic Gaming, an esports organisation dedicated to evolving the future of online competitive gaming. Through the IGGalaxy, we will unite the fragmented esports landscape, rewarding all participants regardless of skill level! Join the IGGalaxy to take your gaming to the next level."},
          ]
        }
      >
        <title>IG | Unknown Error!</title>
      </Helmet>
      <ScreenLayout>
        <StarBackground />
        <LimitedMaxWidthContainer>
          <ScreenBodyLayout>
            <ScreenContent>
              <ScreenContentContainer>
                <ErrorScreenRoot>
                  <ErrorScreenIcon>
                    <FaTimes />
                  </ErrorScreenIcon>
                  <ErrorScreenMessage>{props.title}</ErrorScreenMessage>
                  <ErrorScreenNote>{props.children}</ErrorScreenNote>
                </ErrorScreenRoot>
              </ScreenContentContainer>
            </ScreenContent>
          </ScreenBodyLayout>
        </LimitedMaxWidthContainer>
      </ScreenLayout>
    </>
  );
}

export default ErrorScreen;
