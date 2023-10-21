import styled from '@emotion/styled';

export interface ModalBackdropProps {
  isOpen?: boolean;
  dangerStyle?: boolean;
}

export const ModalBackdrop = styled('div')(
  ({ isOpen, dangerStyle }: ModalBackdropProps) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(15, 9, 25, 0.5)',
    transition: 'all 0.2s',
    opacity: isOpen ? 1 : 0
  })
);

ModalBackdrop.displayName = 'ModalBackdrop';

export default ModalBackdrop;
