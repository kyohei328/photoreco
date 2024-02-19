import { UserAuth } from '../context/AuthContext';
import { Image, Button, Grid, Textarea  } from '@mantine/core';
import { IconTrash, IconStar, IconStarFilled  } from '@tabler/icons-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Map from './Map'
import { TwitterIntentTweet } from "./Tweet.tsx";
import { Helmet } from 'react-helmet-async';
import { maxScreen } from '../mediaQueries.ts';
import useWindowSize from '../useWindowSize';

const ShowPhoto = () => {

  const Styles = {
    SectionStyle: css ({
      borderBottom: '1px solid',
      borderColor: '#ADB5BD',
    }),
    SectionTitleStyle: css ({
      borderBottom: '1px solid',
      borderColor: '#ADB5BD',
      fontWeight: 'bold',
      marginLeft: '3rem',
      marginRight: '3rem',
      [maxScreen('lg')]: {
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
      },
    }),
    ImageStyle: css ({
      maxHeight: '45vh',
      padding: '0 3rem',
      marginBottom: '1.25rem',
      objectFit: 'contain',
      [maxScreen('lg')]: {
        padding: '0',
        maxHeight: '70vw',
      },
    }),
    LikeStyles: css ({
      cursor: 'pointer',
    }),
    TrashStyle: css ({
      cursor: 'pointer',
    }),
  };

  const [photoData, setPhotoData] = useState({});
  const [photoUrl, setPhotoUrl] = useState({});
  const [postUser, setPostUser] = useState({});
  const [liked, setLiked] = useState(false);
  const [likedId, setLikedId] = useState();
  const [currentUid, setCurrentUid] = useState();
  const [category, setCategory] = useState({});

  const { id } = useParams();
  const { user } = UserAuth() as { user: object };
  const navigate = useNavigate();
  const [ windowWidth, windowHeight ] = useWindowSize()

    const fetchLikeStatus = async () => {
      try {
        if (user) {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` }, params: {photo_id: id} };
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos/likes`, config);
        setLiked(resp.data.like_stauts);
        setLikedId(resp.data.like_id)
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }

  useEffect (() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/photos/${id}`)
    .then(resp => {
      setPhotoData(resp.data.photo)
      setPhotoUrl(resp.data.photo_url)
      setPostUser(resp.data.photo.user)
      setCategory(resp.data.photo.category)
      { user &&
        setCurrentUid(user.uid)
      }
    }).catch(error => {
      console.error('Error fetching images:', error);
    });
    fetchLikeStatus();
  },[id]);


  const handleLikeToggle = async () => {
    try {
      if (liked) {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/likes/${likedId}`, config);
      } else {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        await axios.post(`${import.meta.env.VITE_BASE_URL}/likes`, {photo_id: id} ,config);
      }
      fetchLikeStatus();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const deletePhoto = async (id) => {
    try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/photos/${id}`, config);
      navigate('/photos')
    } catch (error) {
    console.error('Error toggling like:', error);
    }
  };

  const postDate = moment(photoData.created_at).format('YYYY年MM月D日');

  const Tweet = {
    text: currentUid === postUser.uid ? "写真を投稿しました" : `${photoData.title} | PhotoSpace`,
    url: `https://photospace-app.com/photos/${id}`,
    hashtags: ["photospace"],
  }

  return (
    <div>
      <Helmet>
        <title>PhotoSpace</title>
        <meta name="description" content="sample_app"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="PhotoSpace"/>
        <meta property="og:description" content="ウェブサイトの説明文"/>
        <meta property="og:image" content="https://photospace-app.com/ogp.jpg"/>
        <meta property="og:url" content={Tweet.url} />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="PhotoSpace"/>
        <meta name="twitter:description" content="ウェブサイトの説明文"/>
        <meta name="twitter:image" content="https://photospace-app.com/ogp.jpg"/>
      </Helmet>
      <section css={Styles.SectionStyle} className='mx-14 max-lg:mx-5'>
        <div className='mb-10'>
          <Image
            css={Styles.ImageStyle}
            radius="sm"
            src={photoUrl}
          />
          <h3 className='text-center font-bold text-xl max-lg:text-sm'>{photoData.title}</h3>
        </div>
        <div className='text-center'>
          <Grid gutter="sm" className='px-36 max-lg:px-0 max-lg:text-xs'>
            <Grid.Col span={2.5}>ユーザー名</Grid.Col>
            <Grid.Col span={windowWidth <= 1024 ? 4 : 2.5} >投稿日</Grid.Col>
            <Grid.Col span={2}></Grid.Col>
            <Grid.Col span={windowWidth <= 1024 ? 3 : 5 }></Grid.Col>

            <Grid.Col span={2.5}>{postUser.name}</Grid.Col>
            <Grid.Col span={windowWidth <= 1024 ? 4 : 2.5}>{postDate}</Grid.Col>
            <Grid.Col span={1} className='mx-auto'><TwitterIntentTweet {...Tweet}/></Grid.Col>

            { !(currentUid === postUser.uid) &&
              <Grid.Col span={1} css={Styles.LikeStyles} onClick={handleLikeToggle}>
                { liked ? <IconStarFilled size={windowWidth <= 1024 ? 20 : undefined}/> : <IconStar size={windowWidth <= 1024 ? 20 : undefined}/> }
              </Grid.Col>
            }

            <Grid.Col span={1}>
            { currentUid === postUser.uid &&
              <IconTrash css={Styles.TrashStyle} onClick={() => deletePhoto(photoData.id)} size={windowWidth <= 1024 ? 20 : undefined}/>
            }
            </Grid.Col>

            <Grid.Col span={windowWidth <= 1024 ? 2.5 : 4} className='pl-20 pb-5 pt-0 max-lg:pl-0'>
              <Link to='/'>
                <Button
                  disabled
                  variant="outline"
                  color="rgba(59, 59, 59, 1)"
                  size={windowWidth <= 1024 ? 'xs' : undefined}
                >
                添削依頼
                </Button>
              </Link>
            </Grid.Col>
          </Grid>
        </div>
      </section>
      <section className='mt-5 mx-5'>
        <div className='px-12 max-lg:text-sm  max-lg:px-7'>
          {photoData.description}
        </div>
      </section>
      <section className='mt-10 mx-5 max-lg:mx-0'>
        <Textarea
          className='px-12'
          disabled
          autosize
          minRows={5}
          size={windowWidth <= 1024 ? 'sm' : 'md'}
          label="コメント"
          placeholder="コメントを入力する"
        />
        <div className='text-right mr-12'>
          <Button
            className='mt-5 '
            disabled
            variant="outline"
            color="rgba(59, 59, 59, 1)"
            size={windowWidth <= 1024 ? 'xs' : undefined}
          >
          コメントを書き込む
          </Button>
        </div>
      </section>
      <section className='mt-10 mx-5 pb-2'>
        <h3 css={Styles.SectionTitleStyle} className='text-center mb-5 pb-2 max-lg:text-sm'>作品詳細</h3>
        <Grid gutter="sm" className='px-20 max-lg:px-4 max-lg:text-xs'>
            <Grid.Col span={6} className='font-bold'>撮影機材</Grid.Col>
            <Grid.Col span={6} className='font-bold'>写真カテゴリー</Grid.Col>
            <Grid.Col span={6} className='indent-4'>{photoData.camera_make}</Grid.Col>
            <Grid.Col span={6} className='indent-4'>{category?.name}</Grid.Col>
            <Grid.Col span={6} className='indent-6'>{photoData.camera}</Grid.Col>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6} className='indent-4'>{photoData.lens_make}</Grid.Col>
            <Grid.Col span={6} className='font-bold text-zinc-400'>撮影シーン</Grid.Col>
            <Grid.Col span={6} className='indent-6'>{photoData.lens}</Grid.Col>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6}></Grid.Col>
            <Grid.Col span={6} className='font-bold'>撮影地</Grid.Col>
            {Object.keys(photoData).length > 0 && photoData.gps_latitude && photoData.gps_longitude && (
              <Grid.Col span={12}>
                <Map photo={photoData} windowWidth={ windowWidth } />
              </Grid.Col>
            )}
        </Grid>
      </section>
      <section className='mt-10 mx-5 pb-20'>
        <h3 css={Styles.SectionTitleStyle} className='text-center mb-5 pb-2 max-lg:text-sm'>作品情報</h3>
        <Grid gutter="sm" className='px-20 max-lg:px-4 max-lg:text-xs'>
            <Grid.Col span={6} >ISO感度：{photoData.ISO_sensitivity}</Grid.Col>
            <Grid.Col span={6} >シャッタースピード：{photoData.shutter_speed}</Grid.Col>
            <Grid.Col span={6} >露光補正値：{photoData.exposure_compensation}EV</Grid.Col>
            <Grid.Col span={6} >絞り：F{photoData.aperture}</Grid.Col>
            <Grid.Col span={6} >焦点距離：{photoData.focal_length}</Grid.Col>
            <Grid.Col span={6}>ホワイトバランス：{photoData.white_balance}</Grid.Col>
            <Grid.Col span={6}>撮影モード：{photoData.shooting_mode}</Grid.Col>
            <Grid.Col span={6}>イメージサイズ：{photoData.image_size_width}&nbsp;X&nbsp;{photoData.image_size_height}</Grid.Col>
        </Grid>
      </section>
    </div>

  )
}

export default ShowPhoto
