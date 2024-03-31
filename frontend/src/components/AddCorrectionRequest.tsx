import axios from 'axios'
import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams, useLocation  } from 'react-router-dom'
import { css } from '@emotion/react'
import { FileInput, TextInput, Textarea, Group, Button, Select, Avatar, Flex, Text, rem} from '@mantine/core';
import { UserAuth } from '../context/AuthContext';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useCategory } from '../context/Category';
import { maxScreen } from '../mediaQueries';
import { useRef } from 'react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from '../assets/DropzoneButton.module.css';

const AddCorrectionRequest = (props) => {

  const Styles = {
    BoxStyle: css ({
      backgroundColor: 'rgb(243 244 246)',
      margin: '2rem 3rem',
      padding: '2rem 2rem',
      borderRadius: '5px',
      display: 'flex'
    }),
    DropZoneStyle: css ({
      display: 'flex',
      marginLeft: '2rem',
      padding: '1rem',
    })
  }

  const openRef = useRef<() => void>(null);
  const { id } = useParams();
  const { user } = UserAuth();

  const [ userProfile, setUserProfile ] = useState();
  const [loading, setLoading] = useState(true);
  const [ userIcon, setUserIcon ] = useState();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const user_id = searchParams.get('user_id');

  const form = useForm({
      initialValues: {
        title: '',
        description: '',
      },
  });

  const handleSubmit = async (values: any) => {

    const formData = new FormData();
      formData.append('photo[title]',  values.title);
      formData.append('photo[description]',  values.description);
      formData.append('photo[photo_img]', values.photo_img)
    try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const resp = await axios.post(`${import.meta.env.VITE_BASE_URL}/photos`, formData, config)

      navigate('/')
      }catch (error) {
      console.log('エラー:', error);
      console.log('エラーコード:', (error as any).code);
      console.log('エラーメッセージ:', (error as any).message);
      alert('エラーが発生しました: ' + error.message);
      if (error.response) {
        // サーバーからのレスポンスがある場合
        const errorMessage = error.response.data.errors[0]; // エラーメッセージの取得
        alert(errorMessage); // アラートでメッセージを表示
      } else {
        // サーバーからのレスポンスがない場合
        alert('エラーが発生しました');
      }
    }
  };

  // useEffect (() => {
  //   const userInfo = async () => {
  //     try {
  //       const token = await user.getIdToken(true);
  //       const config = { headers: { 'Authorization': `Bearer ${token}` } };
  //       const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${id}`, config);
  //       setUserProfile(resp.data.user)
  //       console.log(resp.data)
  //     } catch (error) {
  //       console.error('Error fetching like status:', error);
  //     }
  //   }
  //   userInfo();
  // },[id]);

  useEffect (() => {
    const userInfo = async () => {
      try {
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${user_id}`);
        setUserProfile(resp.data.user)
        setUserIcon(resp.data.avatar_url)
        setLoading(false);
        console.log(resp.data)
      } catch (error) {
        console.error('Error fetching like status:', error);
        setLoading(false);
      }
    }
    userInfo();
  },[id]);

  if (loading) {
    return <div></div>
  }

  return (
    <div>
      <section>
        <div css={Styles.BoxStyle}>
          <Avatar
            src={userIcon}
            size="xl"
            variant="light"
            color="blue"
            className='ml-0 mr-5'
          />
          <Flex
            mih={50}
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="column"
            wrap="wrap"
          >
            <div>{userProfile.name}</div>
            <div>{userProfile.self_introduction}</div>
            <div style={{ textDecoration: 'underline', cursor: 'pointer' }} className='text-sm'>プロフィールへ</div>
          </Flex>
        </div>
      </section>

      <section className=''>
        <form onSubmit={form.onSubmit(handleSubmit)} className='flex' >
          <div className={classes.wrapper} css={Styles.DropZoneStyle}>
            <Dropzone
              openRef={openRef}
              onDrop={() => {}}
              className={`${classes.dropzone} px-4 hover:bg-gray-100 rounded-md border-dashed border-2`}
              radius="md"
              accept={[MIME_TYPES.jpeg]}
              maxSize={5 * 1024 ** 2}
              {...form.getInputProps('photo_img')}
            >
              <div style={{ cursor: 'pointer' }} className='px-4 hover:bg-gray-100'>
                <Group justify="center">
                  <Dropzone.Accept>
                    <IconDownload
                      style={{ width: rem(50), height: rem(50) }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(50), height: rem(50) }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                  </Dropzone.Idle>
                </Group>

                <Text ta="center" fw={700} fz="lg" mt="xl">
                  <Dropzone.Accept>ファイルをこちらにドロップしてください</Dropzone.Accept>
                  <Dropzone.Reject>jpegのみアップロード可能です<br />40MB以下のファイルがアップロード可能です</Dropzone.Reject>
                  <Dropzone.Idle>添削を依頼する画像をドラッグするか<br />クリックしてファイルを選択してください</Dropzone.Idle>
                </Text>
              </div>
            </Dropzone>
          </div>
          <div className='ml-8 w-8/12'>
            <TextInput
              label="タイトル"
              placeholder="依頼タイトル"
              className='mt-2'
              {...form.getInputProps('title')}
            />
            <Textarea
              label="依頼内容"
              placeholder="依頼するにあたってなるだけわかりやすいく補足情報を入力してください。"
              className='mt-4'
              {...form.getInputProps('description')}
            />
            <div className='mt-8 text-right'>
              <Button
                type="submit"
                variant="outline"
                color="rgba(59, 59, 59, 1)"
                className='bg-transparent hover:bg-gray-400 text-gray-600 hover:text-white border border-gray-400 hover:border-transparent rounded
                shadow-sm shadow-gray-400 transition-all duration-100 active:translate-y-1 active:shadow-none'
              >
                添削を依頼する
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddCorrectionRequest
