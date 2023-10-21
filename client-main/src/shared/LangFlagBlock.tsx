import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { CountryFlagIcon } from './CountryFlagIcon';

export const LangFlagBlockRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 6px',
  borderRadius: 2,
  backgroundColor: '#231f32'
});

export const LangFlagBlockText = styled('div')({
  flex: 1,
  marginRight: 4,
  fontSize: 13,
  lineHeight: 1,
  color: 'rgba(255, 255, 255, 0.55)',
  textTransform: 'uppercase'
});

export const LangFlagBlockFlag = styled('div')({
  flex: 1,
  fontSize: 13,
  lineHeight: 1
});

// Helpers

// Extracts the 2 letter representing language only, i.e., `en-US` => `en`
function extractLanguage(langTag?: string) {
  if (!langTag) return '';
  return langTag.split('-')[0].toLowerCase();
}

export interface LangFlagBlockProps {
  // Language is assumed to be a language tag like `en-US`
  language?: string;
  countryCode?: string;
}

export function LangFlagBlock({ language, countryCode }: LangFlagBlockProps) {
  return (
    <LangFlagBlockRoot>
      {language && (
        <LangFlagBlockText>{extractLanguage(language)}</LangFlagBlockText>
      )}
      <LangFlagBlockFlag>
        <CountryFlagIcon countryCode={countryCode} size={13} />
      </LangFlagBlockFlag>
    </LangFlagBlockRoot>
  );
}
