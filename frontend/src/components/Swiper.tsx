import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import 'swiper/css';
import { Navigation, EffectCards, EffectCreative, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/navigation'
import 'swiper/css/effect-cards';
import '../assets/style.css'

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
}

const Slider: React.FC<SliderProps> = ({ images, onSlideChange }) => {
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

export default Slider;