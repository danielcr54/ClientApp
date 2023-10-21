import React from 'react';
import { ConsoleIcon } from './ConsoleIcon';
import { HexagonBadge, HexagonBadgeList } from './HexagonBadge';

export interface ConsoleBadgeIconsBlockProps {
  consoleIds?: string[];
  size?: number;
}

export function ConsoleBadgeIconsBlock({
  consoleIds,
  size = 36
}: ConsoleBadgeIconsBlockProps) {
  if (!consoleIds || !consoleIds.length) return null;

  return (
    <HexagonBadgeList spacing={10}>
      {consoleIds.map(consoleId => (
        <HexagonBadge key={consoleId} size={size}>
          <ConsoleIcon consoleId={consoleId} size={size / 2} />
        </HexagonBadge>
      ))}
    </HexagonBadgeList>
  );
}
