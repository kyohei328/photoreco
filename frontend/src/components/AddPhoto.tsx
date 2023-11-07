
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { FileInput, TextInput, Textarea, Select, TagsInput, Group, Button } from '@mantine/core';
import '../assets/AddPhoto.css'
import { IconUpload } from '@tabler/icons-react';
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  title: Yup.string().required('作品名は必須です'),
  photo_img: Yup.string().required('作品名は必須です'),

});

const AddPhoto = () => {
  const Styles = {
    LogoStyle: css ({
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      minHeight: '40px',
      marginBottom: '30px',
    }),
    ContainerStyle: css ({
      maxWidth: '620px',
      width: '90%',
      // height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    NoticeStyle: css ({
      fontSize: '1em',
      fontWeight: 'bold',
      fontFamily: 'Bodoni',
      color: 'red',
      minHeight: '40px',
      marginLeft: '0px',
    }),
    FormStyle: css ({
      fontWeight: 'bold',
    }),
    InputBoxStyle: css ({
      margin: '20px 0',
    }),
    CommentStyles: css({
      fontSize: '14px',
      color: 'gray',
    }),
    ButtonStyles: css({
      margin: '30px 100px',
    }),
  }


  // const initialValues = { title:"", description:"", photo_img: null };
  // const [formValues, setFormValues] = useState(initialValues);
  const { googleSignIn, user, logOut } = UserAuth();
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // }

  // const handleImageSelect = (e) => {
  //   const selectedImage = e.target.files[0];
    
  //   if (selectedImage) {
  //     setFormValues({ ...formValues, photo_img: selectedImage });
  //   }
  // };

  const form = useForm({
    validate: yupResolver(validationSchema),
    initialValues: {
      title: '',
      description: '',
    },
  });

  // const handleSubmit = async (e) => {
  const handleSubmit = async (values) => {
    // e.preventDefault();
    const formData = new FormData();
      // formData.append('photo[title]',  formValues.title);
      // formData.append('photo[description]',  formValues.description);
      // formData.append('photo[photo_img]', e.target.photo_img.files[0]);
      // console.log(e.target.photo_img.files[0])
      formData.append('photo[title]',  values.title);
      formData.append('photo[description]',  values.description);
      formData.append('photo[photo_img]', values.photo_img);
      console.log(values.photo_img)
  
    try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` } };

      await axios.post("http://localhost:3000/api/v1/photos", formData, config);
      navigate('/')
    } catch (error) {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      alert('エラーが発生しました: ' + error.message);
    }
  };


  return (
    <div css={Styles.ContainerStyle}>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <h1 css={Styles.LogoStyle}>写真をアップロードする</h1>
        <p css={Styles.NoticeStyle}>※ 著作権等の知的財産権や肖像権の侵害にご注意ください</p>
        <div>
          <FileInput
            label="作品写真"
            description="※アップロードできる１枚あたりの容量 [ ○○MB以下 ]"
            withAsterisk
            size="md"
            radius="sm"
            {...form.getInputProps('photo_img')}
            placeholder="写真を選択する"
            accept="image/*,.png,.jpg,.jpeg,.gif"
          />
        </div>
        <div css={Styles.InputBoxStyle}>
          <TextInput
            withAsterisk
            label="作品名"
            {...form.getInputProps('title')}
          />
        </div>
        <div>
          <Textarea
            size="md"
            label="作品説明"
            name="description"
            // onChange={handleChange}
          />
        </div>
    {/* -----別にタスクで追加-------------- */}
        {/* <div css={Styles.InputBoxStyle}>
          <p>カメラ</p>
          <p css={Styles.CommentStyles} className='indent-3' >この項目は写真選択後に表示されます。</p>
        </div>
        <div css={Styles.InputBoxStyle}>
          <p>レンズ</p>
          <p css={Styles.CommentStyles} className='indent-3' >この項目は写真選択後に表示されます。</p>
        </div> */}
    {/* ------本リリース時に追加------------------- */}
        {/* <div css={Styles.InputBoxStyle}>
        <Select
          label="カテゴリー"
          placeholder="カテゴリー"
          data={['風景', '人物', '動物', '植物']}
        />
        </div> */}
    {/* ------本リリース時に追加------------------- */}
        {/* <div css={Styles.InputBoxStyle}>
        <TagsInput
          label="撮影シーン"
          placeholder="設定したいワード(例：夜景、iphoneで撮影)"
          defaultValue={['夜景']}
          clearable
        />
        </div> */}
        {/* <div>
          <p>撮影地</p>
          <p css={Styles.CommentStyles} className='indent-3' >この項目は写真選択後に表示されます。</p>
        </div> */}
    {/* -----別にタスクで追加-------------- */}
        <div css={Styles.ButtonStyles}>
          <Group justify="space-between">
            <Link to='/'>
              <Button
                variant="outline"
                color="rgba(59, 59, 59, 1)"
              >
              キャンセルする
              </Button>
            </Link>
            <Button
              type="submit"
              variant="outline"
              color="rgba(59, 59, 59, 1)"
              rightSection={<IconUpload size={14} />}
            >
              アップロードする
            </Button>
          </Group>
        </div>
      </form>
    </div>
  )}

export default AddPhoto
