import React from 'react';
import styled from '@emotion/styled';

export const FieldError = styled('div')({
  padding: '8px 4px 4px',
  fontSize: 11,
  color: '#af4a4a' // TODO: Extract to `styleSettings`
});

FieldError.displayName = 'FieldError';

export default FieldError;
