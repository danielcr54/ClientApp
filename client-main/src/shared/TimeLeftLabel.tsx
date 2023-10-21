import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { styleSettings } from '@igg/common';
import { formatTimeLeftLabel } from '../tournaments/tournamentHelpers';

const { colors } = styleSettings;

export const StyledTimeLeftLabel = styled('div')({
  display: 'inline-block',
  padding: '2px 6px',
  fontSize: 13,
  lineHeight: 1.2,
  fontWeight: 400,
  borderRadius: 2,
  backgroundColor: colors.paleMain,
  color: colors.white
});

export interface TimeLeftLabelProps {
  untilTime?: Date;
}

function useTimeLeftLabel(untilTime?: Date) {
  const untilTimeMs = untilTime ? untilTime.getTime() : 0;
  const nowMs = Date.now();
  const [label, setLabel] = useState(formatTimeLeftLabel(untilTimeMs));

  // NOTE: 2 minutes before the match, switch to "update-per-second"
  const diffMs = untilTimeMs - nowMs;
  const secondsPrecision = diffMs > 0 && diffMs <= 2 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      setLabel(formatTimeLeftLabel(untilTimeMs));
    }, (secondsPrecision ? 1 : 60) * 1000);

    return () => clearInterval(interval);
  }, [untilTimeMs, secondsPrecision]);

  return label;
}

export function TimeLeftLabel({ untilTime }: TimeLeftLabelProps) {
  const timeLeftLabel = useTimeLeftLabel(untilTime);

  return <StyledTimeLeftLabel>{timeLeftLabel}</StyledTimeLeftLabel>;
}
