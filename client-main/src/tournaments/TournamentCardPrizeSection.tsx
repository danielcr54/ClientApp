import React, { PureComponent } from 'react';
import { styleSettings } from '@igg/common';
import { CardSection, CardRow, CardCell } from '../shared/card';
import { LabeledTextBlock } from '../shared/LabeledTextBlock';
import { HexagonBadge, HexagonBadgeList } from '../shared/HexagonBadge';
import { TournamentPrizeModel, TournamentPrizeType } from './types';
import {
  TournamentPrizeBlock,
  TournamentPrizeFigure,
  TournamentPrizeTypeIconWrapper,
  TournamentPrizeTypeCashIconWrapper
} from './tournamentsElements';
import { formatPrizePlaceLabel } from './tournamentHelpers';

const { colors } = styleSettings;

function renderPrizeIconByType(prizeType: TournamentPrizeType) {
  if (prizeType === TournamentPrizeType.TOKEN) {
    return (
      <TournamentPrizeTypeIconWrapper>
        <img src="/images/igg_currency_icon.svg" />
      </TournamentPrizeTypeIconWrapper>
    );
  }

  if (prizeType === TournamentPrizeType.CASH) {
    return (
      <TournamentPrizeTypeCashIconWrapper>£</TournamentPrizeTypeCashIconWrapper>
    );
  }

  return <HexagonBadge size={37} />;
}

export interface TournamentCardPrizeSectionProps {
  prizes: TournamentPrizeModel[];
}

export interface TournamentCardPrizeSectionState {
  activePrize?: TournamentPrizeModel;
}

export class TournamentCardPrizeSection extends PureComponent<
  TournamentCardPrizeSectionProps,
  TournamentCardPrizeSectionState
> {
  state: TournamentCardPrizeSectionState = {};

  setActivePrize = (prize: TournamentPrizeModel) => {
    this.setState({ activePrize: prize });
  };

  clearActivePrize = () => {
    if (this.state.activePrize) {
      this.setState({ activePrize: void 0 });
    }
  };

  render() {
    const { prizes } = this.props;
    const { activePrize } = this.state;
    const { setActivePrize, clearActivePrize } = this;

    return (
      <CardSection borderTop={true}>
        <CardRow>
          <CardCell grow={true}>
            {activePrize ? (
              <LabeledTextBlock
                label={formatPrizePlaceLabel(activePrize.place)}
                text={activePrize.name}
                textFirst={true}
                large={true}
              />
            ) : (
              'Tournament Prizes'
            )}
          </CardCell>

          <CardCell alignEnd={true} onMouseLeave={clearActivePrize}>
            {prizes.map(prize => (
              <TournamentPrizeBlock
                key={prize.id}
                spacing={10}
                onMouseEnter={() => setActivePrize(prize)}
              >
                <TournamentPrizeFigure>
                  {renderPrizeIconByType(prize.type)}
                </TournamentPrizeFigure>
              </TournamentPrizeBlock>
            ))}
          </CardCell>
        </CardRow>
      </CardSection>
    );
  }
}
