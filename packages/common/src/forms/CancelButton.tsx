import styled from '@emotion/styled';
import { colors, deviceScreenQuery } from '../styleSettings';

export interface CancelButtonProps {
  disabled?: boolean;
}

export const CancelButton = styled('button')(
  ({ disabled }: CancelButtonProps) => ({
    width: '100%',
    padding: '11px 12px',
    border: 0,
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: colors.faded,
    color: colors.white,
    textTransform: 'uppercase',
    textAlign: 'center',
    transition: 'all 0.2s',
    outline: 'none',

    '&:hover': {
      cursor: disabled ? 'default' : 'pointer',
      backgroundColor: disabled ? colors.faded : colors.secondary
    },

    [`@media ${deviceScreenQuery.medium}`]: {
      width: 'auto'
    }
  })
);

CancelButton.displayName = 'CancelButton';

export default CancelButton;
