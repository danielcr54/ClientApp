import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardHeaderCell,
  CardContent,
  CardMainSection,
  CardConsoleIcon,
  CardTitle
} from 'shared/card';
import { GameModel } from './types';
import styled from '@emotion/styled';
import { IoLogoPlaystation, IoLogoXbox } from 'react-icons/io';

export interface GameCoverProps {
  imagePath?: string;
}

export const GameCover = styled('div')(
  ({ imagePath }: GameCoverProps) => ({
    width: '100%',
    height: '500px',
    backgroundSize: 'cover',
    backgroundImage: typeof imagePath !== 'undefined' ? 'url(' + imagePath + ')' : 'url(https://images-na.ssl-images-amazon.com/images/I/51iPRvQ6jBL.jpg)'
  })
);

export const GameCoverInactive = styled('div')(
  ({ imagePath }: GameCoverProps) => ({
    width: '100%',
    height: '500px',
    backgroundSize: 'cover',
    backgroundImage: typeof imagePath !== 'undefined' ? 'url(' + imagePath + ')' : 'url(https://images-na.ssl-images-amazon.com/images/I/51iPRvQ6jBL.jpg)',
    '-moz-filter': 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")',
    '-o-filter': 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")',
    '-webkit-filter': 'grayscale(100%)',
    filter: 'gray',
  })
);

export interface GameCardProps {
  game: GameModel;
}

export const StyledGameCardTitle = styled(CardTitle)({
  marginBottom: 0
});

export class NewsCard extends Component<GameCardProps> {
  render() {
    const {
      game
    } = this.props;

    return (
      <Card>
        <CardHeader>
          <CardContent forceHorizontal={true}>
            <CardHeaderCell main={true}>
              <StyledGameCardTitle>
              {game.active ? (
                "Available on IGG"
              ) : (
                "Coming soon"
              )}
              </StyledGameCardTitle>
            </CardHeaderCell>
            <CardHeaderCell alignEnd={true}>
              {game.psnReady && (
                <CardConsoleIcon>
                  <IoLogoPlaystation />
                </CardConsoleIcon>
              )}
              {game.xboxReady && (
                <CardConsoleIcon>
                  <IoLogoXbox />
                </CardConsoleIcon>
              )}
            </CardHeaderCell>
          </CardContent>
        </CardHeader>

        <CardMainSection>
          {game.active ? (
            <GameCover imagePath={game.coverUrl} />
          ) : (
            <GameCoverInactive imagePath={game.coverUrl} />
          )}
        </CardMainSection>
      </Card>
    );
  }
}

export default  NewsCard;
