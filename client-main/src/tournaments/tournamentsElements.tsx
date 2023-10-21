import styled from '@emotion/styled';
import {
  styleSettings,
  ScreenContentHeader,
  ScreenContentHeading
} from '@igg/common';
import { CardList } from '../shared/card';

const { colors, deviceScreenQuery } = styleSettings;

// A set of feature-agnostic helper styled components
// to be across "Tournaments"

// NOTE: Some of them are to be extracted to a separate component file
// once grows large/complex enough

export const StyledTournamentCardList = styled(CardList)({
  [`@media ${deviceScreenQuery.small}`]: {
    gridTemplateColumns: `repeat(auto-fill, minmax(350px, 1fr))`
  }
});

export const TournamentRulesLink = styled('div')({
  display: 'inline-block',

  '&:not(:first-of-type)': {
    marginLeft: 10
  }
});

// Prizes

export const TournamentPrizeBlockList = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  marginBottom: -10,
  marginRight: -10,
  flexWrap: 'wrap',

  '& > *': {
    flexBasis: 'calc(50% - 20)',
    marginBottom: 10,
    marginRight: 20
  },

  [`@media ${deviceScreenQuery.small}`]: {
    '& > *': {
      flexBasis: 'auto',
      marginBottom: 0,
      marginRight: 'auto'
    }
  }
});

export interface TournamentPrizeBlockProps {
  spacing?: number;
}

export const TournamentPrizeBlock = styled('div')(
  ({ spacing }: TournamentPrizeBlockProps) => ({
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    paddingTop: 2,
    paddingBottom: 2,

    '&:not(:last-of-type)': {
      marginRight: typeof spacing !== 'undefined' ? spacing : 20
    }
  })
);

export const TournamentPrizeFigure = styled('div')({
  display: 'block',

  '&:not(:last-of-type)': {
    marginRight: 15
  }
});

export const TournamentPrizeIconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 35,

  '& > *': {
    flex: 1
  }
});

export interface TournamentPrizeTypeIconWrapperProps {
  size?: number;
}

export const TournamentPrizeTypeIconWrapper = styled('div')(
  ({ size }: TournamentPrizeTypeIconWrapperProps) => ({
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: size ? size : 35,
    height: size ? size : 35,
    fontSize: 20,
    fontWeight: 400,
    color: colors.main,

    '& > *': {
      flex: 1
    }
  })
);

export interface TournamentPrizeTypeCashIconWrapperProps {
  size?: number;
}

export const TournamentPrizeTypeCashIconWrapper = styled('div')(
  ({ size }: TournamentPrizeTypeCashIconWrapperProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size ? size : 35,
    height: size ? size : 35,
    fontSize: 20,
    fontWeight: 400,
    color: colors.main,
    borderRadius: '50%',
    backgroundColor: ' white',

    '& > *': {
      flex: 1
    }
  })
);

// Tournament details screen elements

export const TournamentDetailsScreenContentHeader = styled(ScreenContentHeader)(
  {
    paddingBottom: 15
  }
);

export const TournamentDetailsScreenHeading = styled(ScreenContentHeading)({
  display: 'flex',
  width: '100%',
  marginBottom: 5,

  [`@media ${deviceScreenQuery.medium}`]: {
    display: 'block'
  }
});

export const TournamentDetailsScreenHeadingText = styled('div')({
  flex: 1,
  display: 'block',
  marginRight: 15,
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [`@media ${deviceScreenQuery.medium}`]: {
    display: 'inline'
  }
});

export const TournamentDetailsScreenHeadingConsoles = styled('div')({
  flexShrink: 0,
  display: 'inline-block',
  transform: 'translateY(-5px)'
});

export const TournamentDetailsScreenSubheading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 5,
  fontSize: 13
});

export const TournamentDetailsMeta = styled('div')({
  marginBottom: 20,

  [`@media ${deviceScreenQuery.medium}`]: {
    marginBottom: 25
  }
});

export const TournamentDetailsMetaRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',

  '&:not(:last-of-type)': {
    marginBottom: 10
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row',
    alignItems: 'center',

    '&:not(:last-of-type)': {
      marginBottom: 15
    }
  }
});

export interface TournamentDetailsMetaCellProps {
  grow?: boolean;
}

export const TournamentDetailsMetaCell = styled('div')(
  ({ grow }: TournamentDetailsMetaCellProps) => ({
    flexGrow: grow ? 1 : 0,
    display: 'flex',
    flexWrap: 'wrap',

    '&:not(:last-of-type)': {
      marginBottom: 20,

      [`@media ${deviceScreenQuery.medium}`]: {
        marginBottom: 0,
        paddingRight: 15
      }
    }
  })
);

export const TournamentDetailsMetaStatsRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

export const TournamentDetailsMetaStatsCell = styled('div')({
  flexGrow: 0,
  flexShrink: 0,
  display: 'flex',

  '&:not(:first-of-type)': {
    paddingLeft: 15,

    [`@media ${deviceScreenQuery.small}`]: {
      paddingLeft: 20
    }
  },

  '&:not(:last-of-type)': {
    paddingRight: 15,
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',

    [`@media ${deviceScreenQuery.small}`]: {
      paddingRight: 20
    }
  }
});

export const TournamentModeIcon = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -7,
  marginBottom: -7,
  fontSize: 45
});

// Structure block

export const TournamentStructureContainer = styled('div')({});

export const TournamentStructureHeader = styled('header')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 15
});

export interface TournamentStructureHeaderItemProps {
  aligntEnd?: boolean;
  grow?: boolean;
  shrink?: boolean;
}
export const TournamentStructureHeaderItem = styled('div')(
  ({ aligntEnd, grow, shrink }: TournamentStructureHeaderItemProps) => ({
    flexGrow: grow ? 1 : 0,
    flexShrink: shrink === false ? 0 : 1,

    '&:not(:last-of-type)': {
      marginRight: 15
    }
  })
);

export const TournamentStructureBody = styled('div')({
  paddingTop: 10
});

export const TournamentStructureBodySection = styled('div')({
  '&:not(:last-of-type)': {
    marginBottom: 15
  }
});

export const TournamentStructureBodySectionHeading = styled('h3')({
  margin: '0 0 15px',
  fontSize: 13,
  color: colors.white
});

// Match time helpers

export const MatchTimeNote = styled('div')({
  marginBottom: 25,
  fontSize: 13
});

export const MatchTimeNoteMessage = styled('div')({
  marginBottom: 8,
  color: 'rgba(255, 255, 255, 0.55)'
});
