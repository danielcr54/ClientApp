import React from 'react';
import BalanceCard, { TokenBalance } from './BalanceCard';

export interface BalanceCardsProps {
  balances: TokenBalance[];
}

export function BalanceCards(props: BalanceCardsProps) {
  const { balances } = props;
  return (
    <>
      {balances.map(balance => (
        <BalanceCard
          key={balance.tokenName}
          tokenName={balance.tokenName}
          balance={balance.value.toString()}
        />
      ))}
    </>
  );
}

export default BalanceCards;
