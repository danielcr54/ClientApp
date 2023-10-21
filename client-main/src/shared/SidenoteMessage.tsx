import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { deviceScreenQuery, colors } = styleSettings;

// Specialized positioning container

export const SidenoteContainer = styled('div')({
  position: 'relative',
  marginBottom: 22,

  [`@media ${deviceScreenQuery.large}`]: {
    marginBottom: 0,

    // TODO: This is a true positioning and sizing hackery,
    // need to reconsider the entire implementation (beware: tricky)
    '& > *': {
      position: 'absolute',
      top: 5,
      left: 'calc(100% + 40px)',
      width: '40%',
      maxWidth: 235
    }
  }
});

// Styled helpers

interface SidenoteMessageStyledProps {
  leftIcon?: boolean;
}

const SidenoteMessageRoot = styled('div')(
  ({ leftIcon }: SidenoteMessageStyledProps) => ({
    display: 'flex',
    flexDirection: leftIcon ? 'row' : 'column'
  })
);

export const SidenoteMessageFigure = styled('div')(
  ({ leftIcon }: SidenoteMessageStyledProps) => ({
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#ffc200',
    overflow: 'hidden',
    marginBottom: leftIcon ? 0 : 15,
    marginRight: leftIcon ? 20 : 0
  })
);

export const SidenoteMessageBody = styled('div')({
  flex: 1
});

export const SidenoteMessageMessage = styled('div')({
  fontSize: 15,
  color: 'white',
  marginBottom: 5,

  '& strong': {
    fontWeight: 500
  }
});

export const SidenoteMessageNote = styled('p')({
  fontSize: 13,
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.55)'
});

export interface SidenoteMessageProps extends SidenoteMessageStyledProps {
  children?: ReactNode;
  message?: string;
  renderMessage?: () => ReactNode;
  note?: string;
}

export function SidenoteMessage({
  renderMessage,
  message,
  note,
  leftIcon
}: SidenoteMessageProps) {
  return (
    <SidenoteMessageRoot leftIcon={true}>
      <SidenoteMessageFigure leftIcon={true} />

      <SidenoteMessageBody>
        <SidenoteMessageMessage>
          {typeof renderMessage === 'function' ? renderMessage() : message}
        </SidenoteMessageMessage>

        {note && <SidenoteMessageNote>{note}</SidenoteMessageNote>}
      </SidenoteMessageBody>
    </SidenoteMessageRoot>
  );
}
