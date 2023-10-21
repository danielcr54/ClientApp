import React from 'react';
import { ButtonNavLink } from '@igg/common';
import {
  ActionBlock,
  ActionBlockMain,
  ActionBlockAside,
  ActionBlockContent,
  ActionBlockHeading,
  ActionBlockText,
  ActionBlockActions
} from '../shared/ActionBlock';
import { KycSidenoteMessage } from './KycSidenoteMessage';

export function KycDashboardActionBlock() {
  return (
    <ActionBlock>
      <ActionBlockMain>
        <ActionBlockContent>
          <ActionBlockHeading large={true}>
            Your account isn't verified yet
          </ActionBlockHeading>
          <ActionBlockText>
            In order to join tournament you need to verify your account
          </ActionBlockText>
          <ActionBlockActions>
            <ButtonNavLink to="/verify-identity">Verify</ButtonNavLink>
          </ActionBlockActions>
        </ActionBlockContent>
      </ActionBlockMain>

      <ActionBlockAside>
        <ActionBlockContent>
          <KycSidenoteMessage />
        </ActionBlockContent>
      </ActionBlockAside>
    </ActionBlock>
  );
}

export default KycDashboardActionBlock;
