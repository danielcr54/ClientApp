import React, { Component } from 'react';
import { PartnerModel } from './types';
import styled from '@emotion/styled';

const PartnerImage = styled('img')({
  margin : "0 auto"
});

const PartnerImageDiv = styled('div')();

export interface PartnerSliderImageProps {
  partner: PartnerModel;
}

export class PartnerSliderImage extends Component<PartnerSliderImageProps> {
  render() {
    const {
      partner
    } = this.props;

    return (
      <PartnerImageDiv>
        <PartnerImage src={partner.logoUrl}/>
      </PartnerImageDiv>
    );
  }
}

export default PartnerSliderImage;
