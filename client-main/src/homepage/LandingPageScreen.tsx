import React, { Component } from 'react';
import {
  ScreenLayout,
  StarBackground
} from '@igg/common';
import LatestNewsListSection from '../news/LatestNewsListSection';
import AppFooter from 'core/AppFooter';
import PartnerSliderSection from './partners/PartnerSliderSection';
import LandingHeaderSection from './header/LandingHeaderSection';
import AlphaSection from './alpha/AlphaSection';
import TokenSection from './token/TokenSection';
import TwitterSection from './twitter/TwitterSection';
import BetaSection from './beta/BetaSection';
import BarriersSection from './barriers-solution/BarriersSection';
import styled from '@emotion/styled';
import SolutionSection from './barriers-solution/SolutionSection';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import Helmet from 'react-helmet';

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

export class LandingPageScreen extends Component {
  render() {
    return (
      <>
        <Helmet
          meta={[
            { property: 'og:title', content: 'Intergalactic Gaming' },
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
          <title>Intergalactic Gaming</title>
        </Helmet>

        <ScreenLayout>
          <StarBackground />
          <LimitedMaxWidthContainer>
            <LandingHeaderSection />
            <PaddingContainer>
              <TokenSection />

              <BetaSection />

              <AlphaSection />

              <BarriersSection />

              <SolutionSection />

              <LatestNewsListSection />
            </PaddingContainer>

            <PartnerSliderSection />

            <TwitterSection />
            <AppFooter />
          </LimitedMaxWidthContainer>
        </ScreenLayout>
      </>
    );
  }
}

export default LandingPageScreen;
