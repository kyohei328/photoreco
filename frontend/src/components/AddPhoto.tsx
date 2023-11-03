
// import { useState } from 'react'
// import axios from 'axios'
// import { Form, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { FileInput } from '@mantine/core';

const AddPhoto = () => {
  // const initialValues = { title:"", description:"", photo_img: null };
  // const [formValues, setFormValues] = useState(initialValues);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // }

  // const navigate = useNavigate();

  // const config = { headers: { 'Authorization': `Bearer ${token}` } };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('photo[title]', formValues.title);
  //   formData.append('photo[description]', formValues.description);
  //   formData.append('photo[image]', e.target.image.files[0]);

  //   axios.post('http://localhost:3000/api/v1/photos', formData, config )
  //   .then((resp) => {
  //       console.log(resp)
  //       navigate('/photo/share');
  //       // console.log(resp.data.name);
  //   })
  //   .catch((error) => {
  //       console.log(error.response.data);
  //       console.log(error);
  //   });
  // };

  // const handleImageSelect = (e) => {
  //   const selectedImage = e.target.files[0];
  //   // console.log(e.target.files[0])
  //   if (selectedImage) {
  //     setFormValues({ ...formValues, image: selectedImage });
  //   }
  // };


  const Styles = {
    LogoStyle: css ({
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      minHeight: '40px',
    }),
    ContainerStyle: css ({
      maxWidth: '1400px',
      width: '90%',
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    NoticeStyle: css ({
      fontSize: '1em',
      fontWeight: 'bold',
      fontFamily: 'Bodoni',
      color: 'red',
      textAlign: 'center',
      minHeight: '40px',
    }),
  }


  return (
    <div css={Styles.ContainerStyle}>
      <form>
        <h1 css={Styles.LogoStyle}>写真をアップロードする</h1>
        <span css={Styles.NoticeStyle}>※ 著作権等の知的財産権や肖像権の侵害にご注意ください</span>
        <div>
          <label>作品写真</label>
          <p>※アップロードできる１枚あたりの容量 [ ○○MB以下 ]</p>
          <div>
          <FileInput
            className='prose'
            variant="filled"
            size="md"
            radius="md"
            placeholder="写真を選択する"
          />
          </div>
        </div>

      </form>
    </div>
  )}

export default AddPhoto
