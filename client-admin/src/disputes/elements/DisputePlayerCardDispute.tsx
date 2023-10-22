import React, { Component } from 'react';
import styled from '@emotion/styled';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import { NotesContainer } from './NotesContainer';
import { FifaMatchModel, FifaMatchScoreSubmission } from 'disputes/types';

export const DisputePlayerCardDisputeContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 15
});

export const DisputePlayerCardDisputeImageContainer = styled('div')({
  width: '100%',
  marginBottom: 15
});

export const DisputePlayerCardDisputeReasonContainer = styled('div')({
  width: '100%',
  marginBottom: 15,
  fontSize:18
});

export interface DisputePlayerCardDisputeProps {
  fifaMatch: FifaMatchModel;
  scoreSubmission?: FifaMatchScoreSubmission;
  playerId: string;
}

export interface DisputePlayerCardDisputeState {
  currentImage: number;
  lightboxIsOpen?: boolean;
}

export class DisputePlayerCardDispute extends Component<
  DisputePlayerCardDisputeProps,
  DisputePlayerCardDisputeState
> {

  constructor(props: DisputePlayerCardDisputeProps) {
    super(props);
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event: any, obj: any) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    const {
      fifaMatch, scoreSubmission, playerId
    } = this.props;

    let filteredDispute;

    if(fifaMatch.disputes) {
      filteredDispute = fifaMatch.disputes.filter(dispute => dispute.player && dispute.player.id === playerId && dispute.comment)
    }

    const photos: any[] = [];

    if(scoreSubmission && scoreSubmission.screenshotUrls) {
      scoreSubmission.screenshotUrls.map(url => (
        photos.push({src: url, width: 4, height: 3})
      ))
      
    }
    
    return (
      <DisputePlayerCardDisputeContainer>
        {photos && (
          <DisputePlayerCardDisputeImageContainer>
            <Gallery
              photos={photos}
              onClick={this.openLightbox}
              columns={3}
            />
            <Lightbox images={photos}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
          </DisputePlayerCardDisputeImageContainer>
        )}

        {filteredDispute && filteredDispute[0] && filteredDispute[0].comment && (
          <NotesContainer
            text={filteredDispute[0].comment}
          />
        )}
      </DisputePlayerCardDisputeContainer>
    );
  }
}