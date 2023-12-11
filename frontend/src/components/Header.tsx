import {Group, Button, Box, Avatar, Menu, Text, rem, Portal} from '@mantine/core';
import classes from '../assets/HeaderMegaMenu.module.css';
import { css } from '@emotion/react';
import { LoginIcon } from '../icons/LoginIcon';
import { Link, useLocation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { IconLogout, IconUpload, IconSettings } from '@tabler/icons-react';
import axios from 'axios'
import { useState, useEffect } from 'react'

const Styles = {
  LogoStyle: css ({
    fontSize: '28px',
    fontWeight: 'bold',
    fontFamily: 'Bodoni',
    fontStyle: 'oblique 15deg',
  }),
  HeaderStyle: css ({
    backgroundColor: '#F1F3F5',
  }),
  SelectedStyles: css({
    fontWeight: 'bold',
    textDecoration: 'underline',
  }),
  IconStyle: css ({
    cursor: 'pointer',
  }),
  LinkStyle: css ({
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 'bold',
    }
  }),
}

export function Header(props) {
  // const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  // const theme = useMantineTheme();

  // const links = mockdata.map((item) => (
  //   <UnstyledButton className={classes.subLink} key={item.title}>
  //     <Group wrap="nowrap" align="flex-start">
  //       <ThemeIcon size={34} variant="default" radius="md">
  //         <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
  //       </ThemeIcon>
  //       <div>
  //         <Text size="sm" fw={500}>
  //           {item.title}
  //         </Text>
  //         <Text size="xs" c="dimmed">
  //           {item.description}
  //         </Text>
  //       </div>
  //     </Group>
  //   </UnstyledButton>
  // ));

  const { logOut, user } = UserAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  console.log(props)

  useEffect(() => {
    const userStatus = async () => {
      try {
        // const { user } = await UserAuth();
        const token = await user.getIdToken();
        console.log(token)
        const config = { headers: { 'Authorization': `Bearer ${token}` } };
        // const resp = await axios.get('http://localhost:3000/api/v1/profile', config);
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, config);
        setUserProfile(resp.data)
        setLoading(false);
        console.log(resp.data)
      } catch (error) {
        console.error('Error fetching like status:', error);
        setLoading(false);
      }
    }
    userStatus();
  },[user]);

  if (loading) {
    return <div></div>
  }

  return (
    // <Box pb={120}>
    <Box pb={30}>
      <header className={classes.header} css={Styles.HeaderStyle}>
        <Group justify="space-between" h="100%">
          <Group>
            <a href='/' css={Styles.LogoStyle}>
              Photo Space
            </a>
            <a href="/photos" className={classes.link} css={location.pathname === '/photos' && Styles.SelectedStyles}>
              写真検索
            </a>
            <a href="/contest/top" className={classes.link} css={location.pathname === '/contest/top' && Styles.SelectedStyles}>
              コンテスト
            </a>
          </Group>

          <Group visibleFrom="sm" justify="flex-end" >
          {user ? (
            <div className='flex'>
            <Link to="/photos/new" className='mr-4'>
              <Button
                rightSection={<IconUpload size={18} />}
                variant="outline"
                color="rgba(59, 59, 59, 1)"
              >
              アップロード
              </Button>
            </Link>
            {/* <Avatar
              src="/assets/image/23295054.jpg"  // 画像のURLを指定
              alt="Image Alt Text"  // 画像の代替テキスト
              radius="50%"  // 円形にするための半径
            /> */}
              {/* <Button
                rightSection={<IconLogout size={18} />}
                variant="outline"
                onClick={logOut}
              >
                ログアウト
              </Button> */}
            <Menu shadow="md" width={200}  withArrow arrowPosition="center" transitionProps={{ transition: 'fade', duration: 300 }}>
              <Menu.Target>
                <Avatar
                  css={Styles.IconStyle}
                  src={userProfile.avatar_url}  // 画像のURLを指定
                  alt="Image Alt Text"  // 画像の代替テキスト
                  radius="50%"  // 円形にするための半径
                  size="md"
                  variant="light"
                  onClick={openMenu}
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Link to='/mypage' onClick={closeMenu}>
                  <Menu.Item css={Styles.LinkStyle} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    マイページ
                  </Menu.Item>
                </Link>
                <Menu.Divider />

                <Menu.Item
                  css={Styles.LinkStyle}
                  onClick={() => {
                    logOut();
                    closeMenu();
                  }}
                  // onClick={logOut}
                  color="red"
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                  ログアウト
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {menuVisible && (
              <Portal>
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)', // 半透明の黒色
                  }}
                  onClick={closeMenu}
                />
              </Portal>
            )}

            </div>
            ) : (
            <Link to="/login">
              <Button
                rightSection={<LoginIcon size={18} />}
                variant="outline"
                color="rgba(59, 59, 59, 1)"
              >
                ログイン
              </Button>
            </Link>
            )}
            
          </Group>

          {/* <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" /> */}
        </Group>
      </header>
    </Box>
  );
  
}