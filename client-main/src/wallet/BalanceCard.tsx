import React from 'react';
import { StaticText } from '@igg/common/lib';
import {
  Card,
  CardHeader,
  CardHighlightText,
  CardMainSection,
  CardContent,
  CardListItem,
  CardHeaderCell,
  CardContentCell,
  CardSection
} from 'shared/card';

export interface BalanceCardProps {
  tokenName: string;
  balance: string;
}

export interface TokenBalance {
  tokenName: string;
  value: number;
}

export function BalanceCard(props: BalanceCardProps) {
  const { tokenName, balance } = props;
  return (
    <CardListItem>
      <Card>
        <CardHeader>
          <CardHeaderCell>
            <CardHighlightText>{tokenName}</CardHighlightText>
          </CardHeaderCell>
        </CardHeader>
        <CardMainSection>
          <CardContent>
            <CardContentCell>
              <StaticText>{balance}</StaticText>
            </CardContentCell>
          </CardContent>
        </CardMainSection>
      </Card>
    </CardListItem>
  );
}

export default BalanceCard;
