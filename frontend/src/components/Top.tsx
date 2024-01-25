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

const FadingElement = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: false, // 一度だけアニメーションを実行する
    rootMargin: '-150px',
  });

  return (
    <div ref={ref} className={`fadeUpTrigger ${inView ? 'fadeUp' : ''}`}>
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
      minHeight: '40px',
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
      marginBottom: '6rem',
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
      minHeight: '21rem',
    })
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
    <div>
      <div className="scrolldown"><span>Scroll</span></div>
        <section css={Styles.SectionStyles}>
          <div>
            <h1 css={Styles.TitleStyle} className='fontLibre'>ToDay's PickUp Photos</h1>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
          </div>
        </section>
      <section className='bg-gray-50 py-12'>
      <FadingElement>
        <h1 css={Styles.TitleStyle} className='fontLibre'>New Arrival Contests</h1>
      </FadingElement>
      <FadingElement>
        <div className='flex justify-around mb-12 mt-12'>
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
          <div css={Styles.ContestSectionStyle}>
            <NewArrivalContest contest={selectContest}/>
          </div>
        </FadingElement>
      </section>
      <Footer />
    </div>
  )
}

export default Top
