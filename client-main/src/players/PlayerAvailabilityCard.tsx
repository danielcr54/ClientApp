import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Button } from '@igg/common';
import {
  Card,
  CardContent,
  CardSection,
  CardCell,
  CardMainSection,
  CardActions,
  CardContentCell,
  CardContentSublabel,
  CardTitle,
  CardContentMeta
} from '../shared/card';
import { UserModel } from '../core/types';
import { TeamLogo } from '../teams/TeamLogo';
import { TeamModel } from '../teams/types';

// Helper components

const PlayerAvailabilityCardContent = styled(CardContent)({
  paddingTop: 25,
  paddingBottom: 10
});

// Exported component

export interface PlayerAvailabilityCardProps {
  player: UserModel;
  team: TeamModel;
}

export class PlayerAvailabilityCard extends Component<
  PlayerAvailabilityCardProps
> {
  render() {
    const { player, team } = this.props;

    return (
      <Card>
        <CardMainSection>
          <PlayerAvailabilityCardContent>
            <CardContentCell main={true} alignCenter={true}>
              <TeamLogo team={team} />

              <CardTitle>Available for your team</CardTitle>
              <CardContentMeta>
                <CardContentSublabel>
                  Player is currently <br />
                  not a member of a team
                </CardContentSublabel>
              </CardContentMeta>
            </CardContentCell>
          </PlayerAvailabilityCardContent>
        </CardMainSection>

        <CardSection>
          <CardCell>
            <CardActions>
              <Button block={true}>
                Invite {player.profile.firstName} to join {team.name}
              </Button>
            </CardActions>
          </CardCell>
        </CardSection>
      </Card>
    );
  }
}

export default PlayerAvailabilityCard;
