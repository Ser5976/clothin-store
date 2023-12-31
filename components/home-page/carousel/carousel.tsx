'use client';
import { FC, useRef, useState } from 'react';
import styles from './carousel.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BillboardType } from '@/types/carousel_type';
import { Slide } from './slide/slide';
import { SliderControls } from './slider-controls/slider-controls';
import { Arrows } from './arrows/arrows';

type CarouselPropsType = {
  billboard: BillboardType[];
};

const Carousel: FC<CarouselPropsType> = ({ billboard }) => {
  // при помощи ref мы добираемся до функций 'react-slick',чтобы потом использовать в своих компонентах
  const sliderRef = useRef<any>(null);
  // состояние используем для  кастомного SliderControls,который показывает номер слайда
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    //показывает активный слайд,нужен для кастомного SliderControls,при работе на тач скрине(перетягивание слайдов
    afterChange: (currentSlide: number) => {
      setCurrentSlide(currentSlide);
    },

    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  //используем в  SliderControls,чтобы перейти на нужный нам слайд
  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };
  // функции для стрелки
  const prevArrow = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const nextArrow = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className=" relative">
      <Slider ref={sliderRef} {...settings}>
        {billboard.map((slide) => {
          return <Slide slide={slide} key={slide.id} />;
        })}
      </Slider>
      {/*  кастомный компонент - номер слайда */}
      <div className="shared_container">
        <div className={styles.row}>
          {billboard.map((_, index) => {
            return (
              /* кастомный компонент,отображает номер слайда */
              <SliderControls
                index={index}
                currentIndex={currentSlide}
                setCurrentSlide={setCurrentSlide}
                goToSlide={goToSlide}
                key={index}
              />
            );
          })}
        </div>
      </div>
      {/*  кастомный компонент - стрелки */}
      <Arrows prevArrow={prevArrow} nextArrow={nextArrow} />
    </div>
  );
};

export default Carousel;
