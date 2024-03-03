import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import 'swiper/css';
import { Navigation, EffectCards, EffectCreative, EffectCoverflow, EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
import '../assets/style.css'
import '../assets/swiper.css'
import 'swiper/css/effect-fade';
import { ContestCard, ContestResultCard } from './Card';
import { css } from '@emotion/react'

interface SliderProps {
  images: {
    id: number;
    title: string;
    image_url: string;
    lat: null | number;
    lng: null | number;
    user_name: string;
    created_at: string;
    likes_count: number;
  }[];
  onSlideChange: (swiper: any) => void;
  contests: {
    id: number;
    title: string;
    description: string;
    user_avatar: string;
    user_name: string;
  }[];
  contestResults: {
    id: number;
    department: string;
    description: string;
    user: {
      name: string;
    }
  }[];
  imagesUrl: string[];
  windowWidth: number;
  selectedItem: string;
  contestDelete: (id: number) => void;
}

const TopPhotoSlider: React.FC<SliderProps> = ({ imagesUrl }) => {

  const Styles = ({
    SwiperStyle: css ({
      padding: '0 1rem',
      position: 'absolute',
      top: '-1rem',
    }),
  })

  const slideImages = imagesUrl.map((imageUrl, index) =>(
    <SwiperSlide key={index}>
      <img src={imageUrl} />
    </SwiperSlide>
  ))

    return (
        <Swiper
          className="today-photo-slider"
          css={Styles.SwiperStyle}
          modules={[Navigation, EffectFade, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          slidesPerGroup={1}
          effect="fade"
          speed={5000}
          centeredSlides={true}
        fadeEffect={{
          crossFade: true,
        }}
          grabCursor={true}
        >
          {slideImages}
        </Swiper>
    );
};

const TopContestSlider: React.FC<SliderProps> = ({ contests, selectedItem, contestDelete }) => {

  const Styles = ({
    SwiperStyle: css ({
      marginLeft: '2rem',
      position: 'absolute',
      top: '0rem',
    }),
  })

  const slideContests = Array.isArray(contests) ? contests.map((contest, index) => (
    <SwiperSlide key={index}>
      <ContestCard contest={contest} contestDelete={contestDelete} selectedItem={selectedItem}/>
    </SwiperSlide>
  )) :
    <SwiperSlide>
    </SwiperSlide>

    return (
        <Swiper
          className="top-contest-slider"
          modules={[Navigation, EffectCards]}
          navigation
          effect="cards"
          centeredSlides={true}
          cardsEffect={{
            perSlideOffset: 7,
            perSlideRotate: 5,
            rotate: true,
            slideShadows: false,
          }}
          grabCursor={true}
        >
          {slideContests}
        </Swiper>
    );
};

const PhotoSlider: React.FC<SliderProps> = ({ images, onSlideChange }) => {
  const slideImages = images.map((image, index) =>(
    <SwiperSlide key={index}>
      <Link to={`/photos/${image.id}`}>
        <img
          src={image.image_url}
        />
      </Link>
    </SwiperSlide>
  ))

    return (
        <Swiper
          className="sample-slider"
          modules={[Navigation, EffectCoverflow]}
          navigation
          effect="coverflow"
          onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
          slidesPerView={2}
          centeredSlides={true}
          coverflowEffect={{          // 追加
            rotate: 0,              // 追加 (前後のスライドの回転)
            depth: 100,             // 追加 (前後のスライドの奥行)
            stretch: 250,            // 追加 (スライド間のスペース)
            modifier: 0.5,            // 追加 (rotate・depth・stretchの値を乗算する)
            scale: 1,               // 追加 (前後のスライドのサイズ比率)
            slideShadows: true,    // 追加 (前後のスライド表面の影の有無)
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              coverflowEffect: {
                modifier: 1,
                stretch: 200,
              },
            },
          }}
          grabCursor={true}
        >
          {slideImages}
        </Swiper>
    );
};

const ContestSlider: React.FC<SliderProps> = ({ contests, contestResults, windowWidth})  => {

  const slideContests = Array.isArray(contests) ? contests.map((contest, index) => (
    <SwiperSlide key={index}>
      <ContestCard contest={contest}/>
    </SwiperSlide>
  )) :
    <SwiperSlide>
    </SwiperSlide>

  const slideContestsResults = Array.isArray(contestResults) ? contestResults.map((contestResult, index) => (
    <SwiperSlide key={index}>
      <ContestResultCard contestResult={contestResult} windowWidth={windowWidth}/>
    </SwiperSlide>
  )) :
    <SwiperSlide>
    </SwiperSlide>

    return (
        <Swiper
          className="contest-slider"
          modules={[Navigation, EffectCreative]}
          navigation
          effect="creative"
          slidesPerView={3}
          centeredSlides={true}
            creativeEffect={{
              limitProgress: 2,
              prev: {
                  translate: ["100%", -200, -1000],
                  rotate: [0, 0, 40],
                  shadow: false,
              },
              next: {
                  translate: ["-100%", 200, -1000],
                  rotate: [0, 0, 40],
                  shadow: false,
              },
            }}
          grabCursor={true}
        >
          {contests ? slideContests : contestResults ? slideContestsResults : null}
        </Swiper>
    );
};

const VerticalSlider = ({ sliders, windowWidth })  => {
  const slideContent = Array.isArray(sliders) ? sliders.map((slide, index) => (
    <SwiperSlide key={index}>
      {slide}
    </SwiperSlide>
  )) :
    <SwiperSlide>
      <p>NG</p>
    </SwiperSlide>

    return (
        <Swiper
          direction='vertical'
          className="vertical-slider"
          modules={[Navigation, Pagination]}
          navigation
          pagination={true}
        >
          {slideContent}
        </Swiper>
    );
};

export { ContestSlider, PhotoSlider, VerticalSlider, TopPhotoSlider, TopContestSlider };
