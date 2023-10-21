import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { TeamTitle } from './teamsElements';
import { TeamLogo } from './TeamLogo';
import { TeamModel } from './types';

// A component with a logo and a title

const TeamMediaObjectRoot = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%'
});

const TeamMediaObjectFigure = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 15
});

const TeamMediaObjectBody = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
});

const TeamMediaObjectAdditionalSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
});

// Exported component

export interface TeamMediaObjectProps {
  team?: TeamModel;
  logoSize?: number;
  textSize?: number;
  boldLabel?: boolean;
  noTeamLabel?: string;
  renderAdditionalSection?: () => ReactNode;
}

export function TeamMediaObject({
  team,
  logoSize,
  textSize,
  boldLabel,
  noTeamLabel,
  renderAdditionalSection
}: TeamMediaObjectProps) {
  return (
    <TeamMediaObjectRoot>
      <TeamMediaObjectFigure>
        <TeamLogo size={logoSize || 50} team={team} />
      </TeamMediaObjectFigure>

      <TeamMediaObjectBody>
        <TeamTitle size={textSize || 22} bold={boldLabel}>
          {team ? team.name : noTeamLabel || 'Undefined Team'}
        </TeamTitle>
      </TeamMediaObjectBody>

      {typeof renderAdditionalSection === 'function' && (
        <TeamMediaObjectAdditionalSection>
          {renderAdditionalSection()}
        </TeamMediaObjectAdditionalSection>
      )}
    </TeamMediaObjectRoot>
  );
}

export default TeamMediaObject;
