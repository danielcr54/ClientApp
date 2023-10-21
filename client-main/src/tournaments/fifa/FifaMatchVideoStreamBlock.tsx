import React, { useState } from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';
import { styleSettings } from '@igg/common';
import { FifaMatchModel } from '../types';
import {
  Card,
  CardContent,
  CardContentCell,
  CardSection
} from '../../shared/card';
import mixerPlayer from '../../shared/video/mixerPlayer';
import { GameScoreBlock, GameScoreBlockGroup } from '../GameScoreBlock';

const { deviceScreenQuery, colors } = styleSettings;

/// @ts-ignore
ReactPlayer.addCustomPlayer(mixerPlayer);

// Styled helpers

// Layout

const FifaMatchVideoStreamBlockRoot = styled('div')({
  '&:not(:last-of-type)': {
    marginBottom: 20
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    '&:not(:last-of-type)': {
      marginBottom: 30
    }
  }
});

const FifaMatchVideoStreamBlockLayout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '100%',

  '&:not(:last-of-type)': {
    marginBottom: 15
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    flexDirection: 'row'
  }
});

const VideoContainer = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: 180,
  fontSize: 13,
  backgroundColor: '#000',
  color: colors.white,

  '&:not(:last-of-type)': {
    marginBottom: 15
  },

  [`@media ${deviceScreenQuery.medium}`]: {
    minHeight: 235,

    '&:not(:last-of-type)': {
      marginBottom: 0,
      marginRight: 15
    }
  }
});

const ScoreBlockContainer = styled('div')({
  flex: 1,
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch'
});

const VideoPlayerContainer = styled('div')({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%',
  height: '100%',

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > iframe': {
      height: '100%'
    }
  }
});

// Video config

const videoPlayerConfig = {
  twitch: {
    height: '100%'
  }
};

// Exported component

export interface FifaMatchVideoStreamBlockProps {
  match?: FifaMatchModel;
  isTeamMatch?: boolean;
}

export function FifaMatchVideoStreamBlock({
  match,
  isTeamMatch
}: FifaMatchVideoStreamBlockProps) {
  if (!match) return null;

  const [shouldShowAwayStream, setShouldShowAwayStream] = useState(false);
  const streamUrl = shouldShowAwayStream
    ? match.awayStreamUrl
    : match.homeStreamUrl;

  function showAwayStream() {
    setShouldShowAwayStream(true);
  }

  function showHomeStream() {
    setShouldShowAwayStream(false);
  }

  return (
    <FifaMatchVideoStreamBlockRoot>
      <Card faded={true}>
        <CardSection>
          <CardContent>
            <CardContentCell main={true}>
              <FifaMatchVideoStreamBlockLayout>
                <VideoContainer>
                  {streamUrl ? (
                    <ReactPlayer
                      url={streamUrl}
                      config={videoPlayerConfig as any}
                      wrapper={VideoPlayerContainer}
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    'STREAM IS UPCOMING'
                  )}
                </VideoContainer>

                <ScoreBlockContainer>
                  <GameScoreBlockGroup vertical={true}>
                    <GameScoreBlock
                      large={true}
                      player={match.homePlayer}
                      team={match.homeTeam}
                      isTeam={isTeamMatch}
                      score={match.homeScore || 0}
                      clickable={true}
                      highlighted={!shouldShowAwayStream}
                      onClick={showHomeStream}
                    />

                    <GameScoreBlock
                      large={true}
                      player={match.awayPlayer}
                      team={match.awayTeam}
                      isTeam={isTeamMatch}
                      score={match.awayScore || 0}
                      clickable={true}
                      highlighted={shouldShowAwayStream}
                      onClick={showAwayStream}
                    />
                  </GameScoreBlockGroup>
                </ScoreBlockContainer>
              </FifaMatchVideoStreamBlockLayout>
            </CardContentCell>
          </CardContent>
        </CardSection>
      </Card>
    </FifaMatchVideoStreamBlockRoot>
  );
}
