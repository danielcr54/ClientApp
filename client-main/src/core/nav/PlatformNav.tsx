import React from 'react';
import styled from '@emotion/styled';
import { IoLogoPlaystation } from 'react-icons/io';
import {
  ScreenHeaderNavButton,
  Dropdown,
  DropdownContent
} from '@igg/common';
import PlatformMenu from './PlatformMenu';

// Visual helpers (should go to common under a different name)

const MenuPlaceholder = styled('div')({
  width: 210,
  padding: '12px 15px',
  fontSize: 20,
  color: 'white'
});

const MenuMessage = styled('div')({
  marginBottom: 8,
  fontSize: 14
});

const MenuNote = styled('div')({
  fontSize: 11,
  color: 'rgba(255, 255, 255, 0.5)'
});

// Exported components

export interface PlatformNavProps {
  platformList?: any[]; // TODO: type
}

export function PlatformNav({ platformList }: PlatformNavProps) {
  // TODO: Take from connected state or router
  const currentPlatform = 'PSN';
  function handlePlatformSelect(platformId: string) {
    console.log(`[TODO] Switch to the platform with ID: ${platformId}`);
  }

  return (
    <Dropdown>
      {({ isExpanded, toggle }) => (
        <>
          <ScreenHeaderNavButton
            fontSize={24}
            onClick={toggle}
            active={isExpanded}
          >
            <IoLogoPlaystation />
          </ScreenHeaderNavButton>

          <DropdownContent visible={isExpanded}>
            <PlatformMenu
              currentPlatform={currentPlatform}
              onPlatformSelect={handlePlatformSelect}
            />
          </DropdownContent>
        </>
      )}
    </Dropdown>
  );
}

export default PlatformNav;
