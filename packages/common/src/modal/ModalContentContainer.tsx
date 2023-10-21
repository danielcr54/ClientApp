import styled from '@emotion/styled';

export interface ModalContentContainerProps {
  panelStyle?: boolean;
  dialogStyle?: boolean;
}

export const ModalContentContainer = styled('div')(
  ({ panelStyle = true, dialogStyle }: ModalContentContainerProps) => {
    panelStyle = panelStyle && !dialogStyle;

    return {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: panelStyle ? 'flex-end' : 'center',
      justifyContent: panelStyle ? 'stretch' : 'center',
      zIndex: 1,
      width: '100%',
      minHeight: '100vh',
      padding: panelStyle ? 0 : '0 20px',
      pointerEvents: 'none'
    };
  }
);

ModalContentContainer.displayName = 'ModalContentContainer';

export default ModalContentContainer;
