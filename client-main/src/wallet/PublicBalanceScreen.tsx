import React, { Component } from 'react';
import {
  ScreenLayout,
  ScreenContent,
  LandingNav,
  ScreenContentSection,
  StarBackground,
  StaticText
} from '@igg/common';
import AppFooter from 'core/AppFooter';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import Helmet from 'react-helmet';
import BalanceForm, { BalanceFormModel } from './BalanceForm';
import * as TronWeb from 'tronweb';
import BalanceCard, { TokenBalance } from './BalanceCard';
import BalanceCards from './BalanceCards';
import { CardList } from 'shared/card';

export const BalanceContent = styled('div')({
  width: '50%',
  padding: '0px 20px',
  margin: 'auto auto',
  [`@media ${deviceScreenQuery.smallDown}`]: {
    marginBottom: 35,
    width: '100%'
  }
});

export const StyledScreenContentContainer = styled('div')({
  maxWidth: 1175,
  width: '100%',
  margin: '0 auto'
});

export const FormHeader = styled('div')({
  width: '100%',
  fontSize: 35,
  marginBottom: 20,
  fontWeight: 500
});

export const PaddingContainer = styled('div')({
  maxWidth: 1175,
  width: '100%',
  margin: '0 auto',
  padding: '0px 30px 50px',

  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '0px 60px 50px'
  }
});

export interface PublicBalanceScreenState {
  inProgress: boolean;
  tronWeb: any;

  formError?: string;

  IGG20?: bigint;
  balances?: TokenBalance[];
}

export class PublicBalanceScreen extends Component<
  {},
  PublicBalanceScreenState
> {
  constructor(props: {}) {
    super(props);
    const tronWeb = new TronWeb(
      'https://super.guildchat.io',
      'https://super.guildchat.io',
      'https://api.trongrid.io',
      'FEB4FA570340713B604A2978AD1B431A42A449E3909436D1D2E1F89E1002D126' // Random wallet
    );
    this.state = {
      inProgress: false,
      tronWeb
    };
  }

  handleBalanceFormSubmit = async (balanceForm: BalanceFormModel) => {
    this.setState({ inProgress: true, IGG20: undefined, balances: undefined });

    const contract = await this.state.tronWeb
      .contract()
      .at('TVQ6jYV5yTtRsKcD8aRc1a4Kei4V45ixLn');
    const IGG20 =
      (await contract
        .balanceOf(this.state.tronWeb.address.toHex(balanceForm.address))
        .call()) / ((1e6 as unknown) as bigint);

    const account = await this.state.tronWeb.trx.getUnconfirmedAccount(
      balanceForm.address
    );

    const whitelist = new Map([
      ['1000814', 'MGG'],
      ['1000822', 'TEG'],
      ['1000854', 'GSG'],
      ['1000891', 'DEG'],
      ['1000900', 'SEG'],
      ['1000914', 'FGG'],
      ['1000908', 'NCG'],
      ['1001041', 'MEG'],
      ['1001144', 'TKG'],
      ['1001799', 'DCG'],
      ['1000969', 'PRO'],
      ['1000317', 'IGG (TRC-10)']
    ]);
    const balances: TokenBalance[] = [];

    if (account.assetV2) {
      account.assetV2.forEach((asset: any) => {
        if (whitelist.has(asset.key)) {
          balances.push({
            tokenName: whitelist.get(asset.key) || '',
            value: asset.value
          });
        }
      });
    }

    this.setState({
      inProgress: false,
      IGG20,
      balances
    });
  };

  render() {
    const { tronWeb, inProgress, formError, IGG20, balances } = this.state;
    return (
      <>
        <Helmet
          meta={[
            {
              property: 'og:title',
              content: 'IG | IG Gold (TRC-20) Balance Checker'
            },
            { property: 'og:url', content: 'https://www.iggalaxy.com' },
            {
              property: 'og:image',
              content: 'https://www.iggalaxy.com/ig.png'
            },
            {
              property: 'og:description',
              content:
                "Welcome to the IGGalaxy! We're Intergalactic Gaming, an esports organisation dedicated to evolving the future of online competitive gaming. Through the IGGalaxy, we will unite the fragmented esports landscape, rewarding all participants regardless of skill level! Join the IGGalaxy to take your gaming to the next level."
            }
          ]}
        >
          <title>IG | IG Gold (TRC-20) Balance Checker</title>
        </Helmet>

        <ScreenLayout>
          <StarBackground />
          <PaddingContainer>
            <LandingNav />
          </PaddingContainer>
          <ScreenContent>
            <StyledScreenContentContainer>
              <ScreenContentSection>
                <BalanceContent>
                  <FormHeader>Check Token Balances</FormHeader>
                  <StaticText>
                    Enter your TRON address below to check your token balances
                    for IG Gold (TRC-20) and all IG partner tokens!
                  </StaticText>
                  <br />
                  <BalanceForm
                    tronWeb={tronWeb}
                    onSubmit={this.handleBalanceFormSubmit}
                    inProgress={inProgress}
                    formError={formError}
                  />
                </BalanceContent>
                {IGG20 && (
                  <CardList>
                    <BalanceCard
                      balance={IGG20.toString()}
                      tokenName={'IG Gold (TRC-20)'}
                    />
                  </CardList>
                )}
                {balances && balances.length > 0 && (
                  <CardList>
                    <BalanceCards balances={balances} />
                  </CardList>
                )}
              </ScreenContentSection>
            </StyledScreenContentContainer>
          </ScreenContent>
          <AppFooter />
        </ScreenLayout>
      </>
    );
  }
}

export default PublicBalanceScreen;
