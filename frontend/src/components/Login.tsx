import { FormEvent, useEffect } from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'



const Login = (props: PaperProps) => {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const { googleSignIn, user, logOut } = UserAuth();
  const navigate = useNavigate();


  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      // await googleSignIn();
      // await waitForPopupClose();
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      // current_userがtrueの場合、ページ遷移を行う
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('user[name]', form.values.name);

  const email = form.values.email;
  const password = form.values.password;

  try {
    if (type === 'register') {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const token = await user.user.getIdToken(true);

      const config = { headers: { 'Authorization': `Bearer ${token}` } };

      await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, formData, config);
      console.log('サインアップ成功！');
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('ログイン成功！');
    }

    navigate('/');
    } catch (error) {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <Container size={520} my={40}>
    <Paper radius="md" p="xl" withBorder {...props} >
      <Text size="lg" fw={500}>
        {/* {type} */}
        {type === 'register' ? '新規登録' : 'ログイン'}
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={handleGoogleSignIn} radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="または" labelPosition="center" my="lg" />

      {/* <form onSubmit={form.onSubmit(() => {})}> */}
      <form onSubmit={handleSubmit}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            // <Checkbox
            //   label="利用規約に同意する"
            //   checked={form.values.terms}
            //   onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            // />
            <Text size="xs">サインアップすることで、利用規約とプライバシーポリシーに同意したことになります。</Text>
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'すでにアカウントをお持ちですか？ ログイン'
              : "アカウントをお持ちでないですか？ 登録する"}
          </Anchor>
          <Button variant="outline" color="gray" type="submit" radius="xl">
            {/* {upperFirst(type)} */}
            {type === 'register' ? '新規登録' : 'ログイン'}
          </Button>
        </Group>
      </form>
    </Paper>
    </Container>
  );
}

export default Login

