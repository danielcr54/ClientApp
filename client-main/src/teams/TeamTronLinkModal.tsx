import React, { Component, ReactNode } from 'react';
import { Redirect } from 'react-router';
import { FaBtc } from 'react-icons/fa';
import styled from '@emotion/styled';
import {
  styleSettings,
  ButtonNavLink,
  Modal,
  ModalStateChildrenArg,
  ModalDialogMessage,
  ModalDialogActions,
  ModalDialogActionsCell,
  ModalDialogButton
} from '@igg/common';
import { TronWebModel } from './types';

const { deviceScreenQuery, colors } = styleSettings;

const TronModalHeader = styled('h3')({
  fontSize: 18,
  fontWeight: 500,
  color: colors.black
});

const TronModalContainer = styled('div')({
  textAlign: 'center'
});

const TronModalContent = styled('p')({
  fontSize: 15,
  color: colors.black
});

const TronLinkDownloadContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: 20,
  padding: 30,
  border: '2px solid rgba(0,0,0,0.2)',
  borderRadius: 4
});

const TronLinkDownloadInner = styled('div')({
  textAlign: 'left'
});

const TronLinkIcon = styled(FaBtc)({
  width: 80,
  marginRight: 40,
  fontSize: '400%'
});

const TronLinkDownloadButton = styled('a')({
  padding: '14px 20px 13px',
  border: 0,
  borderRadius: 2,
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 1,
  textTransform: 'uppercase',
  textDecoration: 'none',
  outline: 'none',
  boxShadow: 'none',
  backgroundColor: colors.danger,
  color: colors.white,
  transition: 'all 0.2s'
});

export interface TeamTronLinkModalChildrenArg extends ModalStateChildrenArg {
  open: () => void;
}

export interface TeamTronLinkModalProps {
  tronState: TronWebModel;
  onDismiss?: () => void;
  onRetry: () => void;
  children?: (arg: TeamTronLinkModalChildrenArg) => ReactNode;
}

export interface TeamTronLinkModalState {
  isOpen?: boolean;
}

class TeamTronLinkModal extends Component<TeamTronLinkModalProps, TeamTronLinkModalState> {
  state = {
    isOpen: false
  };

  open = () => {
    this.setState({
      isOpen: true
    });
  };

  close = () => {
    const { onDismiss } = this.props;

    this.setState(
      {
        isOpen: false
      },
      () => {
        if (typeof onDismiss === 'function') onDismiss();
      }
    );
  };

  render() {
    const {
      children,
      tronState,
      onRetry
    } = this.props;
    const { isOpen } = this.state;
    const { open, close } = this;

    return (
      <>
        {isOpen && tronState.installed && tronState.loggedIn && (
          <Redirect to={`/teams/create`} />
        )}

        {typeof children === 'function' && children({ open, close })}

        <Modal
          dialogStyle={true}
          inverseStyle={true}
          isOpen={isOpen}
          onRequestClose={close}
        >
          <ModalDialogMessage />
          <TronModalContainer>
            <TronModalHeader>
              {!tronState.installed && `You haven't installed TronLink yet!`}
              {tronState.installed &&
                !tronState.loggedIn &&
                `It seems that your TronLink is locked`}
            </TronModalHeader>

            {!tronState.installed && (
              <>
                <TronModalContent>
                  You need to install Tronlink to authorize team creation payment
                </TronModalContent>
                <TronLinkDownloadContainer>
                  <TronLinkIcon />
                  <TronLinkDownloadInner>
                    <TronModalHeader>TronLink</TronModalHeader>
                    <TronModalContent>
                      An interactive browser extension for signing, receiving and
                      broadcasting TRON transactions
                    </TronModalContent>
                    <TronLinkDownloadButton
                      href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
                      target="_blank"
                    >
                      Download
                    </TronLinkDownloadButton>
                  </TronLinkDownloadInner>
                </TronLinkDownloadContainer>
              </>
            )}
            {tronState.installed && !tronState.loggedIn && (
              <TronModalContent>Please unlock it and try again</TronModalContent>
            )}
          </TronModalContainer>
          <ModalDialogActions>
            <ModalDialogActionsCell alignCenter={true}>
              <ModalDialogButton type="button" secondary={true} onClick={onRetry}>
                Retry
              </ModalDialogButton>
            </ModalDialogActionsCell>
          </ModalDialogActions>
        </Modal>
      </>
    );
  }
}

export default TeamTronLinkModal;
