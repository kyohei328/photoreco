import {Group, Button, Box, Avatar, Menu, rem, Portal} from '@mantine/core';
import classes from '../assets/HeaderMegaMenu.module.css';
import { css } from '@emotion/react';
import { LoginIcon } from '../icons/LoginIcon';
import { Link, useLocation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import { IconLogout, IconUpload, IconSettings } from '@tabler/icons-react';
import axios from 'axios'
import { useState, useEffect } from 'react'

const Styles = {
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


  useEffect(() => {
    const userStatus = async () => {
      try {
        if (user) {
          const token = await user.getIdToken();
          const config = { headers: { 'Authorization': `Bearer ${token}` } };
          const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, config);
          setUserProfile(resp.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching like status:', error);
        setLoading(false);
      }
    }
    userStatus();
  }, [user]);

  if (loading) {
    return <div></div>
  }

  return (
    // <Box pb={120}>
    <Box pb={30}>
      <header className={`${classes.header} bg-gray-100`}>
        <Group justify="space-between" h="100%" grow>
          <div className='h-5/6 hover:opacity-75 transition-all duration-300'>
            <a href='/'>
              <img src="/Top.png" alt="" className='object-cover h-full'/>
            </a>
          </div>
          <Group>
            <div className='mx-auto'>
              <a href="/" className={`py-1.5 px-4 mx-4 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${location.pathname === '/' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}>
                HOME
              </a>
              <a href="/photos" className={`py-1.5 px-4 mx-4 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${location.pathname === '/photos' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}>
                写真検索
              </a>
              <a href="/contest/top" className={`py-1.5 px-4 mx-4 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-10 after:w-4/5 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${location.pathname === '/contest/top' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}>
                コンテスト
              </a>
            </div>
          </Group>

          <Group visibleFrom="sm" justify="flex-end" >
          {user ? (
            <div className='flex'>
            <Link to="/photos/new" className='mr-4'>
              <Button
                rightSection={<IconUpload size={18} />}
                variant="outline"
                color="rgba(59, 59, 59, 1)"
                className='
                bg-transparent hover:bg-gray-400 text-gray-600 hover:text-white border border-gray-400 hover:border-transparent rounded
                shadow-sm shadow-gray-400 flex transition-all duration-100 active:translate-y-1 active:shadow-none'
              >
              アップロード
              </Button>
            </Link>

            <Menu shadow="md" width={200}  withArrow arrowPosition="center" transitionProps={{ transition: 'fade', duration: 300 }}>
              <Menu.Target>
                <Avatar
                  css={Styles.IconStyle}
                  src={userProfile.avatar_url}  // 画像のURLを指定
                  alt="Image Alt Text"  // 画像の代替テキスト
                  radius="50%"  // 円形にするための半径
                  size="md"
                  variant="light"
                  color="blue"
                  className='hover:opacity-75 transition-all duration-300'
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
                className='
                bg-transparent hover:bg-gray-400 text-gray-600 hover:text-white border border-gray-400 hover:border-transparent rounded
                shadow-sm shadow-gray-400 flex transition-all duration-100 active:translate-y-1 active:shadow-none'
              >
                ログイン
              </Button>
            </Link>
            )}
            
          </Group>
        </Group>
      </header>
    </Box>
  );
  
}
