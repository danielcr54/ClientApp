import React from 'react';
import {
  IntroScreen,
  IntroScreenHeading,
  IntroScreenSubheading,
  IntroScreenText
} from '@igg/common';

export function App() {
  return (
    <IntroScreen>
      <IntroScreenHeading>client-admin</IntroScreenHeading>

      <IntroScreenSubheading>
        Welcome to Intergalactic Gaming!
      </IntroScreenSubheading>

      <IntroScreenText>
        <p>Project Pluto has been successfully initiated</p>
      </IntroScreenText>
    </IntroScreen>
  );
}

export default App;
