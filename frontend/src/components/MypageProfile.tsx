import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { TextInput, Grid, Button, Textarea } from '@mantine/core';
import { UserAuth } from '../context/AuthContext';
import { useForm } from '@mantine/form';
import { getAuth, sendPasswordResetEmail, sendEmailVerification, updateEmail,EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth";



const MypageProfile = () => {

  const Styles = {
    TableStyle: css ({
      borderBottom: '1px solid',
      borderColor: '#ADB5BD',
      padding: '2rem 5rem',
      margin: '0 6rem',
    }),
  };

  const { user } = UserAuth();
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  // const form = useForm({
  //   initialValues: {
  //     name: userProfile.name,
  //     self_introduction: userProfile.self_introduction,
  //   },
  // });

  const form = useForm({
    initialValues: {
      name: '',
      self_introduction: '',
    },
  });

  const formReset = () =>{
    form.reset()
  }

  const auth = getAuth();

  useEffect(() => {
    const userStatus = async () => {
      try {
        const token = await user.getIdToken(true);
        console.log(token)
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        // const resp = await axios.get('http://localhost:3000/api/v1/profile', config);
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, config);
        setUserProfile(resp.data.user)
        setLoading(false);
        console.log(resp.data)
      } catch (error) {
        console.error('Error fetching like status:', error);
        setLoading(false);
      }
    }
    userStatus();
  },[]);


  const handleSubmit = async (values: any)=> {

    const formData = new FormData();
      formData.append('user[name]',  values.name);
      formData.append('user[self_introduction]',  values.self_introduction);

    try {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        // const resp = await axios.patch("http://localhost:3000/api/v1/profile", formData, config);
        const resp = await axios.patch(`${import.meta.env.VITE_BASE_URL}/profile`, formData, config);
        console.log(resp.data)
        setUserProfile(resp.data.user)
        formReset()
      }catch (error) {
        console.log('エラー:', error);
        console.log('エラーコード:', (error as any).code);
        console.log('エラーメッセージ:', (error as any).message);
        // alert('エラーが発生しました: ' + error.message);
    }
  };

  

  const submitPasswordResetEmail = async () => {
    const actionCodeSettings = {
      // パスワード再設定後のリダイレクト URL
      // url: 'http://localhost:3001/login',
      url: 'https://photospace-backend-7008f4941f36.herokuapp.com/login',
      handleCodeInApp: false,
    }
    sendPasswordResetEmail(auth, userProfile.email, actionCodeSettings)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  const submitEmailChange = () => {
    verifyBeforeUpdateEmail(user, email)
    // verifyBeforeUpdateEmail(user, "zwei328@gmail.com")
    .then(() => {
      // Email updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  console.log(email)


  if (loading) {
    return <div></div>
  }

  return (
    <div>
      <h3 className='text-center pt-4 pb-12'>{userProfile.name}さんのプロフィール</h3>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={6}>ユーザー名</Grid.Col>
          <Grid.Col span={6} >
            <TextInput
              placeholder={userProfile.name}
              {...form.getInputProps('name')}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={6}>自己紹介</Grid.Col>
          <Grid.Col span={6}>
            <Textarea
              placeholder={userProfile.nself_introduction ? userProfile.self_introduction : '自己紹介文'}
              {...form.getInputProps('self_introduction')}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={6}>メールアドレス</Grid.Col>
          <Grid.Col span={3}>
            <TextInput
              placeholder={userProfile.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid.Col>
          <Grid.Col span={3} className='text-right'>
            <Button
              variant="outline"
              color="rgba(59, 59, 59, 1)"
              onClick={submitEmailChange}
            >
              変更
            </Button>
          </Grid.Col>
        </Grid>

        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={6}>パスワード</Grid.Col>
          <Grid.Col span={3}>＊＊＊＊＊＊</Grid.Col>
          <Grid.Col span={3} className='text-right'>
              <Button
                variant="outline"
                color="rgba(59, 59, 59, 1)"
                onClick={submitPasswordResetEmail}
              >
              変更
              </Button>
          </Grid.Col>
        </Grid>
        <div className='mt-12 text-center pb-10'>
          <Button
            type="submit"
            variant="outline"
            color="rgba(59, 59, 59, 1)"
          >
            更新する
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MypageProfile