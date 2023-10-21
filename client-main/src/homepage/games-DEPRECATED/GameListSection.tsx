import React, { Component } from 'react';
import {
  ScreenContentSection,
  ScreenContentBody,
} from '@igg/common';
import { GameCardList } from './GameCardList';

export class GameListSection extends Component {
  render() {
    return (
      <ScreenContentSection>
        <ScreenContentBody>
          <GameCardList />
        </ScreenContentBody>
      </ScreenContentSection>
    );
  }
}

export default GameListSection;
