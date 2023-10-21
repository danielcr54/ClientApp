import styled from '@emotion/styled';

export interface ModalContainerProps {
  isOpen?: boolean;
}

export const ModalContainer = styled('div')(
  ({ isOpen }: ModalContainerProps) => ({
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto'
  })
);

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
