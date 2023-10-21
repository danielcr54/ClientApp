import React, { Component } from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { deviceScreenQuery, colors } from '../styleSettings';
import { ActionScreenHeaderStart, ScreenHeaderNavButton } from '..';
import { LogoLink } from '.';

const LinkContainer = styled('div')({
  zIndex: 999,

  '& > *': {
    marginLeft: 40
  }
});

const HeaderNavLink = styled(NavLink)({
  fontSize: 18,
  color: '#ffffff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none'
  },

  [`@media ${deviceScreenQuery.smallDown}`]: {
    display: 'none'
  }
});

const LitepaperNavLink = styled('a')({
  fontSize: 18,
  color: '#ffffff',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none'
  },

  [`@media ${deviceScreenQuery.smallDown}`]: {
    display: 'none'
  }
});

const HeaderNavBurgerMenu = styled('div')({
  [`@media ${deviceScreenQuery.medium}`]: {
    display: 'none'
  }
});

const StyledActionScreenHeader = styled('header')({
  display: 'flex',
  alignItems: 'center',
  padding: '25px 0px',
  maxWidth: '1175px',
  width: '100%',
  margin: '0 auto'
});

const StyledActionScreenHeaderEnd = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

interface MenuItemRoot {
  selected?: boolean;
}

const MenuItemRoot = styled(NavLink)(({ selected }: MenuItemRoot) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: selected ? colors.main : 'transparent',
  transition: 'all 0.2s',
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: selected ? colors.main : '#764cb3',
    textDecoration: 'none',
    cursor: selected ? 'default' : 'pointer'
  }
}));

interface LitepaperMenuItemRoot {
  selected?: boolean;
}

const LitepaperMenuItemRoot = styled('a')(
  ({ selected }: LitepaperMenuItemRoot) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: selected ? colors.main : 'transparent',
    transition: 'all 0.2s',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: selected ? colors.main : '#764cb3',
      textDecoration: 'none',
      cursor: selected ? 'default' : 'pointer'
    }
  })
);

const FullWidthNav = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: '#211843',
  top: 0,
  left: 0,
  zIndex: 999
});

const HeaderRow = styled('div')({
  width: '100%',
  padding: 30,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const MobileNavContent = styled('div')({
  width: '100%',
  padding: 40
});

const MobileNavContainer = styled('div')({
  width: '100%',
  paddingTop: 40
});

const MobileNavLink = styled(NavLink)({
  fontSize: 40,
  textDecoration: 'none',
  color: '#ffffff'
});

const LitepaperNavLinkMobile = styled('a')({
  fontSize: 40,
  textDecoration: 'none',
  color: '#ffffff'
});

export const CloseButton = styled('button')({
  flexGrow: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  borderRadius: '50%',
  border: 0,
  fontSize: 14,
  backgroundColor: '#735f8f',
  color: 'white',
  textAlign: 'center',
  marginRight: 10,
  outline: 'none',

  '&:hover': {
    cursor: 'pointer'
  }
});

const NavLogoText = styled(NavLink)({
  marginLeft: 15,
  fontFamily: 'RadioSpace',
  fontSize: 25,
  zIndex: 999,
  color: 'white',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'none'
  },

  [`@media ${deviceScreenQuery.mediumDown}`]: {
    display: 'none'
  }
});

export class LandingNav extends Component {
  state = {
    showComponent: false
  };

  constructor(props: any) {
    super(props);
    this.navOpen = this.navOpen.bind(this);
    this.navClose = this.navClose.bind(this);
  }

  navOpen() {
    this.setState({
      showComponent: true
    });
  }

  navClose() {
    this.setState({
      showComponent: false
    });
  }

  render() {
    return (
      <StyledActionScreenHeader>
        <ActionScreenHeaderStart>
          <LogoLink to="/" />
          <NavLogoText to="/">Intergalactic Gaming</NavLogoText>
        </ActionScreenHeaderStart>
        <StyledActionScreenHeaderEnd>
          <LinkContainer>
            <HeaderNavLink to="/">Home</HeaderNavLink>
            <HeaderNavLink to="/news">News</HeaderNavLink>
            {/* <LitepaperNavLink href="https://iggalaxy.s3-eu-west-1.amazonaws.com/litepaper.pdf">
              IG LitePaper
            </LitepaperNavLink> */}
            <HeaderNavLink to="/login">Log In</HeaderNavLink>
            <HeaderNavLink to="/signup">Sign Up</HeaderNavLink>
          </LinkContainer>

          <HeaderNavBurgerMenu>
            <ScreenHeaderNavButton onClick={this.navOpen}>
              <FiMenu />
            </ScreenHeaderNavButton>
            {this.state.showComponent ? (
              <FullWidthNav>
                <HeaderRow>
                  <LogoLink to="/" />
                  <CloseButton onClick={this.navClose}>x</CloseButton>
                </HeaderRow>
                <MobileNavContent>
                  <MobileNavContainer>
                    <MobileNavLink to="/">Home</MobileNavLink>
                  </MobileNavContainer>
                  <MobileNavContainer>
                    <MobileNavLink to="/news">News</MobileNavLink>
                  </MobileNavContainer>
                  {/* <MobileNavContainer>
                    <LitepaperNavLinkMobile href="https://iggalaxy.s3-eu-west-1.amazonaws.com/litepaper.pdf">
                      IG LitePaper
                    </LitepaperNavLinkMobile>
                  </MobileNavContainer> */}
                  <MobileNavContainer>
                    <MobileNavLink to="/login">Login</MobileNavLink>
                  </MobileNavContainer>
                  <MobileNavContainer>
                    <MobileNavLink to="/signup">Sign Up</MobileNavLink>
                  </MobileNavContainer>
                </MobileNavContent>
              </FullWidthNav>
            ) : null}
          </HeaderNavBurgerMenu>
        </StyledActionScreenHeaderEnd>
      </StyledActionScreenHeader>
    );
  }
}

export default LandingNav;
