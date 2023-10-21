import React from 'react';
import { Global, css } from '@emotion/core';

export function PreventDocumentScrollEffect() {
  return (
    <Global
      styles={css`
        html {
          overflow: hidden !important;
        }
      `}
    />
  );
}
