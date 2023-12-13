import { UserAuth } from '../context/AuthContext';
import { Image, Button, Grid, Textarea  } from '@mantine/core';
import { IconTrash, IconStar,  IconShare3, IconStarFilled  } from '@tabler/icons-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Map from './Map'
import { TwitterIntentTweet } from "./Tweet.tsx";

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
    }),
    ImageStyle: css ({
      maxHeight: '50vh',
      objectFit: 'contain',
    }),
    LikeStyles: css ({
      cursor: 'pointer',
    }),
    TrashStyle: css ({
      cursor: 'pointer',
    })
  };

  const [photoData, setPhotoData] = useState({});
  const [photoUrl, setPhotoUrl] = useState({});
  const [postUser, setPostUser] = useState({});
  const [liked, setLiked] = useState(false);
  const [likedId, setLikedId] = useState();
  const [currentUid, setCurrentUid] = useState();

  const { id } = useParams();
  const { user } = UserAuth() as { user: object };
  const navigate = useNavigate();

  console.log(user)

    const fetchLikeStatus = async () => {
      try {
        const token = await user.getIdToken(true);
        console.log(token)
        const config = { headers: { 'Authorization': `Bearer ${token}` }, params: {photo_id: id} };
        // const resp = await axios.get(`http://localhost:3000/api/v1/photos/likes`, config);
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos/likes`, config);
        setLiked(resp.data.like_stauts);
        setLikedId(resp.data.like_id)
        console.log(resp.data)
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }

  useEffect (() => {
    // axios.get(`http://localhost:3000/api/v1/photos/${id}`)
    axios.get(`${import.meta.env.VITE_BASE_URL}/photos/${id}`)
    .then(resp => {
      setPhotoData(resp.data.photo)
      setPhotoUrl(resp.data.photo_url)
      setPostUser(resp.data.photo.user)
      setCurrentUid(user.uid)
      console.log(resp.data);
      console.log(user.uid)
    }).catch(error => {
      console.error('Error fetching images:', error);
    });
    fetchLikeStatus();
  },[id]);


  const handleLikeToggle = async () => {
    try {
      if (liked) {
        const token = await user.getIdToken(true);
        console.log(token)
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        // await axios.delete(`http://localhost:3000/api/v1/likes/${likedId}`, config);
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/likes/${likedId}`, config);
      } else {
        const token = await user.getIdToken(true);
        console.log(token)
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        // await axios.post(`http://localhost:3000/api/v1/likes`, {photo_id: id} ,config);
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
      console.log(token)
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      // await axios.delete(`http://localhost:3000/api/v1/photos/${id}`, config);
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/photos/${id}`, config);
      navigate('/photos')
    } catch (error) {
    console.error('Error toggling like:', error);
    }
  };

  const postDate = moment(photoData.created_at).format('YYYY年MM月D日');

  const Tweet = {
    text: "写真を投稿しました。",
    // url: `http://localhost:3001/photos/${id}`,
    url: `https://photospace-app.com/photos/${id}`,
    hashtags: ["photo"],
    in_reply_to: "123456789",
  }

  return (
    <div>
      <section css={Styles.SectionStyle} className='mx-12'>
        <div className='mb-10'>
          <Image
            css={Styles.ImageStyle}
            className='px-12 mb-5'
            radius="sm"
            src={photoUrl}
          />
          <h3 className='text-center font-bold text-xl'>{photoData.title}</h3>
        </div>
        <div className='text-center'>
          <Grid gutter="sm" className='px-36'>
            <Grid.Col span={2.5}>ユーザー名</Grid.Col>
            <Grid.Col span={2.5}>投稿日</Grid.Col>
            <Grid.Col span={2}></Grid.Col>
            <Grid.Col span={5}></Grid.Col>

            <Grid.Col span={2.5}>{postUser.name}</Grid.Col>
            <Grid.Col span={2.5}>{postDate}</Grid.Col>
            {/* <Grid.Col span={1} className='mx-auto'><IconShare3 /></Grid.Col> */}
            <Grid.Col span={1} className='mx-auto'><TwitterIntentTweet {...Tweet}/></Grid.Col>

            { !(currentUid === postUser.uid) &&
              <Grid.Col span={1} css={Styles.LikeStyles} onClick={handleLikeToggle}>
                { liked ? <IconStarFilled /> : <IconStar /> }
              </Grid.Col>
            }

            <Grid.Col span={1}>
            { currentUid === postUser.uid &&
              <IconTrash css={Styles.TrashStyle} onClick={() => deletePhoto(photoData.id)}/>
            }
            </Grid.Col>

            <Grid.Col span={4}  className='pl-20 pb-5 pt-0'>
              <Link to='/'>
                <Button
                  disabled
                  variant="outline"
                  color="rgba(59, 59, 59, 1)"
                >
                添削依頼
                </Button>
              </Link>
            </Grid.Col>
          </Grid>
        </div>
      </section>
      <section className='mt-5 mx-5'>
        <div className='px-12'>
          {photoData.description}
        </div>
      </section>
      <section className='mt-10 mx-5'>
        <Textarea
          className='px-12'
          disabled
          size="md"
          label="コメント"
          placeholder="コメントを入力する"
        />
        <div className='text-right mr-12'>
          <Button
            className='mt-5 '
            disabled
            variant="outline"
            color="rgba(59, 59, 59, 1)"
          >
          コメントを書き込む
          </Button>
        </div>
      </section>
      <section className='mt-10 mx-5 pb-2'>
        <h3 css={Styles.SectionTitleStyle} className='text-center mb-5 pb-2'>作品詳細</h3>
        <Grid gutter="sm" className='px-20'>
            <Grid.Col span={6} className='font-bold'>撮影機材</Grid.Col>
            <Grid.Col span={6} className='font-bold text-zinc-400'>写真カテゴリー</Grid.Col>
            <Grid.Col span={6} className='indent-4'>{photoData.camera_make}</Grid.Col>
            <Grid.Col span={6} ></Grid.Col>
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
            {/* <Grid.Col span={12} className=''><Map photo={photoData} /></Grid.Col> */}
            {/* {Object.keys(photoData).length > 0 && (
              <Grid.Col span={12} className=''><Map photo={photoData} /></Grid.Col>
            )} */}
            {Object.keys(photoData).length > 0 && photoData.gps_latitude && photoData.gps_longitude && (
              <Grid.Col span={12} className=''>
                <Map photo={photoData} />
              </Grid.Col>
            )}
        </Grid>
      </section>
      <section className='mt-10 mx-5 pb-20'>
        <h3 css={Styles.SectionTitleStyle} className='text-center mb-5 pb-2'>作品情報</h3>
        <Grid gutter="sm" className='px-20'>
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
