import React, { ComponentType, Component } from 'react';
import styled from '@emotion/styled';
import { IoLogoPlaystation, IoLogoXbox } from 'react-icons/io';
import { styleSettings } from '@igg/common';

const { colors } = styleSettings;

// Visual helpers (should be abstracted to `common`)

const PlatformMenuRoot = styled('div')({
  width: 210
});

interface PlatformMenuItemRoot {
  selected?: boolean;
}

const PlatformMenuItemRoot = styled('div')(
  ({ selected }: PlatformMenuItemRoot) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: selected ? colors.main : 'transparent',
    transition: 'all 0.2s',

    '&:hover': {
      backgroundColor: selected ? colors.main : '#764cb3',
      cursor: selected ? 'default' : 'pointer'
    }
  })
);

const PlatformMenuItemIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: 50,
  padding: '10px 15px',
  fontSize: 20,
  color: 'white'
});

const PlatformMenuItemBody = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: 15,
  paddingLeft: 0
});

const PlatformMenuItemLabel = styled('div')({
  fontSize: 14,
  color: 'white'
});

const PlatformMenuItemSublabel = styled('div')({
  fontSize: 12,
  color: 'rgba(255, 255, 255, 0.5)'
});

interface PlatformMenuItemProps {
  platformId: string;
  platformName: string;
  icon?: ComponentType;
  onClick?: (platformId: string) => void;
  selected?: boolean;
}

class PlatformMenuItem extends Component<PlatformMenuItemProps> {
  handleClick = () => {
    const { onClick, platformId } = this.props;
    if (typeof onClick === 'function') {
      onClick(platformId);
    }
  };
  render() {
    const { handleClick } = this;
    const { platformName, icon, selected } = this.props;
    const Icon = icon;

    return (
      <PlatformMenuItemRoot selected={selected} onClick={handleClick}>
        <PlatformMenuItemIcon>{Icon && <Icon />}</PlatformMenuItemIcon>
        <PlatformMenuItemBody>
          <PlatformMenuItemLabel>{platformName}</PlatformMenuItemLabel>
        </PlatformMenuItemBody>
      </PlatformMenuItemRoot>
    );
  }
}

// TEMP: Extract somewhere once needed somewhere else:

const PLATFORMS = [
  {
    id: 'PSN',
    name: 'PlayStation Network',
    icon: IoLogoPlaystation
  },
  {
    id: 'XBOX',
    name: 'XBOX Live',
    icon: IoLogoXbox
  }
];

// Exported component

export interface PlatformMenuProps {
  currentPlatform: string;
  onPlatformSelect?: (platformId: string) => void;
}

// tslint:disable-next-line:max-classes-per-file
export class PlatformMenu extends Component<PlatformMenuProps> {
  handlePlatformClick = (platformId: string) => {
    const { onPlatformSelect } = this.props;
    if (typeof onPlatformSelect === 'function') {
      onPlatformSelect(platformId);
    }
  };

  render() {
    const platforms = PLATFORMS;
    const { handlePlatformClick } = this;
    const { currentPlatform } = this.props;

    return (
      <PlatformMenuRoot>
        {platforms.map(platform => (
          <PlatformMenuItem
            key={platform.id}
            platformId={platform.id}
            platformName={platform.name}
            icon={platform.icon}
            selected={currentPlatform === platform.id}
            onClick={handlePlatformClick}
          />
        ))}
      </PlatformMenuRoot>
    );
  }
}

export default PlatformMenu;
