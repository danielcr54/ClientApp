import { Component, ReactNode } from 'react';

export interface ModalStateChildrenArg {
  isOpen?: boolean;
  open: () => void;
  close: () => void;
}

export interface ModalStateProps {
  children: (modalStateChildrenArg: ModalStateChildrenArg) => ReactNode;
  onClose?: () => void;
}

export interface ModalStateState {
  isOpen: boolean;
}

export class ModalState extends Component<ModalStateProps, ModalStateState> {
  state = {
    isOpen: false
  };

  open = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    this.setState({ isOpen: false });

    const { onClose } = this.props;
    if (typeof onClose === 'function') onClose();
  };

  render() {
    const { isOpen } = this.state;
    const { open, close } = this;
    const { children } = this.props;

    return children({ isOpen, open, close });
  }
}

export default ModalState;
