import styled from '@emotion/styled';
import { colors, deviceScreenQuery } from '../styleSettings';

export interface ModalContentProps {
  panelStyle?: boolean;
  dialogStyle?: boolean;
  inverseStyle?: boolean;
  dangerStyle?: boolean;
  width?: string | number;
}

export const ModalContent = styled('div')(
  ({
    inverseStyle,
    panelStyle = true,
    dialogStyle,
    dangerStyle,
    width
  }: ModalContentProps) => {
    panelStyle = panelStyle && !dialogStyle;

    return {
      flex: panelStyle ? 1 : 0,
      display: 'block',
      zIndex: 1,
      width: '100%',
      maxWidth: dialogStyle ? 585 : 'none',
      margin: dialogStyle ? 20 : 0,
      padding: 15,
      background: inverseStyle ? colors.white : colors.dark,
      color: inverseStyle ? 'rgba(35, 31, 50, 0.7)' : colors.white,
      pointerEvents: 'auto',

      [`@media ${deviceScreenQuery.small}`]: {
        padding: panelStyle ? '20px 35px' : '25px 35px'
      },

      [`@media ${deviceScreenQuery.medium}`]: {
        minWidth: panelStyle ? 495 : 'auto',
        width: typeof width !== 'undefined' ? width : panelStyle ? 495 : 585,
        margin: dialogStyle ? 30 : 0,
        padding: panelStyle ? '30px 55px' : '35px 55px',
        borderLeft: panelStyle
          ? `1px solid ${dangerStyle ? colors.danger : colors.main}`
          : 'none'
      }
    };
  }
);

ModalContent.displayName = 'ModalContent';

export default ModalContent;
