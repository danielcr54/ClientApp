import React from 'react';
import {
  ScreenFooter,
  ScreenFooterContainer,
  ScreenFooterCell,
  ScreenFooterMenu,
  ScreenFooterMenuLink,
  ScreenFooterCopyright,
  styleSettings
} from '@igg/common';

const { deviceScreenQuery } = styleSettings;

export function AppFooter() {
  return (
    <ScreenFooterContainer>
      <ScreenFooter>
        <ScreenFooterCell>
          <ScreenFooterMenu>
            <ScreenFooterMenuLink target="_blank" to="/legal/terms-of-use.pdf">
              Terms of Use
            </ScreenFooterMenuLink>
            <ScreenFooterMenuLink
              target="_blank"
              to="/legal/privacy-policy.pdf"
            >
              Privacy Policy
            </ScreenFooterMenuLink>
            <ScreenFooterMenuLink
              target="_blank"
              to="/legal/cookies-policy.pdf"
            >
              Cookies Policy
            </ScreenFooterMenuLink>
            <ScreenFooterMenuLink target="_blank" to="/legal/global-rules.pdf">
              Global Rules
            </ScreenFooterMenuLink>
          </ScreenFooterMenu>
        </ScreenFooterCell>

        <ScreenFooterCell alignEnd={true}>
          <ScreenFooterCopyright>
            &copy; 2019 Intergalactic Gaming
          </ScreenFooterCopyright>
        </ScreenFooterCell>
      </ScreenFooter>
    </ScreenFooterContainer>
  );
}

export default AppFooter;
