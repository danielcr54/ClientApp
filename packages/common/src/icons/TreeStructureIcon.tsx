import React from 'react';

export function TreeStructureIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 16">
      <g id="Group">
        <circle fill="currentColor" cx="6" cy="2" r="2" />
        <circle fill="currentColor" cx="10" cy="13" r="2" />
        <circle fill="currentColor" cx="2" cy="13" r="2" />
        <polyline
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillOpacity={0}
          points="1.99737549 10.0218369 1.99737549 8.00382996 10.0037994 8.00382996 10.0037994 10.0218369"
        />
        <path
          d="M6.0213476,5.00784979 L6.0213476,7.92875332"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default TreeStructureIcon;
