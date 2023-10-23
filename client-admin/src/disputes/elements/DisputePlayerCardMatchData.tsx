import React, { Component } from 'react';
import styled from '@emotion/styled';
import { IssuedActionModel } from 'disputes/types';
import { Input } from '@igg/common/lib';
import { Label } from './Label';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const DisputePlayerCardMatchDataContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 15
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
  padding: 10
});

export const NoContent = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  color: 'rgba(255, 255, 255, 0.5)'
});

export interface DisputePlayerCardMatchDataProps {
  issuedActions?: IssuedActionModel[]
  streamingLink?: string;
}

export class DisputePlayerCardMatchData extends Component<DisputePlayerCardMatchDataProps> {

  render() {
    const {
      issuedActions, streamingLink
    } = this.props;
    
    return (
      <>
        {streamingLink && (
          <DisputePlayerCardMatchDataContainer>
            <Label
              text="Streaming Link"
            />
            <Input
              disabled={true}
              placeholder="Streaming Link"
              icon={FaExternalLinkAlt}
              iconLink={streamingLink}
              value={streamingLink}
            />
          </DisputePlayerCardMatchDataContainer>
        )}
        <DisputePlayerCardMatchDataContainer>
          <Label
            text="Previously Issued Actions"
          />
          {!!issuedActions ? (
            issuedActions.map(action => (
              <IssuedActionsContainer>
                <IssuedAction>
                  <div>
                    {action.title}
                  </div>
                  <div>
                    {action.issueDate.toLocaleDateString('en-GB')}
                  </div>
                </IssuedAction>
              </IssuedActionsContainer>
            ))
          ) : (
            <IssuedActionsContainer>
              <NoContent>
                No previous Actions
              </NoContent>
            </IssuedActionsContainer>
          )}
          
        </DisputePlayerCardMatchDataContainer>
      </>
    );
  }
}