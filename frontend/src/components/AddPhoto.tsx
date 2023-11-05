
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { FileInput } from '@mantine/core';
import '../assets/AddPhoto.css'
import { Input } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Select } from '@mantine/core';
import { TagsInput } from '@mantine/core';
import { Group,Button } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';


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

  const initialValues = { title:"", description:"", photo_img: null };
  const [formValues, setFormValues] = useState(initialValues);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // }

  const navigate = useNavigate();

  const { user, getIdToken } = UserAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
      formData.append('photo[title]', formValues.title);
      formData.append('photo[description]', formValues.description);
      formData.append('photo[photo_img]', e.target.photo_img.files[0]);


    // const { user, getIdToken } = UserAuth();
    // const { user } = UserAuth();
    const token = getIdToken();
    console.log(token)
    const config = { headers: { 'Authorization': `Bearer ${token}` } };

    axios.post('http://localhost:3000/api/v1/photos', formData, config )
    .then((resp) => {
        console.log(resp)
        navigate('/');
        // console.log(resp.data.name);
    })
    .catch((error) => {
        console.log(error.response.data);
        console.log(error);
    });
  };

  const handleImageSelect = (e) => {
    const selectedImage = e.target.files[0];
    // console.log(e.target.files[0])
    if (selectedImage) {
      setFormValues({ ...formValues, photo_img: selectedImage });
    }
  };


  return (
    <div css={Styles.ContainerStyle}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 css={Styles.LogoStyle}>写真をアップロードする</h1>
        <p css={Styles.NoticeStyle}>※ 著作権等の知的財産権や肖像権の侵害にご注意ください</p>
        <div>
          <FileInput
            css={Styles.FormStyle}
            label="作品写真"
            description="※アップロードできる１枚あたりの容量 [ ○○MB以下 ]"
            withAsterisk
            size="md"
            radius="md"
            placeholder="写真を選択する"
            name="photo_img"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            onChange={handleImageSelect}
          />
        </div>
        <div css={Styles.InputBoxStyle}>
        <Input.Wrapper label="作品名" withAsterisk description="" error="" size="md">
          <Input />
        </Input.Wrapper>
        </div>
        <div>
          <Textarea
            size="md"
            label="作品説明"
          />
        </div>
        <div css={Styles.InputBoxStyle}>
          <p>カメラ</p>
          <p css={Styles.CommentStyles} className='indent-3' >この項目は写真選択後に表示されます。</p>
        </div>
        <div css={Styles.InputBoxStyle}>
          <p>レンズ</p>
          <p css={Styles.CommentStyles} className='indent-3' >この項目は写真選択後に表示されます。</p>
        </div>
        <div css={Styles.InputBoxStyle}>
        <Select
          label="カテゴリー"
          placeholder="カテゴリー"
          data={['風景', '人物', '動物', '植物']}
        />
        </div>
        <div css={Styles.InputBoxStyle}>
        <TagsInput
          label="撮影シーン"
          placeholder="設定したいワード(例：夜景、iphoneで撮影)"
          defaultValue={['夜景']}
          clearable
        />
        </div>
        <div>
          <p>撮影地</p>
          <p css={Styles.CommentStyles} className='indent-3' >この項目は写真選択後に表示されます。</p>
        </div>
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
