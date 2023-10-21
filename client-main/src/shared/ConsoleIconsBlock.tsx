import React from 'react';
import { ConsoleIcon } from './ConsoleIcon';

export interface ConsoleIconsBlockProps {
  consoleIds?: string[];
}

export function ConsoleIconsBlock({ consoleIds }: ConsoleIconsBlockProps) {
  if (!consoleIds || !consoleIds.length) return null;

  return (
    <>
      {consoleIds.map(consoleId => (
        <ConsoleIcon key={consoleId} consoleId={consoleId} />
      ))}
    </>
  );
}
