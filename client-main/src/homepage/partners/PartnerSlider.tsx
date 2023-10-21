import React, { Component } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { config } from 'config';
import { PartnerModel } from './types';
import PartnerSliderImage from './PartnerSliderImage';
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./custom.css"

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: true,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
};

const httpClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: 'application/json'
  }
});

export class PartnerSlider extends Component {

  state = {
    partners: [] as PartnerModel[]
  }

  componentDidMount() {
    httpClient.get(`/partner/get-partners`)
      .then(res => {
        const partners = res.data.partners;
        this.setState({ partners });
      })
  }

  render() {
    return (
      <Slider {...sliderSettings} className="fadeout-elements" data-cy="aut-a-partner-slider">
        {this.state.partners.map(partner => (
          <PartnerSliderImage partner={partner} key={partner.id} />
        ))}
      </Slider>
    );
  }
}

export default PartnerSlider;
