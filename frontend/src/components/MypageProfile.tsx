import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { TextInput, Grid, Button, Textarea } from '@mantine/core';
import { UserAuth } from '../context/AuthContext';
import { useForm } from '@mantine/form';
import { sendPasswordResetEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { maxScreen } from '../mediaQueries';
import useWindowSize from '../useWindowSize';

const MypageProfile = () => {

  const Styles = {
    TableStyle: css ({
      borderBottom: '1px solid',
      borderColor: '#ADB5BD',
      padding: '2rem 5rem',
      margin: '0 6rem',
      [maxScreen('lg')]:{
        padding: '2rem 0',
        margin: '0 1rem',
      }
    }),
  };

  const { user } = UserAuth();
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [ windowWidth, windowHeight ] = useWindowSize();

  const form = useForm({
    initialValues: {
      name: '',
      self_introduction: '',
    },
  });

  const formReset = () =>{
    form.reset()
  }

  useEffect(() => {
    const userStatus = async () => {
      try {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, config);
        setUserProfile(resp.data.user)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching like status:', error);
        setLoading(false);
      }
    }
    userStatus();
  },[]);

  const handleSubmit = async (values: any)=> {

    const formData = new FormData();
      formData.append('user[name]', values.name || userProfile.name);
      formData.append('user[self_introduction]', values.self_introduction || userProfile.self_introduction);

    try {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        const resp = await axios.patch(`${import.meta.env.VITE_BASE_URL}/profile`, formData, config);
        setUserProfile(resp.data.user)
        formReset()
      }catch (error) {
        console.log('エラー:', error);
        console.log('エラーコード:', (error as any).code);
        console.log('エラーメッセージ:', (error as any).message);
        alert('エラーが発生しました: ' + error.message);
    }
  };

  

  const submitPasswordResetEmail = async () => {
    const actionCodeSettings = {
      // パスワード再設定後のリダイレクト URL
      url: 'https://photospace-backend-7008f4941f36.herokuapp.com/login',
      handleCodeInApp: false,
    }
    sendPasswordResetEmail(auth, userProfile.email, actionCodeSettings)
    .then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const submitEmailChange = () => {
    verifyBeforeUpdateEmail(user, email)
    .then(() => {

    }).catch((error) => {

    });
  }


  if (loading) {
    return <div></div>
  }

  return (
    <div>
      <h3 className='text-center pt-4 pb-12'>{userProfile.name}さんのプロフィール</h3>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={windowWidth <= 1024 ? 4 : 6}>ユーザー名</Grid.Col>
          <Grid.Col span={windowWidth <= 1024 ? 8 : 6}>
            <TextInput
              placeholder={userProfile.name}
              {...form.getInputProps('name')}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={windowWidth <= 1024 ? 4 : 6}>自己紹介</Grid.Col>
          <Grid.Col span={windowWidth <= 1024 ? 8 : 6}>
            <Textarea
              placeholder={userProfile.self_introduction ? userProfile.self_introduction : '自己紹介文'}
              {...form.getInputProps('self_introduction')}
            />
          </Grid.Col>
        </Grid>

        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={windowWidth <= 1024 ? 4 : 6}>メールアドレス</Grid.Col>
          <Grid.Col span={windowWidth <= 1024 ? 8 : 3}>
            <TextInput
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid.Col>
          { windowWidth <= 1024 && <Grid.Col span={7.7}></Grid.Col>}
          <Grid.Col span={3} className='text-right'>
            <Button
              variant="outline"
              color="rgba(59, 59, 59, 1)"
              size={windowWidth <= 1024 ? 'xs' : ''}
              onClick={submitEmailChange}
            >
              変更用メールを送信
            </Button>
          </Grid.Col>
        </Grid>

        <Grid gutter="sm" css={Styles.TableStyle}>
          <Grid.Col span={windowWidth <= 1024 ? 4 : 6}>パスワード</Grid.Col>
          <Grid.Col span={windowWidth <= 1024 ? 8 : 3}>＊＊＊＊＊＊</Grid.Col>
          { windowWidth <= 1024 && <Grid.Col span={7.7}></Grid.Col>}
          <Grid.Col span={3} className='text-right'>
              <Button
                variant="outline"
                color="rgba(59, 59, 59, 1)"
                size={windowWidth <= 1024 ? 'xs' : ''}
                onClick={submitPasswordResetEmail}
              >
              変更用メールを送信
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