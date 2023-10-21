import React, { Component } from 'react';
import {
  ActionScreenHeading,
  ScreenLayout,
  ScreenBody,
  ScreenBodyLayout,
  ScreenContent,
  ScreenContentContainer,
  LoadingScreen
} from '@igg/common/lib';
import {
  DisputeTournamentModel,
  GameMode,
  FifaMatchModel,
  TournamentRoundType,
  FifaDisputeModel,
  FifaTournamentRoundModel,
  FifaMatchScoreSubmission,
  FifaMatchDisputeReason
} from './types';
import { DisputeCard } from './elements/DisputeCard';
import { Subscribe } from '@igg/auth/node_modules/unstated';
import ResolveDisputeStateContainer from './states/ResolveDisputesStateContainer';
import { UserInfoQuery } from 'login/UserInfoQuery';
import { UserModel } from 'login/types';
import { FifaMatchDisputesQuery } from './FifaMatchDisputesQuery';

const user1: UserModel = {
  id: `user1`,
  username: `UserOne`,
  email: 'blablub@me.com',
  profile: {
    avatarUrl: `https://images.unsplash.com/photo-1514136649217-b627b4b9cfb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`
  }
}

const user2: UserModel = {
  id: `user2`,
  username: `UserTwo`,
  email: 'blablub@me.com',
  profile: {
    avatarUrl: `https://blog.photowhoa.com/2015/wp-content/uploads/2016/08/male-models-photos-poses-face.jpg`
  }
}

const user3: UserModel = {
  id: `user3`,
  username: `UserThree`,
  email: 'blablub@me.com',
  profile: {
    avatarUrl: `https://images.unsplash.com/photo-1533075377664-f5c0cbc5a91c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80`
  }
}

const round1: FifaTournamentRoundModel = {
  type: TournamentRoundType.REGULAR
}

const round2: FifaTournamentRoundModel = {
  type: TournamentRoundType.SEMI_FINAL
}

const round3: FifaTournamentRoundModel = {
  type: TournamentRoundType.FINAL
}

const score1: FifaMatchScoreSubmission = {
  ownScore: 3,
  opponentScore: 5,
  screenshotUrls: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTVf63Vm3XgOncMVSOy0-jSxdMT8KVJIc8WiWaevuWiPGe0Pm',
    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg'
  ]
}

const score2: FifaMatchScoreSubmission = {
  ownScore: 1,
  opponentScore: 1,
  screenshotUrls: [
    'https://cdn.pixabay.com/photo/2018/02/09/21/46/rose-3142529_960_720.jpg',
    'https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8zG4UNOVCEpu1u2WooYHtJjAzgDwzGPoZy8DhfPBBPVu-Hf7z'
  ]
}

const score3: FifaMatchScoreSubmission = {
  ownScore: 2,
  opponentScore: 0,
  screenshotUrls: [
    'https://www.w3schools.com/howto/img_forest.jpg',
    'http://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg',
    'https://i.kinja-img.com/gawker-media/image/upload/s--G-sdBgNR--/c_scale,f_auto,fl_progressive,q_80,w_800/z7jcryloxjedsztssw39.jpg'
  ]
}

const tournament1: DisputeTournamentModel = {
  consoleIds: [
    'ps4'
  ],
  title: 'Alpha Tournament',
  gameMode: GameMode.ULTIMATE_TEAM
};

const tournament2: DisputeTournamentModel = {
  consoleIds: [
    'xbox'
  ],
  title: 'Beta Tournament',
  gameMode: GameMode.PRO_CLUBS
};

const disputeMatch1One: FifaDisputeModel = {
  id: 'dispute-one',
  reason: FifaMatchDisputeReason.INCONSISTENT_SCORE,
  createdBy: user1,
  player: user2,
}

const disputeMatch1Two: FifaDisputeModel = {
  id: 'dispute-two',
  reason: FifaMatchDisputeReason.INCONSISTENT_SCORE,
  createdBy: user2,
  player: user1,
}

const disputeMatch2One: FifaDisputeModel = {
  id: 'dispute-three',
  reason: FifaMatchDisputeReason.INCONSISTENT_SCORE,
  createdBy: user2,
  player: user3,
  comment: "Wow that was a shitty internet connection"
}

const disputeMatch3One: FifaDisputeModel = {
  id: 'dispute-four',
  reason: FifaMatchDisputeReason.DISCONNECTED_MATCH,
  createdBy: user1,
  player: user3
}

const tempFifaMatch1: FifaMatchModel = {
  id: `match-one`,
  tournament: tournament1,
  round: round1,
  homePlayer: user1,
  awayPlayer: user2,
  homeStreamUrl: 'https://www.twitch.tv/igg_esports',
  awayStreamUrl: 'https://www.twitch.tv/lost',
  homeScoreSubmission: score1,
  awayScoreSubmission: score2,
  disputes: [
    disputeMatch1One,
    disputeMatch1Two
  ]
};

const tempFifaMatch2: FifaMatchModel = {
  id: `match-two`,
  tournament: tournament1,
  round: round3,
  homePlayer: user2,
  awayPlayer: user3,
  homeStreamUrl: 'https://www.twitch.tv/igg_esports',
  awayStreamUrl: 'https://www.twitch.tv/lost',
  homeScoreSubmission: score3,
  awayScoreSubmission: score1,
  disputes: [
    disputeMatch2One
  ],
  disputeClaimedBy: {
    id: '73cccacf-bbff-4fbc-bd49-8751db08ca70',
    email: 'flixmix.bornmann@me.com',
    username: 'Tronmix',
    profile: {
      firstName: "Felix",
      lastName: "Bornmann"
    }
  }
};

const tempFifaMatch3: FifaMatchModel = {
  id: `match-three`,
  tournament: tournament2,
  round: round2,
  homePlayer: user3,
  awayPlayer: user1,
  homeStreamUrl: 'https://www.twitch.tv/igg_esports',
  awayStreamUrl: 'https://www.twitch.tv/lost',
  homeScoreSubmission: score2,
  awayScoreSubmission: score1,
  disputes: [
    disputeMatch3One
  ],
  disputeClaimedBy: {
    id: '73cccacf-bbff-4fbc-bd49-8751db08ca70',
    email: 'flixmix.bornmann@me.com',
    username: 'Tronmix',
    profile: {
      firstName: "Babo",
      lastName: "Bobo"
    }
  },
  disputeResolvedAt: new Date(),
  disputeResolutionNote: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
};

export interface DisputesScreenProps {
  resolveDisputeStateContainer: ResolveDisputeStateContainer;
  currentUser: UserModel;
  fifaMatches: FifaMatchModel[];
}

export class DisputesScreen extends Component<DisputesScreenProps> {

  render() {
    const { resolveDisputeStateContainer, currentUser, fifaMatches } = this.props;

    return (
      <ScreenLayout>
        <ScreenBody>
          <ScreenBodyLayout>
            <ScreenContent>
              <ScreenContentContainer>
                <ActionScreenHeading>
                  Unresolved Disputes
                </ActionScreenHeading>
                {!(Object.entries(fifaMatches).length === 0 && fifaMatches.constructor === Object) ? ( 
                  fifaMatches
                    .filter(fifaMatch => !fifaMatch.disputeResolvedAt)
                    .map(fifaMatch => (
                      <DisputeCard
                          fifaMatch={fifaMatch}
                        expanded={
                          !fifaMatch.disputeResolvedAt
                          && fifaMatch.disputeClaimedBy
                          && fifaMatch.disputeClaimedBy.id === currentUser.id
                        }
                        resolveDisputeStateContainer={resolveDisputeStateContainer}
                      />
                    ))
                  ) : (
                    "No open disputes"
                  )
                }

                <ActionScreenHeading>
                  Past Disputes
                </ActionScreenHeading>
                {!(Object.entries(fifaMatches).length === 0 && fifaMatches.constructor === Object) ? (
                  fifaMatches
                    .filter(fifaMatch => fifaMatch.disputeResolvedAt)
                    .map(fifaMatch => (
                      <DisputeCard
                        fifaMatch={fifaMatch}
                        expanded={false}
                        resolveDisputeStateContainer={resolveDisputeStateContainer}
                      />
                    ))
                  ) : (
                    "No past disputes"
                  )
                }
              </ScreenContentContainer>
            </ScreenContent>
          </ScreenBodyLayout>
        </ScreenBody>
      </ScreenLayout>
    );
  }
}

export function DisputesScreenConnected() {
  return (
    <Subscribe to={[ResolveDisputeStateContainer]}>
      {(resolveDisputeStateContainer: ResolveDisputeStateContainer) => (
        <UserInfoQuery renderLoading={() => <LoadingScreen />}>
        {currentUser => (
          <FifaMatchDisputesQuery>
            {({ loading, fifaMatches }) => (
              <DisputesScreen 
                resolveDisputeStateContainer={resolveDisputeStateContainer}
                currentUser={currentUser}
                fifaMatches={fifaMatches}
              />
            )}
          </FifaMatchDisputesQuery>
        )}
      </UserInfoQuery>
      )}
    </Subscribe>
  );
}

export default DisputesScreenConnected;