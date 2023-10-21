import React from 'react';
import { ScreenContentSection, Tabs, TabNavLink } from '@igg/common';
import { TeamModel } from './types';

export interface TeamMembersSectionNavProps {
  team: TeamModel;
}

export function TeamMembersSectionNav({ team }: TeamMembersSectionNavProps) {
  const baseUrl = `/teams/${team.urlSlug}/members`;

  return (
    <ScreenContentSection>
      <Tabs>
        <TabNavLink to={baseUrl} exact={true}>
          Active Members
        </TabNavLink>
        <TabNavLink to={`${baseUrl}/invite-requests`}>
          Incoming Applications
        </TabNavLink>
        <TabNavLink to={`${baseUrl}/invites`}>Outgoing Invites</TabNavLink>
        <TabNavLink to={`${baseUrl}/search`}>Search</TabNavLink>
      </Tabs>
    </ScreenContentSection>
  );
}

export default TeamMembersSectionNav;
