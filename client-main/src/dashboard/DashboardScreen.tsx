import React from 'react';
import { LoadingScreen, NoContent } from '@igg/common';
// import { HeroActionBlockSection } from '../shared/ActionBlock';
import { UserModel } from '../core/types';
import JoinTeamDashboardSection from '../teams/JoinTeamDashboardSection';
import TournamentsDashboardSection from '../tournaments/TournamentsDashboardSection';
// import KycDashboardActionBlock from '../kyc/KycDashboardActionBlock';
import { UserInfoQuery } from 'core/UserInfoQuery';

export interface DashboardScreenProps {
  currentUser: UserModel;
}

export function DashboardScreen({ currentUser }: DashboardScreenProps) {
  return (
    <>
      {/* {!currentUser.isKycPassed && (
        <HeroActionBlockSection>
          <KycDashboardActionBlock />
        </HeroActionBlockSection>
      )} */}

      {!currentUser.team && (
        <JoinTeamDashboardSection currentUser={currentUser} />
      )}

      <TournamentsDashboardSection />
    </>
  );
}

export default function DashboardScreenConnected() {
  return (
    <UserInfoQuery renderLoading={() => <LoadingScreen />} forceRefetch={true}>
      {currentUser => <DashboardScreen currentUser={currentUser} />}
    </UserInfoQuery>
  );
}
