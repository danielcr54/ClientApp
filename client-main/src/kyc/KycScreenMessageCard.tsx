import React from 'react';
import { Button } from '@igg/common';
import {
  MessageCard,
  MessageCardTitle,
  MessageCardText,
  MessageCardActions
} from '../shared/MessageCard';

export function KycScreenMessageCard() {
  return (
    <MessageCard>
      <MessageCardTitle>About Intergalactic Gaming</MessageCardTitle>

      <MessageCardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </MessageCardText>

      <MessageCardActions>
        <Button small={true} inverse={true}>
          Learn more
        </Button>
      </MessageCardActions>
    </MessageCard>
  );
}

export default KycScreenMessageCard;
