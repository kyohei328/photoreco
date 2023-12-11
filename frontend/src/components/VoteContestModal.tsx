import { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { Button, Card, Image, Text } from '@mantine/core';
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import '../assets/EntryContestModal.css'
import RatingModal from "./RatingModal";

const VoteContestModal = (props) => {

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
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      minHeight: '40px',
      marginTop: '0',
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
      marginBottom: '1rem',
      borderBottom: 'solid 1px black',
    }),
    SelectStyles: css({
      cursor: 'pointer',
      '&:hover': {
        color: 'darkblue'
      }
    }),
    SelectedStyles: css({
      fontWeight: 'bold',
      textDecoration: 'underline',
    }),
  })

  const [images, setImages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { user } =  UserAuth();
  console.log(user)

  useEffect(() => {
    const getPostedPhotos = async () => {
    try {
    const token = await user.getIdToken(true);
    console.log(token)
    const config = { headers: { 'Authorization': `Bearer ${token}` }, params: {id: props.contestId} };
    // const resp = await axios.get('http://localhost:3000/api/v1/votes', config)
    const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/votes`, config)
      setImages((prevImages) => [...prevImages, ...resp.data.photos]);
      console.log(resp.data.photos);
    } catch(error) {
      console.error('Error fetching images:', error);
    }
  };
  getPostedPhotos();
  },[]);

  

  const handleImageClick = (clickedId) => {
    // クリックされた画像の ID を取得
    console.log('Clicked Image ID:', clickedId);

      // 選択された画像のデータを取得
    const selectedImageData = images.find(item => item.id === clickedId);

    // selectedPhotoを変数に格納するか、必要な処理を行う
    if (selectedImageData) {
      setSelectedImage(selectedImageData)
    } else {
      console.error('Photo not found for ID:', clickedId);
    }

    // 選択された画像の ID を更新
    setSelectedId(clickedId);
    console.log(clickedId)
  };

  const handleSubmit = async () => {
    try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const data = {
        contest_id: props.contest.id,
        photo_id: selectedId,
      };
      // await axios.post("http://localhost:3000/api/v1/contest_entries", data, config);
      await axios.post(`${import.meta.env.VITE_BASE_URL}/contest_entries`, data, config);
      navigate('/')
    } catch (error) {
      console.log('エラー:', error);
      console.log('エラーコード:', (error as any).code);
      console.log('エラーメッセージ:', (error as any).message);
      // alert('エラーが発生しました: ' + error.message);
    }
  };

  const imageCards = images.map((image) => (
    // <div key={image.id}>
      <Card
        // className="my-1 mx-1 w-13 h-10 max-h-15 max-w-15"
        styles={{
          root: {
            // flex: '1 0 auto',
            flex: '1 0 15rem',
            margin: '0.5rem',
            boxSizing: 'border-box',
            overflow: 'hidden',
            background: selectedId === image.id ? '#D9E5FF' : 'transparent',
            opacity: selectedId === image.id ? 0.7 : 1,
            cursor: 'pointer',
          },
        }}
        className="my-2 mx-2 "
        key={image.id}
        shadow="xl"
        padding="sm"
        component="a"
        // href="#"
        target="_blank"
        onClick={() => handleImageClick(image.id)}
      >
        <Card.Section>
          <Image
              styles={{
                root: {
                  width: '100%',
                  height: 'auto',
                },
              }}
            src={image.image_url}
            // h='20vw'
            // w='15rem'

            // h='auto'
            alt="No way!"
          />
        </Card.Section>

        <Text fw={500} size="lg" mt="md">
          {image.title}
        </Text>

        <Text mt="xs" c="dimmed" size="sm">
          {`登録日：${image.created_at}`}
        </Text>
      </Card>
    // </div>
  ))

  console.log(props)
  return (
    <div>
      <h2 css={Styles.TitleStyle}>投票</h2>
      <div css={Styles.SectionStyles}>
      </div>
      { selectedId ?(
        <RatingModal photo={selectedImage} contest_id={props}/>
      ):(
        <div>
        <p className="text-center">応募したい写真を選び  [選択した写真で応募する]  をクリックしてください</p>
        <div className="flex flex-wrap">
          {imageCards}
        </div>
        <div  className='text-right'>
          <Button className='mt-5 text-right justify-end'
            onClick={handleSubmit}
            variant="outline"
            color="rgba(59, 59, 59, 1)"
          >
            選択した写真で応募する
          </Button>
        </div>
      </div>
      )}
    </div>
  )
}

export default VoteContestModal
