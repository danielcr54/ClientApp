import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FifaMatchDisputeReasonProperty, FifaMatchDisputeReason } from 'disputes/types';
import { PlayerContainer } from './PlayerContainer';
import { UserModel } from 'login/types';
import { Label } from './Label';

const guestAdded: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.GUEST_ADDED,
  displayName: "Guest added"
};

const customTeam: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.CUSTOM_TEAM,
  displayName: "Custom team was used"
};

const cantFindGamertag: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.CANT_FIND_GAMERTAG,
  displayName: "Gamertag cannot be found"
};

const incorrectGamertag: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.INCORRECT_GAMERTAG,
  displayName: "Gamertag is incorrect"
};

const unresponsiveOpponent: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.UNRESPONSIVE_OPPONENT,
  displayName: "Opponent is unresponsive"
};

const disconnectedMatch: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.DISCONNECTED_MATCH,
  displayName: "Match disconnected"
};

const opponentDidntRematch: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.OPPONENT_DIDNT_REMATCH,
  displayName: "Opponent didn't rematch"
};

const incorrectGamemode: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.INCORRECT_GAMEMODE,
  displayName: "Incorrect Gamemode"
};

const inconsistentScore: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.INCONSISTENT_SCORE,
  displayName: "Scores are inconsistent"
};

const noScoreSubmitted: FifaMatchDisputeReasonProperty = {
  reason: FifaMatchDisputeReason.NO_SCORE_SUBMITTED,
  displayName: "No score was submitted"
};

const disputeReasonList: FifaMatchDisputeReasonProperty[] = [
  guestAdded,
  customTeam,
  cantFindGamertag,
  incorrectGamertag,
  unresponsiveOpponent,
  disconnectedMatch,
  opponentDidntRematch,
  incorrectGamemode,
  inconsistentScore,
  noScoreSubmitted
]

export const DisputeCardDisputeContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 10
});

export const DisputeCardDisputeTitlePlayerContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const DisputeCardDisputePlayerContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

export const Title = styled('div')({
  marginLeft: 10,
  fontSize: 20
});

export interface DisputeCardDisputeProps {
  disputeReason: FifaMatchDisputeReason;
  reportedBy?: UserModel;
}

export class DisputeCardDispute extends Component<DisputeCardDisputeProps> {

  render() {
    const {
      disputeReason, reportedBy
    } = this.props;
    
    return (
      <DisputeCardDisputeContainer>
        <DisputeCardDisputeTitlePlayerContainer>
          <Title>
            { disputeReasonList.filter(reason => reason.reason === disputeReason)[0].displayName }
          </Title>
          <DisputeCardDisputePlayerContainer>
            {reportedBy && (
              <>
                <Label
                  text="Reported by"
                />
                <PlayerContainer
                  player={reportedBy}
                />
              </>
            )}
          </DisputeCardDisputePlayerContainer>
        </DisputeCardDisputeTitlePlayerContainer>
      </DisputeCardDisputeContainer>
    );
  }
}