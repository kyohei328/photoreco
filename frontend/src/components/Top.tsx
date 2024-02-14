import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import axios from 'axios';
import { EmblaOptionsType } from 'embla-carousel-react'
import 'semantic-ui-css/semantic.min.css'
import { UserAuth } from '../context/AuthContext';
import { useImage } from '../context/TodayPhotosContext';
import { Footer } from './Footer';
import '../assets/top.css'
import { useInView } from 'react-intersection-observer';
import { TopPhotoSlider, TopContestSlider } from './Swiper';
import { maxScreen } from '../mediaQueries';


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
    PhotoTitleStyle: css ({
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '1px 1px 2px gray',
      position: 'absolute',
      zIndex: '10',
      color: 'rgb(255 255 255)',
      left: '3rem',
      top: '1rem',
      opacity: '0.8',
      [maxScreen('lg')]: {
        fontSize: '18px',
        top: '0.1rem',
        left: '2rem',
      },
    }),
    ContestTitleStyle: css ({
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '1px 1px 2px gray',
      [maxScreen('lg')]: {
        fontSize: '18px',
      },
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
    PhotoSectionStyle: css({
      paddingBottom: '1rem',
      [maxScreen('lg')]: {
        height: '66Vw',
      },
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
      top: "-2rem",
      width: "35%",
      height: '80vh',
      left: "61vw",
      position: 'relative',
      zIndex: '20',
      padding: '2rem 0',
      [maxScreen('lg')]: {
        position: 'initial',
        width: '100%',
        height: '50dVh',
      },
    }),
    CoverStyle: css({
      transform: 'skewX(-10deg)',
      backgroundColor: 'white',
      height: '84.5Vh',
      width: '50%',
      position: 'absolute',
      zIndex: '10',
      top: '-1rem',
      left: '57vw',
      [maxScreen('lg')]: {
        display: 'none',
      },
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
        <section css={Styles.PhotoSectionStyle}>
          <div>
            <FadingElement>
              <h1 css={Styles.PhotoTitleStyle} className='fontLibre'>ToDay's PickUp Photos</h1>
              {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} /> */}
              <TopPhotoSlider imagesUrl={images}/>
            </FadingElement>
          </div>
        </section>

        <div css={Styles.CoverStyle}></div>

      <section css={Styles.ContestSectionStyle} >
        <div>
      <FadingElement>
        <h1 css={Styles.ContestTitleStyle} className='fontLibre'>New Arrival Contests</h1>
      </FadingElement>
      <FadingElement>
        <div className='flex justify-around mb-12 mt-40 max-lg:mt-14 max-lg:mb-0.5'>
          <p className={`py-2.5 px-4 cursor-pointer hover:text-sky-700 relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100${selectedDepartment === 'new_entertainment_contests' ? 'after:scale-y-100 after:scale-x-100 text-sky-700 cursor-default' : ''}`}
            onClick={() => selectDepartment('new_entertainment_contests')}
          >
            エンタメ部門
          </p>
          <p className={`py-2.5 px-4 cursor-pointer hover:text-sky-700 relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100${selectedDepartment === 'new_serious_contests' ? 'after:scale-y-100 after:scale-x-100 text-sky-700 cursor-default' : ''} `}
            onClick={() => selectDepartment('new_serious_contests')}
          >
            キレイ部門
          </p>
        </div>
        </FadingElement>
        <FadingElement>
          <div className='mx-12 pt-12 flex justify-center items-center max-lg:pt-4'>
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
