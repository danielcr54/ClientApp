import React from 'react';
import styled from '@emotion/styled';
import {
  ScreenHeaderNavButton,
  Dropdown,
  DropdownContent,
  Fifa19Logo
} from '@igg/common';

// Visual helpers (should go to common under a different name)

const GameTitleMenuPlaceholder = styled('div')({
  width: 210,
  padding: '12px 15px',
  fontSize: 20,
  color: 'white'
});

const GameTitleMenuMessage = styled('div')({
  marginBottom: 8,
  fontSize: 14
});

const GameTitleMenuNote = styled('div')({
  fontSize: 11,
  color: 'rgba(255, 255, 255, 0.5)'
});

// Exported component

export interface GameTitleNavProps {
  gameTitleList?: any[]; // TODO: type and use when more are supported
}

export function GameTitleNav({ gameTitleList }: GameTitleNavProps) {
  return (
    <Dropdown>
      {({ isExpanded, toggle }) => (
        <>
          <ScreenHeaderNavButton
            fontSize={24}
            onClick={toggle}
            active={isExpanded}
            data-cy="aut-b-header-games"
          >
            <Fifa19Logo />
          </ScreenHeaderNavButton>

          <DropdownContent visible={isExpanded}>
            <GameTitleMenuPlaceholder>
              <GameTitleMenuMessage>
                Only <strong>FIFA</strong> game title is currently supported.
              </GameTitleMenuMessage>
              <GameTitleMenuNote>
                But we're constantly improving our platform and more are coming
                soon, so stay tuned!
              </GameTitleMenuNote>
            </GameTitleMenuPlaceholder>
          </DropdownContent>
        </>
      )}
    </Dropdown>
  );
}

export default GameTitleNav;
