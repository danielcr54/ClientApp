import React, { Component, ReactNode } from 'react';
import { Redirect } from 'react-router';
import styled from '@emotion/styled';
import Media from 'react-media';
import {
  styleSettings,
  ButtonNavLink,
  StaticText,
  ActionButton,
  ModalAlertDialog,
  ModalConfirmDialog
} from '@igg/common';
import {
  Card,
  CardHeader,
  CardHeaderCell,
  CardContent,
  CardSection,
  CardRow,
  CardCell,
  CardMainSection,
  CardContentActions,
  CardHighlightText,
  CardContentCell,
  CardContentFigure,
  CardTitle,
  CardTitleLink,
  CardContentSublabels,
  CardContentSublabel,
  CardContentMeta,
  CardActions
} from '../shared/card';
import { LangFlagBlock } from '../shared/LangFlagBlock';
// import { MiniCircleChart } from '../shared/MiniCircleChart';
// import { HexagonBadge, HexagonBadgeList } from '../shared/HexagonBadge';
// import { LabeledTextBlock } from '../shared/LabeledTextBlock';
import { ItemActionMenu, ItemActionMenuButton } from '../shared/ItemActionMenu';
import { UserModel } from '../core/types';
import { TeamLogo, TeamLogoNavLink } from './TeamLogo';
// import { TeamCardStats } from './TeamCardStats';
import {
  TeamMembersMeta,
  TeamMemberInlineAvatars,
  TeamMemberInlineAvatarsItem,
  TeamMembersMetaText
} from './teamsElements';
import { RequestTeamInviteButton } from './RequestTeamInviteButton';
import { LeaveTeamMutation } from './mutations/LeaveTeamMutation';
import { TeamModel, TeamInviteRequestModel } from './types';
import { USER_INFO_QUERY } from '../core/UserInfoQuery';

const { deviceScreenQuery } = styleSettings;

// Some team-specific metadata styling

const TeamCompositionLabel = styled('span')({
  marginRight: 10,
  color: 'rgba(255, 255, 255, 0.55)'
});

// Rendering helpers

// TODO: Probably create a normal component from it
function renderTeamCardMeta(team: TeamModel, detailsLayout?: boolean) {
  return (
    <CardContentMeta>
      <CardContentSublabels alignCenter={!detailsLayout}>
        <CardContentSublabel>
          <TeamCompositionLabel>ATT 19</TeamCompositionLabel>
          <TeamCompositionLabel>MID 33</TeamCompositionLabel>
          <TeamCompositionLabel>DEF 44</TeamCompositionLabel>
        </CardContentSublabel>
        {detailsLayout && <CardContentSublabel>AGE: 20-29</CardContentSublabel>}
      </CardContentSublabels>

      {!detailsLayout && (
        <TeamMembersMeta>
          <TeamMemberInlineAvatars>
            <TeamMemberInlineAvatarsItem />
            <TeamMemberInlineAvatarsItem />
            <TeamMemberInlineAvatarsItem />
          </TeamMemberInlineAvatars>

          <TeamMembersMetaText>22 team members</TeamMembersMetaText>
        </TeamMembersMeta>
      )}
    </CardContentMeta>
  );
}

// Exported component

export interface TeamCardProps {
  team: TeamModel;
  currentUser?: UserModel;
  detailsLayout?: boolean;
  contextLabel?: string;
  allowJoin?: boolean;
  onJoinClick?: (team: TeamModel) => void;
  renderActionsBlock?: () => ReactNode;
}

export class TeamCard extends Component<TeamCardProps> {
  render() {
    const {
      team,
      detailsLayout,
      contextLabel,
      allowJoin,
      currentUser,
      renderActionsBlock
    } = this.props;

    // const teamCardLabel = contextLabel || 'Team has never lost a match';
    const teamCardLabel = '';

    const isOwnerView =
      (currentUser && team.owner && team.owner.id === currentUser.id) || false;
    const isMemberView =
      (currentUser &&
        team.members &&
        team.members.some(m => m.id === currentUser.id)) ||
      false;
    const teamInviteRequests: TeamInviteRequestModel[] =
      (currentUser && currentUser.teamInviteRequests) || [];
    const isTeamInviteSent = teamInviteRequests.filter(
      request => request.teamId === team.id
    ).length
      ? true
      : false;
    const teamSize = (team.members && team.members.length) || 0;

    return (
      <Card data-cy="aut-a-team-card">
        <CardHeader>
          {!detailsLayout ? (
            <CardHeaderCell main={true}>
              <CardHighlightText>{teamCardLabel}</CardHighlightText>
            </CardHeaderCell>
          ) : (
            <>
              <Media
                query={deviceScreenQuery.smallDown}
                render={() => (
                  <CardHeaderCell main={true}>
                    {isOwnerView ? (
                      <ButtonNavLink
                        to={`/teams/${team.urlSlug}/edit`}
                        small={true}
                        inverse={true}
                      >
                        Edit team
                      </ButtonNavLink>
                    ) : (
                      <CardHighlightText>{teamCardLabel}</CardHighlightText>
                    )}
                  </CardHeaderCell>
                )}
              />

              <Media
                query={deviceScreenQuery.medium}
                render={() => (
                  <>
                    <CardHeaderCell main={true}>
                      <CardHighlightText>{teamCardLabel}</CardHighlightText>
                    </CardHeaderCell>

                    {isOwnerView && (
                      <CardHeaderCell>
                        <ButtonNavLink
                          to={`/teams/${team.urlSlug}/edit`}
                          small={true}
                          inverse={true}
                        >
                          Edit team
                        </ButtonNavLink>
                      </CardHeaderCell>
                    )}
                  </>
                )}
              />
            </>
          )}

          <CardHeaderCell alignEnd={true}>
            {/* <MiniCircleChart /> */}

            <LangFlagBlock
              language={team.languages && team.languages[0]}
              countryCode={team.countryCode}
            />
          </CardHeaderCell>

          {isMemberView && !isOwnerView && (
            <LeaveTeamMutation>
              {(leaveTeam, { loading, error, data }) => (
                <>
                  {data && data.leaveTeam && data.leaveTeam.team && (
                    <Redirect to="/" />
                  )}
                  <ModalAlertDialog>
                    {({ open: alert }) => (
                      <ModalConfirmDialog
                        message="Are you sure you want to leave the team?"
                        confirmButtonText="Leave Team"
                        onConfirm={() => {
                          leaveTeam({
                            variables: {
                              input: {
                                teamId: team.id
                              }
                            },
                            refetchQueries: [{ query: USER_INFO_QUERY }]
                          });
                        }}
                      >
                        {({ open: confirm }) => (
                          <CardHeaderCell>
                            <ItemActionMenu>
                              {/* <ItemActionMenuButton>Share team</ItemActionMenuButton> */}
                              <ItemActionMenuButton
                                onClick={() => confirm()}
                                data-cy="aut-b-leave-team"
                              >
                                Leave team
                              </ItemActionMenuButton>
                            </ItemActionMenu>
                          </CardHeaderCell>
                        )}
                      </ModalConfirmDialog>
                    )}
                  </ModalAlertDialog>
                </>
              )}
            </LeaveTeamMutation>
          )}
        </CardHeader>

        <CardMainSection borderTop={detailsLayout}>
          <CardContent large={detailsLayout}>
            {!detailsLayout ? (
              <CardContentCell main={true} alignCenter={true}>
                <CardContentFigure>
                  <TeamLogoNavLink team={team} />
                </CardContentFigure>

                <CardTitleLink to={`/teams/${team.urlSlug}`}>
                  {team.name}
                </CardTitleLink>

                {/* {renderTeamCardMeta(team, detailsLayout)} */}

                {allowJoin && !isTeamInviteSent && (
                  <CardContentActions>
                    <RequestTeamInviteButton
                      team={team}
                      small={true}
                      secondary={true}
                    />
                  </CardContentActions>
                )}
                {isTeamInviteSent && (
                  <CardContentActions>
                    <ActionButton
                      small={true}
                      secondary={true}
                      success={true}
                      successText="Invite Requested"
                    >
                      Request an invite
                    </ActionButton>
                  </CardContentActions>
                )}
              </CardContentCell>
            ) : (
              <>
                <CardContentCell spacing={25} verticalSpacing={20}>
                  <CardContentFigure>
                    <TeamLogo large={true} team={team} />
                  </CardContentFigure>
                </CardContentCell>

                <CardContentCell main={true} spacing={25} verticalSpacing={20}>
                  <Media query={deviceScreenQuery.medium}>
                    {largeScreen => (
                      <CardTitle large={true} alignLeft={largeScreen}>
                        {team.name}
                      </CardTitle>
                    )}
                  </Media>

                  {/* {renderTeamCardMeta(team, detailsLayout)} */}

                  {/* <HexagonBadgeList spacing={10}>
                    <HexagonBadge />
                    <HexagonBadge />
                    <HexagonBadge />
                    <HexagonBadge />
                    <HexagonBadge />
                  </HexagonBadgeList> */}
                </CardContentCell>

                <CardContentCell alignEnd={true}>
                  {allowJoin && (
                    <CardContentActions>
                      <RequestTeamInviteButton team={team} />
                    </CardContentActions>
                  )}
                </CardContentCell>
              </>
            )}
          </CardContent>
        </CardMainSection>

        {/* <TeamCardStats team={team} large={detailsLayout} /> */}

        {!detailsLayout && (
          <CardSection borderTop={true}>
            <CardRow>
              <CardCell>
                <TeamMembersMetaText>
                  {`${teamSize} Team Member` + (teamSize !== 1 ? 's' : '')}
                </TeamMembersMetaText>
              </CardCell>

              {/* <CardCell alignEnd={true}>
                <HexagonBadgeList>
                  <HexagonBadge />
                  <HexagonBadge />
                  <HexagonBadge />
                </HexagonBadgeList>
              </CardCell> */}
            </CardRow>
          </CardSection>
        )}

        {renderActionsBlock && (
          <CardSection borderTop={true}>
            <CardRow>
              <CardCell>
                <CardActions>{renderActionsBlock()}</CardActions>
              </CardCell>
            </CardRow>
          </CardSection>
        )}
      </Card>
    );
  }
}

export default TeamCard;
