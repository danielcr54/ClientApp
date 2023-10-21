import React, { Component } from 'react';
import styled from '@emotion/styled';
import ResolveDisputeStateContainer from 'disputes/states/ResolveDisputesStateContainer';
import { DisputeActionModel, FifaMatchDisputeActionType } from 'disputes/types';
import { Dropdown, DropdownContent } from '@igg/common/lib';
import { colors } from '@igg/common/lib/styleSettings';
import { FaTimes, FaCaretDown } from 'react-icons/fa';

const actionYellowCard: DisputeActionModel = {
  id: `action-yellow`,
  title: 'Issue a Yellow Card',
  isEnforcementAction: false,
  actionType: FifaMatchDisputeActionType.YELLOW_CARD
};

const actionRedCard: DisputeActionModel = {
  id: `action-red`,
  title: 'Issue a Red Card',
  isEnforcementAction: false,
  actionType: FifaMatchDisputeActionType.RED_CARD
};

const actionDisqualify: DisputeActionModel = {
  id: `action-disqualify`,
  title: 'Disqualify Player',
  isEnforcementAction: true,
  actionType: FifaMatchDisputeActionType.DISQUALIFY_PLAYER
};

const actionQualify: DisputeActionModel = {
  id: `action-qualify`,
  title: 'Qualify Player',
  isEnforcementAction: true,
  actionType: FifaMatchDisputeActionType.QUALIFY_PLAYER
};

const actionList: DisputeActionModel[] = [
  actionYellowCard,
  actionRedCard,
  actionDisqualify,
  actionQualify
]

export const DisputePlayerCardIssueActionsContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

export const IssuedActionsContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 3,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  fontSize: 9,
  fontWeight: 300,
  marginBottom: 10
});

export const IssuedAction = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 10px'
});

export const RemoveAction = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: colors.white,
  color: '#28223d',
  cursor: 'pointer'
});

interface ActionSelectMenuItemProps {
  active?: boolean;
}

const ActionSelectMenuItem = styled('div')(
  ({ active }: ActionSelectMenuItemProps) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 30px 12px 12px',
    backgroundColor: 'white',
    transition: 'all 0.2s',
    color: active ? 'black' : 'rgba(0, 0, 0, 0.5)',

    '&:hover': {
      backgroundColor: active ? '#764cb3' : 'white',
      cursor: active ? 'pointer' : 'not-allowed'
    }
  })
);

const ActionSelectSubheader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 30px 10px 12px',
  backgroundColor: 'white',
  transition: 'all 0.2s',
  color: 'black',
  fontSize: 11,
  textTransform: 'uppercase',
  borderTop: '1px solid rgba(0, 0, 0, 0.2)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  cursor: 'default',
  whiteSpace: 'nowrap',

});

export const ActionDropdownContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#3b3252',
  color: '#b8b4c0',
  padding: '11px 20px',
  fontSize: 15,
  lineHeight: 1.2,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 3,
  borderColor: 'transparent',
  outline: 'none',
  marginBottom: 15
})

export const ActionDropdownButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  height: 35,
  width: 100,
  fontSize: 12,
  backgroundColor: 'white',
  transition: 'all 0.2s',
  color: 'black',
  textTransform: 'uppercase',

  '&:hover': {
    cursor: 'pointer'
  }
});

export interface DisputePlayerCardIssueActionsProps {
  resolveDisputeStateContainer: ResolveDisputeStateContainer;
  isHomePlayer: boolean;
  matchId: string;
}

export class DisputePlayerCardIssueActions extends Component<DisputePlayerCardIssueActionsProps> {

  render() {
    const { resolveDisputeStateContainer, isHomePlayer, matchId } = this.props;

    const actions = isHomePlayer ? resolveDisputeStateContainer.state.homeActions.filter(value => value.matchId === matchId)
      : resolveDisputeStateContainer.state.awayActions.filter(value => value.matchId === matchId);

    return (
      <>
        <ActionDropdownContainer>
          <div>
            Issue action
          </div>
          <Dropdown>
            {({ isExpanded, toggle, hide }) => (
              <>
                <ActionDropdownButton onClick={toggle}>
                  Actions
                  <FaCaretDown />
                </ActionDropdownButton>

                <DropdownContent
                  visible={isExpanded}
                  alignRight={true}
                >
                  <ActionSelectSubheader>
                    Enforcement Actions
                  </ActionSelectSubheader>
                  {actionList
                  .filter(action => action.isEnforcementAction)
                  .map(action => (
                    <ActionSelectMenuItem
                      key={action.id}
                      active={!action.isInActive}
                      onClick={() => {
                        if(!action.isInActive) {
                          resolveDisputeStateContainer.addAction(
                            isHomePlayer,
                            action.id,
                            action.title,
                            action.isEnforcementAction,
                            matchId,
                            action.actionType)
                          hide();
                        }
                      }}
                    >
                      { action.title }
                    </ActionSelectMenuItem>
                  ))}

                  <ActionSelectSubheader>
                    Disciplinary Actions
                  </ActionSelectSubheader>
                  {actionList
                  .filter(action => !action.isEnforcementAction)
                  .map(action => (
                    <ActionSelectMenuItem
                      key={action.id}
                      active={!action.isInActive}
                      onClick={() => {
                        resolveDisputeStateContainer.addAction(
                          isHomePlayer,
                          action.id,
                          action.title,
                          action.isEnforcementAction,
                          matchId,
                          action.actionType
                          )
                        hide();
                      }}
                    >
                      { action.title }
                    </ActionSelectMenuItem>
                  ))}
                </DropdownContent>
              </>
            )}
          </Dropdown>
        </ActionDropdownContainer>

        <DisputePlayerCardIssueActionsContainer>
          {actions.map((action, index) => (
            <IssuedActionsContainer>
              <IssuedAction>
                { action.title }
                <RemoveAction onClick={() => resolveDisputeStateContainer.removeAction(isHomePlayer, action.id, matchId)}>
                  <FaTimes />
                </RemoveAction>
              </IssuedAction>
            </IssuedActionsContainer>
          ))}
        </DisputePlayerCardIssueActionsContainer>
      </>
    );
  }
}
