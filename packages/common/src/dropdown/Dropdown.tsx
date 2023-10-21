import React, { Component, ReactNode } from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';
import { DropdownContainer } from './DropdownContainer';

export interface DropdownChildrenFnArg {
  isExpanded: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}

export interface DropdownProps {
  children?: (dropdownState: DropdownChildrenFnArg) => ReactNode;
  closesOn?: string;
  className?: string;
}

export interface DropdownState {
  isExpanded: boolean;
}

export class Dropdown extends Component<
  DropdownProps & InjectedOnClickOutProps,
  DropdownState
> {
  state = { isExpanded: false };

  toggle = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };
  
  show = () => {
    this.setState(state => ({ isExpanded: true }));
  };
  
  hide = () => {
    this.setState(state => ({ isExpanded: false }));
  };

  handleClick = (event: any) => {
    if (this.props.closesOn === 'click') {
      this.setState({ isExpanded: false });
    }
  };

  handleClickOutside = (event: any) => {
    if (!this.props.closesOn || this.props.closesOn === 'clickOutside') {
      this.setState({ isExpanded: false });
    }
  };

  render() {
    const { toggle, show, hide, handleClick } = this;
    const { isExpanded } = this.state;
    const { children, className } = this.props;

    return (
      <DropdownContainer onClick={handleClick} className={className}>
        {typeof children === 'function'
          ? children({ isExpanded, toggle, show, hide })
          : null}
      </DropdownContainer>
    );
  }
}

export default onClickOutside<DropdownProps>(Dropdown);
