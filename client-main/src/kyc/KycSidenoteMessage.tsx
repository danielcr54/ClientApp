import React from 'react';
import { SidenoteMessage } from '../shared/SidenoteMessage';

export function KycSidenoteMessage() {
  return (
    <SidenoteMessage
      renderMessage={() => (
        <>
          You're about to unlock <strong>1933 IGG</strong> points
        </>
      )}
      note="Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor"
      leftIcon={true}
    />
  );
}

export default KycSidenoteMessage;
