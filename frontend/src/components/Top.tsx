import { useState, useEffect } from 'react'
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
      marginBottom: '3rem',
    }),
    ContestFrameStyles: css({
      display: 'flex',
      justifyContent: 'center',
      // justifyContent: 'space-around',
      padding: '0 1.25rem',
    }),
    ContestItemStyles: css({
      // padding: '1rem 1rem',
      padding: '10px 10px',
      border: 'solid 1px black'
    }),
    SectionStyles: css({
      marginBottom: '3rem',
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
  })

  const { user } =  UserAuth() as { user: object };
  const { images } = useImage();
  console.log(images)

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const [newArrivalContest, setNewArrivalContes] = useState([]);
  const [selectContest, setSelectContest] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('new_entertainment_contests');

  useEffect(() => {
    // axios.get('http://localhost:3000/api/v1/top')
    axios.get(`${import.meta.env.VITE_BASE_URL}/top`)
      .then(resp => {
        setNewArrivalContes(resp.data);
        setSelectContest(resp.data.new_entertainment_contests)
        console.log(resp.data)
      }).catch(error => {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      // alert('エラーが発生しました: ' + error.message);
    })
  },[]);
  
  console.log(newArrivalContest)

  const selectDepartment = (department: any) => {
    setSelectContest(newArrivalContest[department]);
    setSelectedDepartment(department);
  };

  return (
    <div>
      <section css={Styles.SectionStyles}>
        <div>
          <h1 css={Styles.TitleStyle}>ToDay's PickUp Photos</h1>
          {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} images={CarouselImages} /> */}
          <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
        </div>
      </section>
      <section>
        <h1 css={Styles.TitleStyle}>新着コンテスト</h1>
        <div className='flex justify-around mb-5'>
          <p css={[Styles.SelectStyles, selectedDepartment === 'new_entertainment_contests' && Styles.SelectedStyles]}
            onClick={() => selectDepartment('new_entertainment_contests')}
          >
            エンタメ部門
          </p>
          <p css={[Styles.SelectStyles, selectedDepartment === 'new_serious_contests' && Styles.SelectedStyles]}
            onClick={() => selectDepartment('new_serious_contests')}
          >
            キレイ部門
          </p>
        </div>
        <NewArrivalContest contest={selectContest}/>
      </section>
      {/* <div css={Styles.heightstyle} >
        {user ? <p>Email : {user.email}</p> : <p>No user data</p>}
      </div> */}
      <Footer />
    </div>
  )
}

export default Top
