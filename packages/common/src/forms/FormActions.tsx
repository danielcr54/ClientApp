import styled from '@emotion/styled';
import { deviceScreenQuery } from '../styleSettings';

export const FormActions = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  marginBottom: 20,

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
});

FormActions.displayName = 'FormActions';

export interface FormActionsContentProps {
  grow?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  verticalAlignCenter?: boolean;
}

export const FormActionsContent = styled('div')(
  ({
    grow,
    alignEnd,
    alignCenter,
    verticalAlignCenter
  }: FormActionsContentProps) => ({
    flexGrow: grow ? 1 : 0,
    flexShrink: 1,
    flexBasis: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignEnd ? 'flex-end' : alignCenter ? 'center' : 'flex-start',
    justifyContent: verticalAlignCenter ? 'center' : 'flex-start',
    width: '100%',

    '&:not(:last-of-type)': {
      marginBottom: 20
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      '&:not(:last-of-type)': {
        marginBottom: 0,
        marginRight: 15
      }
    }
  })
);

FormActionsContent.displayName = 'FormActionsContent';
