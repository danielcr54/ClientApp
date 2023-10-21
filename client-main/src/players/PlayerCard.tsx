import React, { ReactNode } from 'react';
import Media from 'react-media';
import { Button, ModalAlertDialog, ModalConfirmDialog } from '@igg/common';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
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
  CardContentActionsItem,
  CardActions,
  CardContentCell,
  CardContentSublabels,
  CardContentSublabel,
  CardContentFigure,
  CardTitle,
  CardTitleLink,
  CardContentMeta,
  CardHighlightText
} from '../shared/card';
import { LangFlagBlock } from '../shared/LangFlagBlock';
import ChatButton from '../chat/ChatConversationButton';
// import { MiniCircleChart } from '../shared/MiniCircleChart';
// import { HexagonBadge, HexagonBadgeList } from '../shared/HexagonBadge';
// import { LabeledTextBlock } from '../shared/LabeledTextBlock';
import { ItemActionMenu, ItemActionMenuButton } from '../shared/ItemActionMenu';
import { UserAvatarNavLink, UserAvatar } from '../shared/UserAvatar';
import { ConsoleIconsBlock } from '../shared/ConsoleIconsBlock';
import { PlayerCardMeta } from './PlayerCardMeta';
import { UserModel } from '../core/types';
import { TEAM_DETAILS_QUERY } from '../teams/TeamDetailsQuery';
import { TransferTeamMutation } from '../teams/mutations/TransferTeamMutation';

export interface PlayerCardProps {
  player: UserModel;
  currentUser?: UserModel;
  isOwnerView?: boolean;
  isTeamMemberView?: boolean;
  detailsLayout?: boolean;
  contextLabel?: string;
  renderActionsBlock?: () => ReactNode;
}

export function PlayerCard({
  player,
  currentUser,
  isOwnerView,
  isTeamMemberView,
  detailsLayout,
  contextLabel,
  renderActionsBlock
}: PlayerCardProps) {
  // TODO: Obtain in a different way maybe?
  const playerConsoleIds = [
    ...(player.profile.psnUsername ? ['ps4'] : []),
    ...(player.profile.xboxUsername ? ['xbox'] : [])
  ];

  const hasTeamControl =
    isOwnerView && (currentUser ? player.id !== currentUser.id : false);
  const currentTeam = currentUser ? currentUser.team || null : null;
  const isMe = currentUser ? currentUser.id === player.id : false;

  return (
    <Card>
      <CardHeader>
        <CardHeaderCell main={true}>
          <ConsoleIconsBlock consoleIds={playerConsoleIds} />

          {contextLabel && (
            <CardHighlightText>{contextLabel}</CardHighlightText>
          )}
        </CardHeaderCell>

        <CardHeaderCell alignEnd={true}>
          {/* <MiniCircleChart /> */}

          <LangFlagBlock
            language={player.profile.language}
            countryCode={player.profile.countryCode}
          />
        </CardHeaderCell>

        {/* {isTeamMemberView && (
          <CardHeaderCell>
            <ItemActionMenu>
              <ItemActionMenuButton>Make a transfer</ItemActionMenuButton>
              <ItemActionMenuButton>Report user</ItemActionMenuButton>
            </ItemActionMenu>
          </CardHeaderCell>
        )} */}

        {hasTeamControl && (
          <CardHeaderCell>
            <ItemActionMenu>
              <TransferTeamMutation>
                {(transferTeam, { loading, error, data }) => (
                  <ModalConfirmDialog
                    message="Are you sure you want to transfer the ownership?"
                    confirmButtonText="Transfer"
                    onConfirm={() => {
                      transferTeam({
                        variables: {
                          input: {
                            teamId: player.teamId || '',
                            userId: player.id
                          }
                        },
                        refetchQueries: [
                          {
                            query: TEAM_DETAILS_QUERY,
                            variables: {
                              urlSlug: currentTeam ? currentTeam.urlSlug : ''
                            }
                          }
                        ]
                      });
                    }}
                  >
                    {({ open: confirm }) => (
                      <ItemActionMenuButton onClick={() => confirm()}>
                        Transfer Ownership
                      </ItemActionMenuButton>
                    )}
                  </ModalConfirmDialog>
                )}
              </TransferTeamMutation>

              <ItemActionMenuButton>Appoint as Captain</ItemActionMenuButton>
              <ItemActionMenuButton>End Contract</ItemActionMenuButton>
            </ItemActionMenu>
          </CardHeaderCell>
        )}
      </CardHeader>

      <CardMainSection borderTop={detailsLayout}>
        <CardContent large={detailsLayout}>
          {!detailsLayout ? (
            <CardContentCell main={true} alignCenter={true}>
              <CardContentFigure>
                <UserAvatarNavLink user={player} />
              </CardContentFigure>

              <CardTitleLink to={`/players/${player.username}`}>
                {player.displayName}
              </CardTitleLink>

              <PlayerCardMeta player={player} detailsLayout={detailsLayout} />

              <CardContentActions>
                <ChatButton contact={{ user: player }} small={true} />
              </CardContentActions>
            </CardContentCell>
          ) : (
            <>
              <CardContentCell spacing={25} verticalSpacing={20}>
                <CardContentFigure>
                  <UserAvatar user={player} large={true} />
                </CardContentFigure>
              </CardContentCell>

              <CardContentCell main={true} spacing={25} verticalSpacing={20}>
                <Media query={deviceScreenQuery.medium}>
                  {largeScreen => (
                    <CardTitle alignLeft={largeScreen}>
                      {player.displayName}
                    </CardTitle>
                  )}
                </Media>

                <PlayerCardMeta player={player} detailsLayout={detailsLayout} />

                {/* <HexagonBadgeList spacing={10}>
                    <HexagonBadge />
                    <HexagonBadge />
                    <HexagonBadge />
                    <HexagonBadge />
                    <HexagonBadge />
                  </HexagonBadgeList> */}
              </CardContentCell>

              <CardContentCell main={detailsLayout} alignEnd={true}>
                <CardContentActions>
                  <CardContentActionsItem>
                    <ChatButton contact={{ user: player }} />
                  </CardContentActionsItem>
                  {!isMe && (
                    <CardContentActionsItem>
                      <Button disabled={true}>Follow</Button>
                    </CardContentActionsItem>
                  )}
                </CardContentActions>
              </CardContentCell>
            </>
          )}
        </CardContent>
      </CardMainSection>

      {/* {!detailsLayout && (
          <CardSection borderTop={true}>
            <CardRow>
              {player.team && player.teamRole && (
                <CardCell>
                  <LabeledTextBlock label="Main role" text={player.teamRole} />
                </CardCell>
              )}

              <CardCell alignEnd={true}>
                <HexagonBadgeList>
                  <HexagonBadge />
                  <HexagonBadge />
                  <HexagonBadge />
                </HexagonBadgeList>
              </CardCell>
            </CardRow>
          </CardSection>
        )} */}

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

export default PlayerCard;
