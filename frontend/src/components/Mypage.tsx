import { Avatar, Group } from '@mantine/core';
import { css } from '@emotion/react'
import { useState, useEffect, useRef } from 'react'
import MypageContest from './MypageContest';
import MypageLikePhoto from './MypageLikePhoto';
import MypagePostPhoto from './MypagePostPhoto';
import MypageProfile from './MypageProfile';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios'
import { maxScreen } from '../mediaQueries';
import useWindowSize from '../useWindowSize';

const Mypage = () => {

  const Styles = {
    GroupStyle: css ({
      borderBottom: '1px solid #CCCCCC',
      padding: '0 1rem 1rem 1rem',
      margin: '0 10rem',
      textAlign: 'center',
      [maxScreen('lg')] : {
        margin: '0',
        padding: '0 0.5rem 1rem 0.5rem',
      },
    }),
    LinkStyle: css ({
      cursor: 'pointer',
    }),
    SelectedStyles: css({
      fontWeight: 'bold',
      textDecoration: 'underline',
    }),
  }

  const [selectedItem, setSelectedItem] = useState('contest');

  const [ windowWidth, windowHeight ] = useWindowSize();

  const selectItem = (item: any) => {
    setSelectedItem(item);
};

const selectedComponent = () => {
  switch (selectedItem) {
    case 'contest':
      return <MypageContest />;
    case 'like_photo':
      return <MypageLikePhoto />;
    case 'post_photo':
      return <MypagePostPhoto />;
    case 'profile':
      return <MypageProfile />;
    default:
      return <MypageContest />;
  }
};

const inputRef = useRef(null);
const { user } = UserAuth();
const [loading, setLoading] = useState(true);
const [avatarUrl, setAvatarUrl] = useState();
const [userProfile, setUserProfile] = useState({});

useEffect(() => {
  const userStatus = async () => {
    try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, config);
      setAvatarUrl(resp.data.avatar_url)
      setUserProfile(resp.data.user)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching like status:', error);
    }
  }
  userStatus();
},[]);


const handleClick = () => {
  // プログラム的にinput要素をクリック
  inputRef.current.click();
};

const handleFileChange = async (event) => {
  // ファイルが選択されたときの処理
  const selectedFile = event.target.files[0];

  try {
    // ファイルをRailsサーバーにアップロード
    const formData = new FormData();
    formData.append('user[avatar_img]', selectedFile);
    
    const token = await user.getIdToken(true);
    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    const resp = await axios.patch(`${import.meta.env.VITE_BASE_URL}/profile`, formData, config);
    setAvatarUrl(resp.data.avatar_url)
    setLoading(false);
    // アップロードが成功したら、適切な処理を行う
  } catch (error) {
    setLoading(false);
    console.error('Error uploading file:', error);
  }
};


if (loading) {
  return <div></div>
}

  return (
    <div>
      <section>
        <div className='text-center'>
          <Avatar
            styles={{
              root: {
                // flex: '1 0 auto',
              },
            }}
            css={Styles.AvatarStyle}
            className='mx-auto'
            src={avatarUrl}  // 画像のURLを指定
            alt="Image Alt Text"  // 画像の代替テキスト
            radius="50%"  // 円形にするための半径
            size={windowWidth <=1024 ? 80 : 120 }
            variant="light"
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            ref={inputRef}
          />
          <h3 className='mt-5'>{userProfile.name}</h3>
        </div>
      </section>
      <section className='mt-20'>
        <Group justify="center" gap={windowWidth <=1024 ? 12 : 120} css={Styles.GroupStyle}>
          <p onClick={() => selectItem('contest')}
            className={`py-1.5 px-0.5 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-0.5 after:w-11/12 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${selectedItem === 'contest' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}
          >
            コンテスト
          </p>
          <p onClick={() => selectItem('post_photo')}
            className={`py-1.5 px-0.5 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-0.5 after:w-11/12 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${selectedItem === 'post_photo' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}
          >
            投稿
          </p>
          <p onClick={() => selectItem('like_photo')}
            className={`py-1.5 px-0.5 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-0.5 after:w-11/12 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${selectedItem === 'like_photo' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}
          >
            お気に入り
          </p>
          <p className='text-gray-400 cursor-not-allowed'>添削依頼</p>
          <p onClick={() => selectItem('profile')}
            className={`py-1.5 px-0.5 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-1 after:w-11/12 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${selectedItem === 'profile' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}
          >
            プロフィール
          </p>
        </Group>
      </section>
      <section>
        {selectedComponent()}
      </section>
    </div>
  )
}

export default Mypage
