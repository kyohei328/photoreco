import { Image, Button, Textarea, Rating  } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { useForm } from '@mantine/form';


const RatingModal = (props) => {

  const Styles = {
    ImageStyle: css ({
      maxHeight: '30vh',
      objectFit: 'contain',
    }),
  };

  const { photo } = props;
  const { contest_id } = props;

  const { user } =  UserAuth() as { user: object };
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      rate: 0,
      description: '',
    },
  });

  const handleSubmit = async (values: any) => {

    const formData = new FormData();
      formData.append('vote[rate]',  values.rate);
      formData.append('vote[comment]',  values.comment);
      formData.append('vote[photo_id]',  photo.id);
      formData.append('vote[contest_id]',  contest_id.contestId);
  
    try {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        // const resp = await axios.post("http://localhost:3000/api/v1/votes", formData, config);
        const resp = await axios.post(`${import.meta.env.VITE_BASE_URL}/votes`, formData, config);
        console.log(resp)
        navigate('/')
      }catch (error) {
      console.log('エラー:', error);
      console.log('エラーコード:', (error as any).code);
      console.log('エラーメッセージ:', (error as any).message);
      // alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <div>
      <section>
        <div className='mb-10'>
          <Image
            css={Styles.ImageStyle}
            className='px-12 mb-5'
            radius="sm"
            src={photo.image_url}
          />
          <h3 className='text-center font-bold text-xl'>{photo.title}</h3>
        </div>
      </section>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className='px-12 pb-8'>
          <p className='py-5'>評価</p>
          {/* <Rating size="xl" value={value} onChange={setValue} /> */}
          <Rating size="xl" {...form.getInputProps('rate')}/>
        </div>
        <Textarea
          className='px-12'
          size="md"
          label="コメント"
          placeholder="コメントを入力する"
          {...form.getInputProps('comment')}
        />
        <div className='px-12 pt-5 text-right'>
          <Button
            type="submit"
            variant="outline"
            color="rgba(59, 59, 59, 1)"
            // rightSection={<IconUpload size={14} />}
          >
            投票する
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RatingModal
