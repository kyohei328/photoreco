import { Group, Image } from '@mantine/core';
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import moment from 'moment';
import { Item } from 'semantic-ui-react'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'

const MypageLikePhoto = () => {

  const Styles = {
    ImageSectionStyle: css ({
    }),
    ImageFrameStyle: css({
      // width: '100%',
      // padding: '0 44px',
      // display: 'flex',
      // flexWrap: 'wrap',
      marginTop: '3rem',
      padding: '0 44px 5rem 44px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', /* 列数の自動調整 */
      gridGap: '10px', /* グリッドアイテム間の隙間を調整 */
    }),
    ImageStyle: css({
      // height: '15Vw',
      // width: '25Vw',
      // minHeight: '150px',
      // minWidth : '300px',
      // width: '100%',
      // objectFit: 'cover',
      maxHeight: '13vh',
      // objectFit: 'contain',
      objectFit: 'scale-down',
      
      // paddingTop: '100%', /* 縦横比を保つためのトリック */
    }),
    LogoStyle: css ({
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
    }),
  }

  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const { user } = UserAuth();

  const indexImages = images.map((image) =>(
    <div key={image.id} className='' >
      <Link to={`/photos/${image.id}`}>
        {/* <img
          css={Styles.ImageStyle}
          src={image.image_url}
        /> */}
          <Image
            css={Styles.ImageStyle}
            className='px-0 mb-1'
            radius="sm"
            src={image.image_url}
          />
      </Link>
    </div>
  ))

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 画面下部に達したらページ数をプラス
      setPage(page + 1);
    }
  };
  
    useEffect(() => {
      const userStatus = async () => {
        try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` }, params: {data_type: 'like_photos'} };
      const resp = await axios.get(`http://localhost:3000/api/v1/mypage?page=${page}`, config)
        setImages((prevImages) => [...prevImages, ...resp.data.photos]);
        console.log(resp.data);
      }catch (error) {
        console.error('Error fetching images:', error);
      }}
      userStatus();
    },[page]);

  console.log(page)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // コンポーネントがアンマウントされるときにイベントリスナーをクリーンアップ
      window.removeEventListener('scroll', handleScroll);

    };
  }, []); // 空の依存配列で初回のみ実行

  
  return (
    <div>
      <div css={Styles.ImageFrameStyle}>
        {indexImages}
      </div>
    </div>
  )
}

export default MypageLikePhoto