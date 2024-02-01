import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import 'swiper/css';
import { Navigation, EffectCards, EffectCreative, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
import '../assets/style.css'
import NewArrivalContest from './NewArrivalContest';
import { ContestCard, ContestResultCard } from './Card';
import { Pagination } from 'swiper/modules';
import { FaCircleChevronRight } from "react-icons/fa6";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useRef } from 'react';

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
}

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
          modules={[Navigation, EffectCards, EffectCreative, EffectCoverflow]}
          navigation
          effect="coverflow"
          // loop={true}
          onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
          // cardsEffect={{
          //   perSlideOffset: 15,
          //   perSlideRotate: 10,
          //   rotate: true,
          //   slideShadows: false,
          // }}
          slidesPerView={3}
          centeredSlides={true}
        //   creativeEffect={{
        //     limitProgress: 2,
        //     prev: {
        //         translate: ["100%", -200, -1000],
        //         rotate: [0, 0, 40],
        //         shadow: true,
        //     },
        //     next: {
        //         translate: ["-100%", 200, -1000],
        //         rotate: [0, 0, 40],
        //         shadow: true,
        //     },
        // }}
        coverflowEffect={{          // 追加
          rotate: 0,              // 追加 (前後のスライドの回転)
          depth: 100,             // 追加 (前後のスライドの奥行)
          stretch: 200,            // 追加 (スライド間のスペース)
          modifier: 1,            // 追加 (rotate・depth・stretchの値を乗算する)
          scale: 1,               // 追加 (前後のスライドのサイズ比率)
          slideShadows: true,    // 追加 (前後のスライド表面の影の有無)
        }}
          grabCursor={true}
        >
          {slideImages}
        </Swiper>
    );
};

const ContestSlider: React.FC<SliderProps> = ({ contests, contestResults })  => {
  const slideContests = Array.isArray(contests) ? contests.map((contest, index) => (
    <SwiperSlide key={index}>
      <ContestCard contest={contest}/>
    </SwiperSlide>
  )) :
    <SwiperSlide>
      <p>NG</p>
    </SwiperSlide>

  const slideContestsResults = Array.isArray(contestResults) ? contestResults.map((contestResult, index) => (
    <SwiperSlide key={index}>
      <ContestResultCard contestResult={contestResult}/>
    </SwiperSlide>
  )) :
    <SwiperSlide>
      <p>NG</p>
    </SwiperSlide>

    return (
        <Swiper
          className="contest-slider"
          modules={[Navigation, EffectCreative]}
          navigation
          // navigation={{
          //   nextEl: '.custom-button-prev',swiper-button-prev
          //   prevEl: '.custom-button-next',
          // }}
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
          {/* <div className="custom-button-prev">
            <FaChevronCircleLeft />
          </div>
          <div className="custom-button-next">
            <FaCircleChevronRight />
          </div> */}
        </Swiper>
    );
};

const VerticalSlider = ({ sliders })  => {
  const slideContent = Array.isArray(sliders) ? sliders.map((slide, index) => (
    <SwiperSlide key={index}>
      {slide}
    </SwiperSlide>
  )) :
    <SwiperSlide>
      <p>NG</p>
    </SwiperSlide>

    // const navigationPrevRef = useRef<HTMLDivElement>(null)
    // const navigationNextRef = useRef<HTMLDivElement>(null)

    return (
        <Swiper
          direction='vertical'
          className="vertical-slider"
          modules={[Navigation, Pagination]}
          // navigation={{
          //   nextEl: navigationPrevRef.current,
          //   prevEl: navigationNextRef.current,
          // }}
          // navigation={{
          //   nextEl: '.custom-button-prev',
          //   prevEl: '.custom-button-next',
          // }}
          navigation
          // slidesPerView={2}
          pagination={true}
          // centeredSlides={true}
          // grabCursor={true}
        >
          {slideContent}
          {/* <div className="custom-button-prev">
            <FaChevronCircleLeft />
          </div>
          <div className="custom-button-next">
            <FaCircleChevronRight />
          </div> */}
          {/* <div ref={navigationPrevRef}>
            <img src='../../public/contestIcon.ping'/>
          </div>
          <div ref={navigationNextRef}>
            <FaCircleChevronRight />
          </div> */}
        </Swiper>
    );
};

export { ContestSlider, PhotoSlider, VerticalSlider };
