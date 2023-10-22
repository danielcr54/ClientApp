import React, { Component } from 'react';
import styled from '@emotion/styled';
import { FifaMatchModel } from 'disputes/types';
import { DisputeCardHeader } from './DisputeCardHeader';
import { DisputePlayerCard } from './DisputePlayerCard';
import ResolveDisputeStateContainer from 'disputes/states/ResolveDisputesStateContainer';
import DisputeForm from './DisputeForm';
import { DisputeCardFooter } from './DisputeCardFooter';
import { NotesContainer } from './NotesContainer';
import { Label } from './Label';
import { DisputeCardDispute } from './DisputeCardDispute';
import { ResolveDisputeMutation } from 'disputes/mutations/ResolveDisputeMutation';
import { resolveGraphQLSubmitErrors } from 'shared/errorHelpers';
import { FIFA_MATCHES_DISPUTES_QUERY } from 'disputes/FifaMatchDisputesQuery';

export const DisputeCardContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#36304f',
  borderRadius: 3,
  padding: 16,
  marginBottom: 30
});

export const DisputeUserCardContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 25
});

export const DisputeSeperator = styled('div')({
  width: '100%',
  height: 20,
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});

export interface DisputeCardProps {
  fifaMatch: FifaMatchModel;
  resolveDisputeStateContainer: ResolveDisputeStateContainer;
  expanded?: boolean;
}

export class DisputeCard extends Component<DisputeCardProps> {

  render() {
    const {
      fifaMatch, resolveDisputeStateContainer, expanded
    } = this.props;
    
    return (
      <DisputeCardContainer>
        <DisputeCardHeader
          fifaMatch={fifaMatch}
        />

        {fifaMatch.disputes && fifaMatch.disputes.map(dispute => (
          <DisputeCardDispute
            disputeReason={dispute.reason}
            reportedBy={dispute.createdBy}
          />
        ))}

        {(expanded && (
          <>
            <DisputeUserCardContainer>
              <DisputePlayerCard
                player={fifaMatch.homePlayer}
                resolveDisputeStateContainer={resolveDisputeStateContainer}
                isHomePlayer={true}
                fifaMatch={fifaMatch}
              />
              <DisputePlayerCard
                player={fifaMatch.awayPlayer}
                resolveDisputeStateContainer={resolveDisputeStateContainer}
                isHomePlayer={false}
                fifaMatch={fifaMatch}
              />
            </DisputeUserCardContainer>

            <ResolveDisputeMutation>
              {(resolveDispute, { loading, error, data }) => (
                <DisputeForm
                  resolveDisputeStateContainer={resolveDisputeStateContainer}
                  fifaMatch={fifaMatch}
                  inProgress={loading}
                  success={!!data}
                  onSubmit={formModel => 
                    resolveDispute({
                      variables: {
                        input: {
                          matchId: fifaMatch.id,
                          resolutionNote: formModel.disputeResolutionNote,
                          homeScore: Number(formModel.homeScore),
                          awayScore: Number(formModel.awayScore),
                          homeActions: resolveDisputeStateContainer.state.homeActions
                            .filter(value => value.matchId === fifaMatch.id)
                            .map(value => value.actionType),
                          awayActions: resolveDisputeStateContainer.state.awayActions
                            .filter(value => value.matchId === fifaMatch.id)
                            .map(value => value.actionType)
                        }
                      },
                      refetchQueries: [{ query: FIFA_MATCHES_DISPUTES_QUERY }]
                    }).catch(resolveGraphQLSubmitErrors)
                  }
                />
              )}
            </ResolveDisputeMutation>
          </>
        ))}

        {(fifaMatch.disputeResolutionNote
        && fifaMatch.disputeResolvedAt
        && (
          <>
            <Label
              text={fifaMatch.disputeResolvedAt.toLocaleDateString('en-GB') + " Notes"}
            />
            <NotesContainer
              text={fifaMatch.disputeResolutionNote}
            />
          </>
        ))}

        <DisputeSeperator />

        <DisputeCardFooter
          claimedBy={fifaMatch.disputeClaimedBy}
          matchId={fifaMatch.id}
        />
      </DisputeCardContainer>
    );
  }
}