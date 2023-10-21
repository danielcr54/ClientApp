import React, { Component } from 'react';
import SubmitButton, { SubmitButtonProps } from './SubmitButton';

export interface SubmitButtonWithResetState {
  reset: boolean;
}

export class SubmitButtonWithReset extends Component<SubmitButtonProps, SubmitButtonWithResetState> {
  state = {
    reset: true
  };

  componentDidUpdate(prevProps: SubmitButtonProps) {
    const { success, error } = this.props;
    if (prevProps.success !== success || prevProps.error !== error) {
      this.setState({
        reset: false
      });

      setTimeout(() => {
        this.setState({
          reset: true
        });
      }, 3000);
    }
  }

  render() {
    const { success, error } = this.props;
    const { reset } = this.state;
    return (
      <SubmitButton
        {...this.props}
        success={success && !reset}
        error={error && !reset}
      />
    )
  }
}

export default SubmitButtonWithReset;
