import styled from '@emotion/styled';
import { ButtonProps } from './Button';

// Specialized button containers

export interface ButtonRowProps {
  spacing?: number;
}

export const ButtonRow = styled('div')(({ spacing }: ButtonRowProps) => ({
  display: 'flex',
  width: '100%',

  '& > *:not(:last-of-type)': {
    marginRight: spacing ? spacing : 12
  }
}));

// Button contents

export interface ButtonContentCellProps {
  main?: boolean;
}

export const ButtonContentCell = styled('div')(
  ({ main }: ButtonContentCellProps) => ({
    flexGrow: main ? 1 : 0,
    flexShrink: 0,

    '&:not(:last-of-type)': {
      marginRight: 10,
      paddingRight: 10,
      borderRight: '1px solid rgba(0, 0, 0, 0.15)'
    }
  })
);

export const ButtonIcon = styled('span')(({ small }: ButtonProps) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: small ? 12 : 15,
  marginTop: small ? -2 : -4,
  marginBottom: small ? -2 : -4,
  marginLeft: small ? -2 : -4,
  marginRight: small ? 7 : 12
}));
