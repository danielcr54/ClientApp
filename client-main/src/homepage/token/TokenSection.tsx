import React, { Component } from 'react';
import { ScreenContentSection, ScreenContentBody } from '@igg/common';
import styled from '@emotion/styled';
import { deviceScreenQuery, colors } from '@igg/common/lib/styleSettings';
import tron from '../assets/tron.png';
import igtoken from '../assets/ig_token.png';
import iglogo from '../assets/ig_white.png';
import Slider from 'react-slick';
import TokenSliderContent from './TokenSliderContent';
import RocketIcon from '../assets/RocketIcon';

export const LandingTokenContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',

  [`@media ${deviceScreenQuery.small}`]: {
    flexDirection: 'row'
  }
});

export interface LandingTokenContentProps {
  padding?: boolean;
}

export const LandingTokenContent = styled('div')(
  ({ padding }: LandingTokenContentProps) => ({
    paddingRight: padding ? 80 : 40,
    paddingLeft: padding ? 80 : 0,
    width: '50%',
    [`@media ${deviceScreenQuery.smallDown}`]: {
      width: padding ? '25%' : '75%'
    },
    [`@media ${deviceScreenQuery.xsmallDown}`]: {
      marginBottom: 35,
      paddingRight: 0,
      paddingLeft: 0,
      width: '100%'
    }
  })
);

export const TokenImage = styled('img')({
  height: '100%'
});

export const ActiveTokenSliderDot = styled('div')({
  flexGrow: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 35,
  height: 35,
  borderRadius: '50%',
  borderWidth: 1,
  borderStyle: 'dashed',
  borderColor: colors.action
});

export const InactiveTokenSliderDot = styled('div')({
  flexGrow: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 35,
  height: 35,
  borderRadius: '50%'
});

export interface TokenSliderDotProps {
  active?: boolean;
}

export const TokenSliderDot = styled('div')(
  ({ active }: TokenSliderDotProps) => ({
    flexGrow: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: active ? colors.action : '#a09ea9'
  })
);

export const StyledRocketIcon = styled('div')({
  display: 'none',
  width: 55,
  height: 35,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 20
});

export const DotList = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const sliderTextSettings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: false,
  infinite: false,
  customPaging() {
    return (
      <DotList>
        <ActiveTokenSliderDot>
          <TokenSliderDot active={true} />
        </ActiveTokenSliderDot>
        <InactiveTokenSliderDot>
          <TokenSliderDot />
        </InactiveTokenSliderDot>
        <StyledRocketIcon>
          <RocketIcon />
        </StyledRocketIcon>
      </DotList>
    );
  }
};

const sliderImageSettings = {
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  arrows: false,
  infinite: false,
  fade: true,
  draggable: false
};

export class TokenSection extends Component {
  imageSlider: any;
  textSlider: any;

  state = {
    imageNav: this.imageSlider,
    textNav: this.textSlider
  };

  componentDidMount() {
    this.setState({
      imageNav: this.imageSlider,
      textNav: this.textSlider
    });
  }

  render() {
    return (
      <ScreenContentSection id="learn_more">
        <ScreenContentBody>
          <LandingTokenContainer>
            <LandingTokenContent padding={true}>
              <Slider
                {...sliderImageSettings}
                ref={imageSlider => (this.imageSlider = imageSlider)}
                asNavFor={this.state.textNav}
              >
                <TokenImage src={igtoken} />
                <TokenImage src={iglogo} />
                <TokenImage src={tron} />
              </Slider>
            </LandingTokenContent>
            <LandingTokenContent padding={false} id="token-slider-text">
              <Slider
                {...sliderTextSettings}
                ref={textSlider => (this.textSlider = textSlider)}
                asNavFor={this.state.imageNav}
              >
                <TokenSliderContent
                  heading="Become a Galactican!"
                  text="Participate in the Intergalactic Movement to democratise the competitive gaming landscape. Through our platform, all players regardless of skill will get rewarded for engaging with our ecosystem!"
                />
                <TokenSliderContent
                  heading="Our Mission"
                  text="Our mission is to interconnect the world through the love of gaming; to challenge socio-economical barriers by providing an ecosystem that encourages accessibility and inclusivity for ALL."
                />
                <TokenSliderContent
                  heading="Powered by the TRON Blockchain"
                  text="The TRON protocol is one of the largest and fastest growing blockchain networks in the world, boasting speeds over 2000 transactions per second (80 times faster than Ethereum)."
                />
              </Slider>
            </LandingTokenContent>
          </LandingTokenContainer>
        </ScreenContentBody>
      </ScreenContentSection>
    );
  }
}

export default TokenSection;
