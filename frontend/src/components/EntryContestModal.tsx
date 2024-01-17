import { useState, useEffect } from "react";
import axios from "axios";
import { css } from '@emotion/react'
import '../assets/EntryContestModal.css'
import { Button, Card, Image, Text } from '@mantine/core';
import { UserAuth } from "../context/AuthContext";
import AddPhoto from "./AddPhoto";

const EntryContestModal = (props: any) => {

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

  const [choice, setChoice] = useState('posted_photos');
  const [images, setImages] = useState([]);

  const { user } =  UserAuth();

  const clickChoice = (choice: any) => {
    setChoice(choice);
  };


  useEffect(() => {
    const getPostedPhotos = async () => {
    try {
    const token = await user.getIdToken(true);
    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/contest_entries`, config)
      setImages((prevImages) => [...prevImages, ...resp.data.photos]);
    } catch(error) {
      console.error('Error fetching images:', error);
    }
  };

  getPostedPhotos();
  },[]);

  const [selectedId, setSelectedId] = useState(null);

  const handleImageClick = (clickedId) => {
    // クリックされた画像の ID を取得

    // 選択された画像の ID を更新
    setSelectedId(clickedId);
  };

  const handleSubmit = async () => {
    try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const data = {
        contest_id: props.contest.id,
        photo_id: selectedId,
      };
      await axios.post(`${import.meta.env.VITE_BASE_URL}/contest_entries`, data, config);
      navigate('/')
    } catch (error) {
      console.log('エラー:', error);
      console.log('エラーコード:', (error as any).code);
      console.log('エラーメッセージ:', (error as any).message);
      alert('エラーが発生しました: ' + error.message);
    }
  };



  const imageCards = images.map((image) => (
      <Card
        styles={{
          root: {
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
  ))

  return (
    <div>
      <h2 css={Styles.TitleStyle}>{props.contest.title}</h2>
      <div css={Styles.SectionStyles}>
        <div className='flex justify-around mb-3'>
          <p css={[Styles.SelectStyles, choice === 'posted_photos' && Styles.SelectedStyles]}
            onClick={() => {
              clickChoice('posted_photos');
          }}
          >
            投稿済みの写真から応募する
          </p>
          <p css={[Styles.SelectStyles, choice === 'add_photo' && Styles.SelectedStyles]}
            onClick={() => {
              clickChoice('add_photo');
            }}
          >
            応募する写真を投稿する
          </p>
        </div>
      </div>

      { choice === 'posted_photos' ?(
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
      ):(
        <AddPhoto contest={props.contest}/>
      )}
    </div>
  )
}

export default EntryContestModal
