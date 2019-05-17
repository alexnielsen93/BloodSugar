import React from "react";
import Slider from "react-slick";

export default class TheSlider extends React.Component {
  render() {
    var settings = {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
      

    };
    return (
      <Slider {...settings} className= "slider-parent">

        <div className='img-1'><div><h1>
          Plan
          </h1></div></div>


        <div className='img-2'>
          <div>
            <h1>
              Measure
          </h1>
          </div></div>


        <div className='img-3'>
          <h1>Achieve</h1>
        </div>

      </Slider>
    );
  }
}

// https://cdn.stocksnap.io/img-thumbs/960w/KSVNE2NWQP.jpg PLAN/PREPARE

//MEASURE/ASSESS https://burst.shopifycdn.com/photos/wrtiting-tools.jpg?width=1850&amp;format=pjpg&amp;exif=0&amp;iptc=0
//IMPROVE/ACHIEVE https://burst.shopifycdn.com/photos/running-cloudy-day.jpg?width=1850&format=pjpg&exif=1&iptc=1

//glucograffer, sugartracker, I'mdiabeticandIneedaglucosetracker

