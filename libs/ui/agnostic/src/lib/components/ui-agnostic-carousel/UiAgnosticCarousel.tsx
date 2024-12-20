import Slider, { Settings } from 'react-slick';
import { UiAgnosticCarouselDot } from './UiAgnosticCarouselDot';
import { UiAgnosticCarouselImage } from './UiAgnosticCarouselImage';
import classes from './UiAgnosticCarousel.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from '@digital-wolf/types';

interface MainSliderProps {
  images?: Image[];
}

export function UiAgnosticCarousel({ images = [] }: MainSliderProps) {
  const settings: Settings = {
    lazyLoad: 'progressive',
    dots: true,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    autoplaySpeed: 10000,
    arrows: false,
    autoplay: true,
    customPaging: UiAgnosticCarouselDot,
  };

  return (
    <div className={classes.slider}>
      <div className={classes.container}>
        <div className={'overlay'} />
        <Slider {...settings}>
          {images.map((image) => (
            <UiAgnosticCarouselImage key={image.id} image={image} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

UiAgnosticCarousel.UiAgnosticCarouselDot = UiAgnosticCarouselDot;
UiAgnosticCarousel.UiAgnosticCarouselImage = UiAgnosticCarouselImage;
