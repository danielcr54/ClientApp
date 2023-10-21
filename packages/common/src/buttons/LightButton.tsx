import styled from '@emotion/styled';
import { colors } from '../styleSettings';

export interface LightButtonProps {
  disabled?: boolean;
}

const disabledBgColor = 'rgba(255, 255, 255, 0.4)';
const disabledColor = colors.faded;

export const LightButton = styled('button')(
  ({ disabled }: LightButtonProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 13px 7px',
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1,
    border: 0,
    borderRadius: 3,
    textTransform: 'uppercase',
    backgroundColor: disabled ? disabledBgColor : 'white',
    boxShadow: disabled ? 'none' : '0 0 14px 0 #603da0',
    transition: 'all 0.2s',
    color: disabled ? disabledColor : colors.main,
    outline: 'none',

    '&:hover': {
      backgroundColor: disabled ? disabledBgColor : colors.main,
      color: disabled ? disabledColor : 'white',
      cursor: disabled ? 'default' : 'pointer'
    },

    '&:active, &:active:hover': {
      backgroundColor: disabled ? disabledBgColor : '#946fc7',
      color: disabled ? disabledColor : 'white',
      boxShadow: disabled ? 'none' : '0 0 0 0 #603da0'
    }
  })
);

export default LightButton;
