import React, { Component } from 'react';
import axios from 'axios';
import { config } from 'config';
import { GameModel } from './types';
import GameCard from './GameCard';
import { CardList, CardListItem } from 'shared/card';
import styled from '@emotion/styled';
import { deviceScreenQuery, buttonColors } from '@igg/common/lib/styleSettings';
import { ScreenContentHeading, ActionScreenSubheading } from '@igg/common';
import { NavLink } from 'react-router-dom';
import isPropValid from '@emotion/is-prop-valid';

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

interface StyledGameCardListItemProps {
  isSignUp?: boolean;
}

export const StyledGameCardListItem = styled(CardListItem)(
  ({ isSignUp }: StyledGameCardListItemProps) => ({
    order: isSignUp ? 1 : 0,

    [`@media (min-width: 595px)`]: {
      order: isSignUp ? 0 : 1
    }
  })
);

export const StyledGameCardList = styled(CardList)({
  [`@media ${deviceScreenQuery.small}`]: {
    gridTemplateColumns: `repeat(auto-fit, minmax(270px, 1fr))`
  }
});

export const GameSignupContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

export const GameSignupContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingRight: 40
});

export const GameSignupButton = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 40
});

interface HeaderButtonProps {
  isSignUp?: boolean;
}

export const HeaderButton = styled('button')(
  ({ isSignUp }: HeaderButtonProps) => ({
    flexGrow: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 25px 13px',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    border: 0,
    borderRadius: 2,
    textTransform: 'uppercase',
    backgroundColor: isSignUp ? '#fe6240' : buttonColors.inverse.background,
    boxShadow: 'none',
    transition: 'all 0.2s',
    color: isSignUp ? buttonColors.default.foreground : buttonColors.inverse.foreground,
    whiteSpace: 'nowrap',
    outline: 'none',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: isSignUp ? '#ff7e63' : buttonColors.inverse.hover.background,
        color: isSignUp ? buttonColors.default.foreground : buttonColors.inverse.hover.foreground,
        textDecoration: 'none',
        cursor: 'pointer'
    },
    '&:active, &:active:hover': {
        backgroundColor: isSignUp ? '#ff7e63' : buttonColors.inverse.hover.background,
        color: isSignUp ? buttonColors.default.foreground : buttonColors.inverse.hover.foreground,
        textDecoration: 'none',
        boxShadow: 'none'
    },
    '&:not(:last-child)': {
      marginRight: 18
    }
  })
);

export const HeaderButtonNavLink = styled(HeaderButton.withComponent(NavLink), {
  shouldForwardProp: prop => isPropValid(prop)
})();

export class GameCardList extends Component {

  state = {
    games: [] as GameModel[]
  }

  componentDidMount() {
    httpClient.get(`/games/get-all`)
      .then(res => {
        const games = res.data.games;
        this.setState({ games });
      })
  }

  render() {
    return (
      <StyledGameCardList>
        <StyledGameCardListItem isSignUp={true}>
          <GameSignupContainer>
            <GameSignupContent>
              <ScreenContentHeading>Lorem ipsum dolor sit</ScreenContentHeading>
              <ActionScreenSubheading>
                Build a profile of victories over your opponents in various games.
              </ActionScreenSubheading>
              <GameSignupButton>
                <HeaderButtonNavLink to="/signup" isSignUp={true}>Sign up</HeaderButtonNavLink>
              </GameSignupButton>
            </GameSignupContent>
          </GameSignupContainer>
        </StyledGameCardListItem>
        {this.state.games.map(game => (
          <StyledGameCardListItem key={game.id}>
            <GameCard game={game} />
          </StyledGameCardListItem>
        ))}
      </StyledGameCardList>
    );
  }
}

export default GameCardList;
