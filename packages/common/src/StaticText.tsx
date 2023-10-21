import styled from '@emotion/styled';
import { colors, deviceScreenQuery } from './styleSettings';

export interface StaticTextProps {
  inverseContext?: boolean;
}

export const StaticText = styled('div')(
  ({ inverseContext }: StaticTextProps) => ({
    color: inverseContext ? 'rgba(35, 31, 50, 0.7)' : colors.white,
    userSelect: 'auto',

    '& h1': {
      marginTop: 0,
      marginBottom: 20,
      fontSize: 38,
      fontWeight: 500,
      color: inverseContext ? colors.dark : colors.white,

      [`@media ${deviceScreenQuery.medium}`]: {
        marginBottom: 30,
        fontSize: 48
      }
    },

    '& h4': {
      marginTop: 0,
      marginBottom: 12,
      fontSize: 16,
      fontWeight: 400,
      color: inverseContext ? colors.dark : colors.white,

      [`@media ${deviceScreenQuery.medium}`]: {
        marginBottom: 15,
        fontSize: 18
      }
    },

    '& p': {
      marginBottom: 18,
      fontSize: 13,
      lineHeight: 1.5
    },

    '& br': {
      height: 18
    }
  })
);
