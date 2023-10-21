import React from 'react';
import { ButtonNavLink } from '@igg/common/lib';
import { IoIosBug } from 'react-icons/io';

export function JiraIssueNav() {
  return (
    <ButtonNavLink
      to="/feedback.html"
      small={true}
      transparent={true}
      target="_blank"
    >
      <IoIosBug size={22} />
    </ButtonNavLink>
  );
}

export default JiraIssueNav;
