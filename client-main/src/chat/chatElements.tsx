import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';

const { colors, deviceScreenQuery } = styleSettings;

// Chat navigation components

export const ChatNavSection = styled('div')({
  marginBottom: 15
});

export const ChatNavSectionHeader = styled('header')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '12px 12px',
  fontSize: 20,
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.55)',
  
  [`@media ${deviceScreenQuery.medium}`]: {
    padding: '10px 14px',
    fontSize: 13,
    fontWeight: 400
  }
});

export const ChatNavSectionHeaderFigure = styled('div')({
  marginRight: 10
});

export const ChatNavSectionBody = styled('div')({
  // TODO
});

// Contacts

export const ChatContactList = styled('div')({
  // TODO
});

export const ChatContactListItem = styled('div')({
  padding: '12px 16px',
  fontSize: 18,
  color: colors.white,

  [`@media ${deviceScreenQuery.medium}`]: {
    fontSize: 13
  }
});
