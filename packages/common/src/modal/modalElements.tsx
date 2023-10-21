import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { deviceScreenQuery, colors } from '../styleSettings';
import { Button } from '../buttons';

// Various Modal related helper components

export const ModalCloseButtonContainer = styled('div')({
  flexGrow: 0,
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 20,

  [`@media ${deviceScreenQuery.medium}`]: {
    marginBottom: 25
  }
});

// Modal "dialog" helper elements

export const ModalDialogMessage = styled('div')({
  margin: '0 auto',
  marginBottom: 25,
  fontSize: 18,
  lineHeight: 1.5,
  textAlign: 'center',
  color: colors.dark,

  [`@media ${deviceScreenQuery.medium}`]: {
    maxWidth: '80%'
  }
});

export const ModalDialogActions = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%'
});

export interface ModalDialogActionsCellProps {
  alignCenter?: boolean;
  alignEnd?: boolean;
}

export const ModalDialogActionsCell = styled('div')(
  ({ alignCenter, alignEnd }: ModalDialogActionsCellProps) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: alignCenter
      ? 'center'
      : alignEnd
      ? 'flex-end'
      : 'flex-start'
  })
);

// Buttons

export const ModalDialogButton = styled(Button, {
  shouldForwardProp: prop => isPropValid(prop)
})({
  flexGrow: 1,

  [`@media ${deviceScreenQuery.small}`]: {
    flexGrow: 0,
    minWidth: 150
  }
});
