import { Avatar, Button, Group } from '@mantine/core';
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import MypageContest from './MypageContest';
import MypageLikePhoto from './MypageLikePhoto';
import MypagePostPhoto from './MypagePostPhoto';
import MypageProfile from './MypageProfile';



const Mypage = () => {

  const Styles = {
    AvatarStyle: css ({
      // Height: '40rem',
      // width: '5rem',
    }),
    GroupStyle: css ({
      borderBottom: '1px solid #CCCCCC',
      padding: '0 1rem 1rem 1rem',
      margin: '0 10rem',
      textAlign: 'center',
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
            src=""  // 画像のURLを指定
            alt="Image Alt Text"  // 画像の代替テキスト
            radius="50%"  // 円形にするための半径
            size={120}
            variant="light"
          />
          {/* <Button
            // rightSection={<LoginIcon size={18} />}
            size="xs"
            variant="outline"
            color="rgba(59, 59, 59, 1)"
          >
            ログイン
          </Button> */}
          <h3 className='mt-5'>ユーザー名</h3>
        </div>
      </section>
      <section className='mt-20'>
        <Group justify="center" gap={120} css={Styles.GroupStyle}>
          <p css={[Styles.LinkStyle, selectedItem === 'contest' && Styles.SelectedStyles]}
          onClick={() => selectItem('contest')}>コンテスト</p>
          <p css={[Styles.LinkStyle, selectedItem === 'post_photo' && Styles.SelectedStyles]}
          onClick={() => selectItem('post_photo')}>投稿</p>
          <p css={[Styles.LinkStyle, selectedItem === 'like_photo' && Styles.SelectedStyles]}
          onClick={() => selectItem('like_photo')}>お気に入り</p>
          <p className='text-gray-400 cursor-not-allowed'>添削依頼</p>
          <p css={[Styles.LinkStyle, selectedItem === 'profile' && Styles.SelectedStyles]}
          onClick={() => selectItem('profile')}>プロフィール</p>
        </Group>
      </section>
      <section>
        {selectedComponent()}
      </section>
    </div>
  )
}

export default Mypage
