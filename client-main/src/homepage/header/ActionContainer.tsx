import React, { Component } from 'react';
import styled from '@emotion/styled';
import { ButtonNavLink, CircleIconButton } from '@igg/common/lib';
import { deviceScreenQuery, colors } from '@igg/common/lib/styleSettings';
import { NavLink } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-scroll';

export const LandingHeaderText = styled('div')({
  width: '90%',
  [`@media ${deviceScreenQuery.medium}`]: {
    width: '50%'
  }
});

export const LandingHeaderTitle = styled('div')({
  fontSize: 30,
  fontWeight: 500,

  '&:not(:last-child)': {
    marginBottom: 18
  },

  [`@media ${deviceScreenQuery.small}`]: {
    fontSize: 35
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 45
  }
});

export const HeaderActionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',

  [`@media ${deviceScreenQuery.smallDown}`]: {
    display: 'none'
  }
});

export const ButtonContainer = styled('div')({
  height: 55,
  display: 'flex',
  alignItems: 'center',

  '& > *': {
    marginRight: 18
  }
});

export const StyledButtonNavLink = styled(ButtonNavLink)({
  padding: '15px 30px'
});

const NextScreenLinkRoot = styled(Link)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: colors.white,
  transition: 'all 0.2s',
  cursor: 'pointer',

  '&:hover': {
    color: colors.secondary
  }
});

const NextScreenLinkLabel = styled('div')({
  flex: 1,
  marginLeft: 15
});

const NextScreenLinkButton = styled(CircleIconButton)().withComponent('div');


export const SigninText = styled('div')({
  fontSize: 12,
  marginTop: 20,
  color: 'rgba(255, 255, 255, 0.7)'
});

export const SignInBadge = styled(NavLink)({
  display: 'inline-block',
  padding: '5px 10px',
  fontSize: 12,
  borderRadius: 2,
  backgroundColor: '#6c43a4',
  color: colors.white,
  textTransform: 'uppercase',
  margin: '0px 5px',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'none'
  }
});

export const HeaderActionMobileContainer = styled('div')({
  display: 'flex',

  '& > *': {
    marginRight: 18
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    display: 'none'
  }
});

export class ActionContainer extends Component {
  render() {
    return (
      <LandingHeaderText>
        <LandingHeaderTitle data-cy="aut-l-header-title">
          Embrace the Unexpected.
          <br />
          Unite the Unknown.
        </LandingHeaderTitle>
        <HeaderActionContainer>
          <ButtonContainer>
            <StyledButtonNavLink to="/signup" glow={true} data-cy="aut-b-sign-up">
              Sign Up
            </StyledButtonNavLink>
            <NextScreenLinkRoot
              to="learn_more"
              smooth={true}
              duration={500}
            >
              <NextScreenLinkButton>
                <FiChevronDown />
              </NextScreenLinkButton>
              <NextScreenLinkLabel data-cy="aut-b-learn-more">Learn More</NextScreenLinkLabel>
            </NextScreenLinkRoot>
          </ButtonContainer>
          <SigninText>
            Or <SignInBadge to="/login" data-cy="aut-b-log-in">Log In</SignInBadge> to your
            account
          </SigninText>
        </HeaderActionContainer>
        <HeaderActionMobileContainer>
          <StyledButtonNavLink to="/signup" glow={true}>
            Sign Up
          </StyledButtonNavLink>
        </HeaderActionMobileContainer>
      </LandingHeaderText>
    );
  }
}

export default ActionContainer;
