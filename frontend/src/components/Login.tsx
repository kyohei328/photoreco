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

  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault();
  //   console.log(form.setFieldValue)
  //   const formData = new FormData();
  //   formData.append('user[name]', form.values.name);
  // //   formData.append('user[email]', form.values.email);
  // //   formData.append('user[password]', form.values.password);
  //   const email = form.values.email;
  //   const password = form.values.password;
  
  //   if (type === 'register' ){
  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then(async(result) => {
  //         const user = await result.user
  //         const token = await user.getIdToken(true)
  //         const config =  { 'Authorization': `Bearer ${token}` };

  //         axios.post("http://localhost:3000/api/v1/users", formData, { headers: config })
  //         .then(() => {
  //           console.log('サインアップ成功！');
  //           navigate('/');
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       });
  //   }else{
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((user) => {
  //         navigate('/');
  //         console.log(user);
  //         console.log('ログイン成功！');
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log('ログイン失敗！');
  //         console.log(errorCode);
  //         console.log(errorMessage);
  //         alert('ログインに失敗しました');
  //       });
  //   }
  // };

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

      await axios.post("http://localhost:3000/api/v1/users", formData, config);
      console.log('サインアップ成功！');
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('ログイン成功！');
    }

    // navigate('/');
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
        {type}
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={handleGoogleSignIn} radius="xl">Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

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
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button variant="outline" color="gray" type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
    </Container>
  );
}

export default Login


// import { auth } from '../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const SignUp = () => {
//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
//     const email = (event.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
//     const password = (event.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;
//     createUserWithEmailAndPassword(auth, email.value, password.value)
//       .then(async(result) => {
//         const user = await result.user
//         const token = await user.getIdToken(true)
//         // const config = { headers: { authorization: `Bearer ${token}` } };
//         // const headers = { 'Authorization': `Bearer ${token}` };
//         const config =  { 'Authorization': `Bearer ${token}` };

//         // axios.post("http://localhost:3000/api/v1/users", { headers })
//         // axios.post("http://localhost:3000/api/v1/users", {}, { headers: headers })
//         axios.post("http://localhost:3000/api/v1/users", {}, { headers: config })
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//     };

//   return (
//     <div>
//       <h1>ユーザ登録</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">メールアドレス</label>
//           <input id="email" name="email" type="email" placeholder="email" />
//         </div>
//         <div>
//           <label htmlFor="password">パスワード</label>
//           <input id="password" name="password" type="password" />
//         </div>
//         <div>
//           <button>登録</button>
//         </div>
//         <p></p>
//       </form>
//     </div>
//   );
// };

// export default SignUp;

