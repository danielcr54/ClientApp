import React, { Component } from 'react';
import Media from 'react-media';
import styled from '@emotion/styled';
import { styleSettings, Button } from '@igg/common';
import { TronWebModel } from './types';
import { USER_INFO_QUERY } from '../core/UserInfoQuery';
import {
  CreateTeamRequestMutation,
  CreateTeamRequestFn
} from './mutations/CreateTeamMutation';

const { deviceScreenQuery, colors } = styleSettings;

const TeamCreateTronLinkPaymentRoot = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: `linear-gradient(to right, rgba(0,0,0, 0.1) 0%, ${
    colors.dark
  } 100%)`
});

const TeamCreateTronLinkPaymentContainer = styled('div')({
  position: 'absolute',
  top: 40,
  padding: '30px 20px 10px',
  left: 20,
  right: 20,
  maxWidth: '100%',
  border: `1px solid ${colors.main}`,
  borderRadius: 5,
  backgroundColor: colors.dark,

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '50px 40px',
    left: 'initial',
    right: 40
  }
});

const TeamCreateTronLinkHeader = styled('h1')({
  marginBottom: 10,
  fontSize: 40,
  fontWeight: 600,
  lineHeight: 1.5,
  color: colors.white
});

const TeamCreateTronLinkFooter = styled('div')({
  fontSize: 16,
  fontWeight: 500,
  textAlign: 'center',
  textTransform: 'uppercase',
  color: colors.white
});

const TeamCreateTronLinkSubHeader = styled('h2')({
  marginBottom: 10,
  fontSize: 24,
  fontWeight: 500,
  textTransform: 'uppercase',
  color: colors.white
});

const TeamCreateTronLinkContent = styled('p')({
  marginBottom: 25,
  color: colors.white
});

const TeamCreateTronLinkButton = styled(Button)({
  //
});

interface TronWindow extends Window {
  tronWeb?: any;
}

interface TeamCreateTronLinkPaymentState {
  pending: boolean;
}

class TeamCreateTronLinkPayment extends Component<
  any,
  TeamCreateTronLinkPaymentState
> {
  state = {
    pending: false
  };

  async payWithTronLink() {
    const tronWeb = (window as TronWindow).tronWeb;

    const IGG_CONTRACT_BASE_HASH = 'TVQ6jYV5yTtRsKcD8aRc1a4Kei4V45ixLn';
    const IGG_CONTRACT_HEX = '41d51f8e9d2ef0a7317b758541b0a552706bedb3e8'.toUpperCase();
    const teamContractBase58Hash = 'TNoYiTPuCYFTLpywxGinvivRxgqBojSgqq';

    const TRC20_IGG_CONTRACT = await tronWeb
      .contract()
      .at(tronWeb.address.toHex(IGG_CONTRACT_BASE_HASH));
    const teamContract = await tronWeb.contract().at(teamContractBase58Hash);

    const creationCostResponse = await teamContract.creationCost().call();
    const creationCost = creationCostResponse._hex;

    const approveTransactionId = await TRC20_IGG_CONTRACT.approve(
      teamContractBase58Hash,
      creationCost.toString()
    ).send();
    return approveTransactionId;
  }

  render() {
    const { pending } = this.state;

    return (
      <TeamCreateTronLinkPaymentRoot>
        <TeamCreateTronLinkPaymentContainer>
          <TeamCreateTronLinkHeader>
            {!pending && `Authorise Payment`}
            {pending && `Pending Confirmation`}
          </TeamCreateTronLinkHeader>
          <TeamCreateTronLinkSubHeader>
            100,000 IG Gold
          </TeamCreateTronLinkSubHeader>
          <TeamCreateTronLinkContent>
            Are you sure you want to proceed with this payment? Once you have
            made this, you will not be able to reclaim your payment.
          </TeamCreateTronLinkContent>
          <Media query={deviceScreenQuery.medium}>
            {largeScreen => (
              <>
                {largeScreen && (
                  <>
                    {!pending && (
                      <CreateTeamRequestMutation>
                        {(saveTeamCreateRequest: CreateTeamRequestFn) => (
                          <TeamCreateTronLinkButton
                            block={true}
                            danger={true}
                            glow={true}
                            onClick={() => {
                              this.setState({
                                pending: true
                              });

                              this.payWithTronLink().then(
                                (transactionId: string) => {
                                  saveTeamCreateRequest({
                                    variables: { input: transactionId },
                                    refetchQueries: [
                                      {
                                        query: USER_INFO_QUERY
                                      }
                                    ]
                                  });
                                }
                              );
                            }}
                          >
                            Pay with TronLink
                          </TeamCreateTronLinkButton>
                        )}
                      </CreateTeamRequestMutation>
                    )}
                    {pending && (
                      <TeamCreateTronLinkButton
                        block={true}
                        transparent={true}
                        glow={true}
                      >
                        We are waiting for your transaction to be confirmed by
                        the blockchain!
                      </TeamCreateTronLinkButton>
                    )}
                  </>
                )}
                {!largeScreen && (
                  <TeamCreateTronLinkFooter>
                    {!pending && `You can authorize payment only on desktop`}
                    {pending && `Awaiting Confirmation`}
                  </TeamCreateTronLinkFooter>
                )}
              </>
            )}
          </Media>
        </TeamCreateTronLinkPaymentContainer>
      </TeamCreateTronLinkPaymentRoot>
    );
  }
}

export default TeamCreateTronLinkPayment;
