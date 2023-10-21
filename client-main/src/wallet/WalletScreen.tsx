import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import {
  ScreenContentHeader,
  ScreenContentHeading,
  ScreenContentSubheading,
  LoadingScreen
} from '@igg/common';
import { FormElement, FieldLabel, Input } from '@igg/common/lib/forms';
import MakeATransferButton from './MakeATransferButton';
import { withRouter } from 'react-router';
import { WalletModel, WalletBalanceModel } from './types';
import { AdvancedSettingsModal } from './AdvancedSettingsModal';

export interface WalletScreenProps {
  wallet: WalletModel;
}

export class WalletScreen extends React.Component<WalletScreenProps> {
  render() {
    const { wallet } = this.props;
    const IGGBalance = this.getBalance('IGG');

    return (
      <>
        <ScreenContentHeader>
          <ScreenContentHeading>
            {IGGBalance ? IGGBalance.amount : 0} IGG
          </ScreenContentHeading>
          <ScreenContentSubheading>
            Lorem ipsum. Anim irure proident labori s qui minim magna dolor
            cupidatat velit consequat magna laboris occaecat enim.
          </ScreenContentSubheading>
        </ScreenContentHeader>
        <MakeATransferButton />
        <FormElement>
          <FieldLabel>Your IG Wallet address</FieldLabel>
          <Input type="text" value={wallet.address} readOnly={true} />
        </FormElement>
        <AdvancedSettingsModal passwordSet={wallet.salt === ''} />
        {/* TODO: ^ Load if password is set from user */}
        <ScreenContentSubheading>Your Token Balances</ScreenContentSubheading>
        <table>
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Description</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              if (wallet.balances.length) {
                return wallet.balances.map(balance => {
                  return (
                    <tr key={balance.id}>
                      <td>
                        {balance.token.name} ({balance.token.abbreviation})
                      </td>
                      <td>{balance.token.description}</td>
                      <td>{balance.amount}</td>
                    </tr>
                  );
                });
              } else {
                return (
                  <tr>
                    <td colSpan={3}>No balances found</td>
                  </tr>
                );
              }
            })()}
          </tbody>
        </table>
        <ScreenContentSubheading>Latest Transactions</ScreenContentSubheading>
        <table>
          <thead>
            <tr>
              <th>ACCOUNT</th>
              <th>HASH</th>
              <th>BLOCK</th>
              <th>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              if (wallet.balances.length) {
                return wallet.transactions.map(transaction => {
                  return (
                    <tr key={transaction.id}>
                      <td>Unknown - TODO: Lookup user</td>
                      <td>{transaction.hash}</td>
                      <td>
                        {transaction.amount} {transaction.token.abbreviation}
                      </td>
                      <td>{transaction.timestamp}</td>
                    </tr>
                  );
                });
              } else {
                return (
                  <tr>
                    <td colSpan={5}>No transactions found</td>
                  </tr>
                );
              }
            })()}
          </tbody>
        </table>
      </>
    );
  }

  getBalance(token: string): WalletBalanceModel | undefined {
    const { wallet } = this.props;

    return wallet.balances.find(balance => balance.token.name === token);
  }
}

const GET_WALLET_QUERY = gql`
  {
    platformWallet {
      address
      salt
      balances {
        amount
        token {
          name
          abbreviation
        }
      }
      transactions {
        amount
        token {
          abbreviation
        }
        hash
        status
        toAddress
        fromAddress
      }
    }
  }
`;

export function WalletScreenConnected() {
  return (
    <Query query={GET_WALLET_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <LoadingScreen />;
        if (error) return null; // TODO: handle this

        return <WalletScreen wallet={data.platformWallet} />;
      }}
    </Query>
  );
}

export default withRouter(WalletScreenConnected);
