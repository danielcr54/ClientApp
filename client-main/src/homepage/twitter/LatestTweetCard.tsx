import React, { Component } from 'react';
import styled from '@emotion/styled';
import { deviceScreenQuery } from '@igg/common/lib/styleSettings';
import { TweetModel } from './types';
import { UserAvatar } from 'shared/UserAvatar';
import TwitterIcon from '../assets/TwitterIcon';

export const LatestTweetContainer = styled('div')({
  width: '90%',
  backgroundColor: '#28223d',
  display: 'flex',
  flexDirection: 'column',
  height: 182,
  borderRadius: 10,
  margin: '0px 5%',

  [`@media ${deviceScreenQuery.small}`]: {
    width: 280,
    margin: '0px 0px 15px'
  }
});

export const LatestTweetText = styled('div')({
  width: '75%',
  marginRight: '10px',
   
  [`@media ${deviceScreenQuery.small}`]: {
    width: '185px'
  }
});

export const LatestTweetTopRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '60px',

  '& > *': {
    marginLeft: '10px'
  }
});

export const LatestTweetContent = styled('div')({
  fontSize: 14,
  padding: '10px 10px'
});

export const TwitterIconContainer = styled('div')({
  paddingRight: 10
});

export const TweetLink = styled('a')({
  width: '100%',
  textDecoration: 'none',
  color: '#ffffff'
});

export interface LatestTweetCardProps {
  tweet: TweetModel
}

export class LatestTweetCard extends Component<LatestTweetCardProps> {
  render() {
    const {
      tweet
    } = this.props;

    return (
      <>
      {tweet.entities.urls.length > 0 ? (
        <TweetLink href={tweet.entities.urls[0].url}>
          <LatestTweetContainer>
            <LatestTweetTopRow>
              <UserAvatar imageUrl={tweet.user.profile_image_url_https} size={32} />
              <LatestTweetText>{tweet.user.name}</LatestTweetText>
              <TwitterIconContainer>
                <TwitterIcon />
              </TwitterIconContainer>
            </LatestTweetTopRow>
            <LatestTweetContent>
              {tweet.text}
            </LatestTweetContent>
          </LatestTweetContainer>
        </TweetLink>
      ) : (
        <LatestTweetContainer>
          <LatestTweetTopRow>
            <UserAvatar imageUrl={tweet.user.profile_image_url_https} size={32} />
            <LatestTweetText>{tweet.user.name}</LatestTweetText>
            <TwitterIconContainer>
              <TwitterIcon />
            </TwitterIconContainer>
          </LatestTweetTopRow>
          <LatestTweetContent>
            {tweet.text}
          </LatestTweetContent>
        </LatestTweetContainer>
      )}
      </>
    );
  }
}

export default LatestTweetCard;
