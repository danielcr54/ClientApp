import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import {
  FooterContent,
  FooterContentStart,
  FooterContentEnd,
  FooterMenu,
  FooterMenuLink,
  FooterMenuDivider
} from '@igg/common';

export function AppContentFooter() {
  return (
    <FooterContent>
      <FooterContentStart>
        <FooterMenu>
          <FooterMenuLink primary={true} to="/new-tournament">
            Run a Tournament
          </FooterMenuLink>
          <FooterMenuLink primary={true} to="/sponsorship">
            Sponsor a League
          </FooterMenuLink>
          <FooterMenuDivider />
          <FooterMenuLink to="/terms-of-service">
            Terms of Service
          </FooterMenuLink>
          <FooterMenuLink to="privacy-policy">Privacy Policy</FooterMenuLink>
        </FooterMenu>
      </FooterContentStart>

      <FooterContentEnd>
        © 2017-2018 Intergalactic Gaming. All rights reserved.
      </FooterContentEnd>
    </FooterContent>
  );
}

export default AppContentFooter;
