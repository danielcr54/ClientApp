import React from 'react';
import styled from '@emotion/styled';
import {
  FaTwitter as TwitterIcon,
  FaLinkedinIn as LinkedInIcon
} from 'react-icons/fa';
import { deviceScreenQuery } from '../styleSettings';
import { SocialLoginButton } from './SocialLoginButton';

export const SocialLoginBlockRoot = styled('div')({
  display: 'flex',
  marginBottom: 35,
  fontSize: 13,

  [`@media ${deviceScreenQuery.large}`]: {
    marginBottom: 0
  }
});

export const SocialLoginBlockText = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start'
});

export const SocialLoginBlockItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,

  '&:not(:last-of-type)': {
    marginRight: 12
  }
});

export function SocialLoginBlock() {
  return (
    <SocialLoginBlockRoot>
      <SocialLoginBlockText>Or sign in via social network</SocialLoginBlockText>
      <SocialLoginBlockItem>
        <SocialLoginButton>
          <LinkedInIcon />
        </SocialLoginButton>
      </SocialLoginBlockItem>
      <SocialLoginBlockItem>
        <SocialLoginButton>
          <TwitterIcon />
        </SocialLoginButton>
      </SocialLoginBlockItem>
    </SocialLoginBlockRoot>
  );
}

export default SocialLoginBlock;
