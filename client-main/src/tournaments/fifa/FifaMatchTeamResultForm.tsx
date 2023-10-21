import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Form } from 'react-final-form';
import {
  FormErrorMap,
  SubmitButton,
  SelectField,
  InputField,
  Input
} from '@igg/common';
import { CardSection, CardContent, CardContentCell } from '../../shared/card';
import { PlayerMediaObject } from '../../players/PlayerMediaObject';
import { PlayerList, PlayerListItem } from '../../players/PlayerList';
import { GameScoreBlock } from '../GameScoreBlock';
import { FifaMatchModel } from '../types';

// TEMP fake data

const tempTeamData = {
  id: 'team1',
  name: 'Team 1',
  urlSlug: 'team-1',
  countryCode: 'gb',
  languages: ['en-GB']
};

const tempPlayersData = [
  {
    id: 'player1',
    displayName: 'user 1',
    username: 'playerone',
    email: 'playerone@iggalaxy.com',
    profile: {
      firstName: 'Player',
      lastName: 'One',
      countryCode: 'gb',
      language: 'en-GB'
    },
    team: tempTeamData
  },
  {
    id: 'player2',
    displayName: 'user 2',
    username: 'playertwo',
    email: 'playertwo@iggalaxy.com',
    profile: {
      firstName: 'Player',
      lastName: 'Two',
      countryCode: 'gb',
      language: 'en-GB'
    },
    team: tempTeamData
  },
  {
    id: 'player3',
    displayName: 'user 3',
    username: 'playerthree',
    email: 'playerthree@iggalaxy.com',
    profile: {
      firstName: 'Player',
      lastName: 'Three',
      countryCode: 'gb',
      language: 'en-GB'
    },
    team: tempTeamData
  }
];

// Styled helpers

const PlayersInputsBlock = styled('div')({
  width: '100%',
  padding: '25px 15px 15px'
});

const PlayerScoreInputContainer = styled('div')({
  width: 40
});

// TODO: This needs form data model reconsiderations

// Exported component

export interface FifaMatchTeamResultFormModel {
  ownScore?: number;
  opponentScore?: number;
}

export function validateForm(formModel: FifaMatchTeamResultFormModel) {
  const errors: FormErrorMap<FifaMatchTeamResultFormModel> = {};

  if (!formModel.ownScore) {
    errors.ownScore = 'Please provide own score';
  }

  if (!formModel.opponentScore) {
    errors.opponentScore = "Please provide opponent's score";
  }

  return errors;
}

export interface FifaMatchTeamResultFormProps {
  match: FifaMatchModel;
  isTeamMatch?: boolean;
  formData?: FifaMatchTeamResultFormModel;
  onSubmit: (formModel: FifaMatchTeamResultFormModel) => Promise<any>;
  onCancel?: () => void;
  inProgress?: boolean;
  success?: boolean;
}

export function FifaMatchTeamResultForm({
  match,
  formData,
  inProgress,
  success,
  onSubmit
}: FifaMatchTeamResultFormProps) {
  // TODO: Should be taken from match.team1/team2 instead
  const team1Players = tempPlayersData;
  const team2Players = tempPlayersData;
  const currentUser = tempPlayersData[0];

  return (
    <Form
      initialValues={formData}
      onSubmit={onSubmit}
      validate={validateForm}
      validateOnBlur={true}
    >
      {({ handleSubmit }) => {
        return (
          <form noValidate={true} onSubmit={handleSubmit}>
            <CardSection>
              <CardContent>
                <CardContentCell main={true} forceAlignStart={true}>
                  <GameScoreBlock team={match.homeTeam} score={0} />

                  <PlayersInputsBlock>
                    <PlayerList>
                      {team1Players.map(player => (
                        <PlayerListItem key={player.id}>
                          <PlayerMediaObject
                            player={player}
                            isCurrentUser={player.id === currentUser.id}
                            renderActionsBlock={() => (
                              <PlayerScoreInputContainer>
                                <Input
                                  type="text"
                                  small={true}
                                  alignCenter={true}
                                  name={`player_${player.id}`}
                                  autoComplete="off"
                                  defaultValue="0"
                                />
                              </PlayerScoreInputContainer>
                            )}
                          />
                        </PlayerListItem>
                      ))}
                    </PlayerList>
                  </PlayersInputsBlock>
                </CardContentCell>

                <CardContentCell main={true} forceAlignStart={true}>
                  <GameScoreBlock team={match.awayTeam} score={0} />

                  <PlayersInputsBlock>
                    <PlayerList>
                      {team2Players.map(player => (
                        <PlayerListItem key={player.id}>
                          <PlayerMediaObject
                            player={player}
                            renderActionsBlock={() => (
                              <PlayerScoreInputContainer>
                                <Input
                                  type="text"
                                  small={true}
                                  alignCenter={true}
                                  name={`player_${player.id}`}
                                  autoComplete="off"
                                  defaultValue="0"
                                />
                              </PlayerScoreInputContainer>
                            )}
                          />
                        </PlayerListItem>
                      ))}
                    </PlayerList>
                  </PlayersInputsBlock>
                </CardContentCell>
              </CardContent>
            </CardSection>

            <CardSection borderTop={true}>
              <CardContent>
                <CardContentCell main={true} verticalAlignCenter={true}>
                  <SelectField
                    name="bestPlayer"
                    label="Man of the match"
                    small={true}
                  />
                </CardContentCell>

                <CardContentCell
                  main={true}
                  alignEnd={true}
                  verticalAlignCenter={true}
                >
                  <SubmitButton
                    inProgress={inProgress}
                    success={success}
                    progressText="Submitting..."
                    successText="Submitted!"
                  >
                    Submit results
                  </SubmitButton>
                </CardContentCell>
              </CardContent>
            </CardSection>
          </form>
        );
      }}
    </Form>
  );
}
