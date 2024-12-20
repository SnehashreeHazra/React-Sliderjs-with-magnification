import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from 'react';

const ImageMagnifier = ({
  src,
  className,
  width,
  height,
  alt,
  magnifierHeight = 100,
  magnifierWidth = 100,
  zoomLevel = 2
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const mouseEnter = (e) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = (e) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const mouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        className={className}
        width={width}
        height={height}
        alt={alt}
        onMouseEnter={(e) => mouseEnter(e)}
        onMouseLeave={(e) => mouseLeave(e)}
        onMouseMove={(e) => mouseMove(e)}
      />
      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          pointerEvents: 'none',
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          opacity: '1',
          border: '1px solid lightgrey',
          backgroundColor: 'white',
          borderRadius: '50%',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  );
};

function Slider({ slides }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, EffectCoverflow]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      effect={'coverflow'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.image}>
          <ImageMagnifier
            src={slide.image}
            alt={slide.title}
            width="300" 
            height="200" 
            magnifierHeight={100}
            magnifierWidth={100}
            zoomLevel={2}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;