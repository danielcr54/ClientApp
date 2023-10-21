import React, { Component } from 'react';
import Media from 'react-media';
import { GoThreeBars } from 'react-icons/go';
import { TreeStructureIcon, ButtonTabs, ButtonTab } from '@igg/common';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import {
  FifaTournamentModel,
  FifaTournamentRoundModel,
  FifaTournamentGroupModel
} from '../types';
import {
  TournamentStructureContainer,
  TournamentStructureHeader,
  TournamentStructureHeaderItem,
  TournamentStructureBody
} from '../tournamentsElements';
import { FifaTournamentStructureTreeView } from './FifaTournamentStructureTreeView';
import { FifaTournamentStructurePlainView } from './FifaTournamentStructurePlainView';
import { FifaTournamentStructureNav } from './FifaTournamentStructureNav';
import {
  isFinalRound,
  isTeamTournament,
  getFinalRoundMatch,
  isRoundInProgress
} from '../tournamentHelpers';
import { FifaMatchVideoStreamBlock } from './FifaMatchVideoStreamBlock';

export interface FifaTournamentStructureProps {
  tournament: FifaTournamentModel;
}

export interface FifaTournamentStructureState {
  isTreeView: boolean;
  shownRound?: FifaTournamentRoundModel;
  shownGroup?: FifaTournamentGroupModel;
}

export class FifaTournamentStructure extends Component<
  FifaTournamentStructureProps,
  FifaTournamentStructureState
> {
  state: FifaTournamentStructureState = {
    isTreeView: true
  };

  static getDerivedStateFromProps(
    { tournament }: FifaTournamentStructureProps,
    { shownGroup, shownRound }: FifaTournamentStructureState
  ) {
    if (shownGroup) {
      const { groups } = tournament;
      if (!groups || !groups.some(g => g.id === shownGroup.id)) {
        return { shownGroup: void 0 };
      }

      return null;
    }

    if (shownRound) {
      const { rounds } = tournament;
      if (!rounds || !rounds.some(g => g.id === shownRound.id)) {
        return { shownRound: void 0 };
      }

      return null;
    }

    // TODO: Decide what to show by default based on the current time
    // and not only position. Make sure to account for both groups
    // and rounds

    if (tournament.groups && tournament.groups.length) {
      const orderedGroups = [...tournament.groups].sort(
        (g1, g2) => g1.order - g2.order
      );
      return { shownGroup: orderedGroups[0] };
    }

    // NOTE: Assuming rounds are already pre-sorted by startTime
    // (when parsing a response)
    if (tournament.rounds && tournament.rounds.length) {
      return { shownRound: tournament.rounds[0] };
    }

    return null;
  }

  switchToPlainView = () =>
    this.setState({
      isTreeView: false
    });

  switchToTreeView = () =>
    this.setState({
      isTreeView: true
    });

  showRound = (round: FifaTournamentRoundModel) =>
    this.setState({
      shownRound: round,
      shownGroup: void 0
    });

  showGroup = (group: FifaTournamentGroupModel) =>
    this.setState({
      shownRound: void 0,
      shownGroup: group
    });

  isPlainView = () => !this.state.isTreeView;

  isTreeView = () => this.state.isTreeView;

  render() {
    const { tournament } = this.props;
    const { shownRound, shownGroup } = this.state;
    const {
      isPlainView,
      isTreeView,
      switchToPlainView,
      switchToTreeView,
      showRound,
      showGroup
    } = this;

    return (
      <TournamentStructureContainer>
        <TournamentStructureHeader>
          <TournamentStructureHeaderItem>
            <FifaTournamentStructureNav
              tournament={tournament}
              shownRound={shownRound}
              shownGroup={shownGroup}
              onRoundSelect={showRound}
              onGroupSelect={showGroup}
            />
          </TournamentStructureHeaderItem>

          <Media
            query={deviceScreenQuery.medium}
            render={() => (
              <TournamentStructureHeaderItem aligntEnd={true} shrink={false}>
                <ButtonTabs>
                  <ButtonTab active={isTreeView()} onClick={switchToTreeView}>
                    <TreeStructureIcon />
                  </ButtonTab>
                  <ButtonTab active={isPlainView()} onClick={switchToPlainView}>
                    <GoThreeBars />
                  </ButtonTab>
                </ButtonTabs>
              </TournamentStructureHeaderItem>
            )}
          />
        </TournamentStructureHeader>

        <TournamentStructureBody>
          {isFinalRound(shownRound) && isRoundInProgress(shownRound) && (
            <FifaMatchVideoStreamBlock
              match={getFinalRoundMatch(tournament)}
              isTeamMatch={isTeamTournament(tournament)}
            />
          )}
          <Media query={deviceScreenQuery.medium}>
            {largeScreen =>
              largeScreen ? (
                isTreeView() ? (
                  <FifaTournamentStructureTreeView
                    tournament={tournament}
                    group={shownGroup}
                    round={shownRound}
                  />
                ) : (
                  <FifaTournamentStructurePlainView
                    tournament={tournament}
                    group={shownGroup}
                    round={shownRound}
                  />
                )
              ) : (
                <FifaTournamentStructurePlainView
                  tournament={tournament}
                  group={shownGroup}
                  round={shownRound}
                />
              )
            }
          </Media>
        </TournamentStructureBody>
      </TournamentStructureContainer>
    );
  }
}

export default FifaTournamentStructure;
