import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import axios from 'axios';
import '../assets/embla.css'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import 'semantic-ui-css/semantic.min.css'
import { UserAuth } from '../context/AuthContext';
import { useImage } from '../context/TodayPhotosContext';
import NewArrivalContest from './NewArrivalContest'
import { Footer } from './Footer';
import '../assets/top.css'
import { useInView } from 'react-intersection-observer';
import { TopPhotoSlider, TopContestSlider } from './Swiper';

const FadingElement = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    // rootMargin: '-150px',
  });

  return (
    <div ref={ref} className={`fadeUpTrigger z-20 ${inView ? 'fadeUp' : ''}`}>
      {children}
    </div>
  );
};

const Top = () => {

  const Styles = ({
    heightstyle: css ({
      height: '10vh',
      maxWidth: '1400px',
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '30px',
    }),
    TitleStyle: css ({
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '1px 1px 2px gray'
    }),
    ContestFrameStyles: css({
      display: 'flex',
      justifyContent: 'center',
      padding: '0 1.25rem',
    }),
    ContestItemStyles: css({
      padding: '10px 10px',
      border: 'solid 1px black'
    }),
    SectionStyles: css({
      paddingBottom: '1rem',
    }),
    SelectStyles: css({
      cursor: 'pointer',
      '&:hover': {
        fontWeight: 'bold',
      }
    }),
    SelectedStyles: css({
      fontWeight: 'bold',
      textDecoration: 'underline',
    }),
    ContestSectionStyle: css ({
      // minHeight: '21rem',
      top: "-2rem",
      width: "35%",
      height: '50rem',
      left: "65rem",
      position: 'relative',
      zIndex: '20',
      padding: '2rem 0',

    }),
    CoverStyle: css({
      transform: 'skewX(-10deg)',
      backgroundColor: 'white',
      height: '53rem',
      width: '20rem',
      position: 'absolute',
      zIndex: '10',
      top: '-1rem',
      left: '60rem',
    }),
  })

  const { user } =  UserAuth() as { user: object };
  const { images } = useImage();
  const fadeUpRef = useRef(null);

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const [newArrivalContest, setNewArrivalContes] = useState([]);
  const [selectContest, setSelectContest] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('new_entertainment_contests');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/top`)
      .then(resp => {
        setNewArrivalContes(resp.data);
        setSelectContest(resp.data.new_entertainment_contests)
      }).catch(error => {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
    })
  },[]);


  const selectDepartment = (department: any) => {
    setSelectContest(newArrivalContest[department]);
    setSelectedDepartment(department);
  };


  return (
    <div className='relative'>
      {/* <div className="scrolldown"><span>Scroll</span></div> */}
        <section css={Styles.SectionStyles}>
          <div>
            <FadingElement>
              <h1 css={Styles.TitleStyle} className='fontLibre absolute z-10 text-white left-12 top-4 opacity-80'>ToDay's PickUp Photos</h1>
              {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} /> */}
              <TopPhotoSlider imagesUrl={images} />
            </FadingElement>
          </div>
        </section>

        <div css={Styles.CoverStyle}></div>

      <section css={Styles.ContestSectionStyle} >
        <div>
      <FadingElement>
        <h1 css={Styles.TitleStyle} className='fontLibre'>New Arrival Contests</h1>
      </FadingElement>
      <FadingElement>
        <div className='flex justify-around mb-12 mt-40'>
          <p className={`py-2.5 px-4 cursor-pointer hover:text-sky-700 relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100${selectedDepartment === 'new_entertainment_contests' ? 'after:scale-y-100 after:scale-x-100 text-sky-700 cursor-default' : ''}`}
            onClick={() => selectDepartment('new_entertainment_contests')}
          >
            エンタメ部門
          </p>
          <p className={`py-2.5 px-4 cursor-pointer hover:text-sky-700 relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100${selectedDepartment === 'new_serious_contests' ? 'after:scale-y-100 after:scale-x-100 text-sky-700 cursor-default' : ''}`}
            onClick={() => selectDepartment('new_serious_contests')}
          >
            キレイ部門
          </p>
        </div>
        </FadingElement>
        <FadingElement>
          <div className='mx-12 pt-12 flex justify-center items-center'>
            <TopContestSlider contests={selectContest}/>
            {/* <NewArrivalContest contest={selectContest}/> */}
          </div>
        </FadingElement>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Top
