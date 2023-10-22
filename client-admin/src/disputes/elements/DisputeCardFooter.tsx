import React, { Component } from 'react';
import styled from '@emotion/styled';
import { SubmitButton } from '@igg/common/lib';
import { UserModel } from 'login/types';
import { ClaimDisputeMutation } from 'disputes/mutations/ClaimDisputeMutation';
import { FIFA_MATCHES_DISPUTES_QUERY } from '../FifaMatchDisputesQuery'

export const DisputeCardFooterContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 5
});

export const DisputeCardFooterClaimedBy = styled('div')({
  fontSize: 18
});

export const DisputeCardFooterClaimButton = styled('div')({
  
});

export interface DisputeCardFooterProps {
  claimedBy?: UserModel;
  matchId: string;
}

export class DisputeCardFooter extends Component<DisputeCardFooterProps> {

  render() {
    const {
      claimedBy, matchId
    } = this.props;
    
    return (
      <DisputeCardFooterContainer>
        <DisputeCardFooterClaimedBy>
          {claimedBy ? (
            "Claimed by " + claimedBy.profile.firstName + " " + claimedBy.profile.lastName
          ) : (
            "Claim issue to resolve"
          )}
        </DisputeCardFooterClaimedBy>
        <DisputeCardFooterClaimButton>
          <ClaimDisputeMutation>
              {(claimDispute, { loading, error, data }) => (
                <SubmitButton
                  disabled={!!claimedBy}
                  inProgress={loading}
                  success={
                    data && !!data.claimFifaMatchDispute
                  }
                  progressText="Claiming..."
                  successText="Claimed By You"
                  glow={true}
                  onClick={() => {
                    claimDispute({
                      variables: {
                        input: {
                          matchId
                        }
                      },
                      refetchQueries: [{ query: FIFA_MATCHES_DISPUTES_QUERY }]
                    });
                  }}
                >
                  {claimedBy ? (
                    "Already claimed"
                  ) : (
                    "Claim"
                  )}
                </SubmitButton>
              )}
            </ClaimDisputeMutation>
        </DisputeCardFooterClaimButton>
      </DisputeCardFooterContainer>
    );
  }
}