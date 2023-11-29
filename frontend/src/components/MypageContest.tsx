import { Group } from '@mantine/core';
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import moment from 'moment';
import { Icon, Item } from 'semantic-ui-react'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';
import { IconTrash } from '@tabler/icons-react';

const MypageContest = (props) => {

  const Styles = {
    GroupStyle: css ({
      borderBottom: '1px solid #CCCCCC',
      padding: '0 1rem 1rem 1rem',
      margin: '5rem 10rem 1rem 10rem',
      textAlign: 'center',
    }),
    LinkStyle: css ({
      cursor: 'pointer',
      '&:hover': {
        fontWeight: 'bold',
      }
    }),
    SelectedStyles: css({
      fontWeight: 'bold',
      textDecoration: 'underline',
    }),
  }

  const { user } = UserAuth();

  const [selectedItem, setSelectedItem] = useState('post_contests');
  const [selectContest, setSelectContest] = useState([]);
  const [contests, setContests] = useState({ post_contests: [], entry_contests: [] });


  const selectItem = (item: 'post_contests' | 'entry_contests') => {
    setSelectContest(contests[item]);
    setSelectedItem(item);
};

  useEffect(() => {
    const userStatus = async () => {
      try {
        const token = await user.getIdToken(true);
        console.log(token)
        const config = { headers: { 'Authorization': `Bearer ${token}` }, params: {data_type: 'contest'} };
        const resp = await axios.get('http://localhost:3000/api/v1/mypage', config);
        setContests({
          post_contests: resp.data.post_contests,
          entry_contests: resp.data.entry_contests,
        });
        setSelectContest(resp.data.post_contests)
        console.log(resp.data.post_contests)
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }
    userStatus();
  },[]);


  console.log(selectContest)



  const contestsItem = selectContest.map((contest, index) => (
    <Item key={index}>
      <Item.Image size='tiny' src="https://photospace-image.s3.ap-northeast-1.amazonaws.com/rbkrutko9gmw25bogswl8x0vtul1"/>
      <Item.Content>
        <Item.Header as={`a`} href={`/contest/${contest.id}`} contest={contest}>{contest.title}</Item.Header>
        <Item.Meta>開催内容</Item.Meta>
        <Item.Description className='indent-2'>
          <p>{contest.description}</p>
        </Item.Description>
        <Item.Extra>応募期間</Item.Extra>
        <p className='indent-2'>{moment(contest.start_date).format('YYYY年MM月D日')} 〜 {moment(contest.end_date).format('YYYY年MM月D日')}</p>
        {selectedItem === 'post_contests' &&
          <div><IconTrash className='ml-auto' css={Styles.LinkStyle} onClick={() => contestDelete(contest.id)}/></div>
        }
        {/* {selectedItem === 'post_contests' &&
          <div><IconTrash className='ml-auto' css={Styles.LinkStyle} /></div>
        } */}
      </Item.Content>
    </Item>
  ));

  const contestDelete = async(id) => {
    try {

      const token = await user.getIdToken(true);
      console.log(token)
      const config = { headers: { 'Authorization': `Bearer ${token}` }};
      const resp = await axios.delete(`http://localhost:3000/api/v1/contests/${id}`, config);
      setSelectContest(resp.data.post_contests)
      console.log(resp.data.post_contests)
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  }


  return (
    <div>
      <Group justify="center" gap={120} css={Styles.GroupStyle}>
        <p css={[Styles.LinkStyle, selectedItem === 'post_contests' && Styles.SelectedStyles]}
          onClick={() => selectItem('post_contests')}
        >
          開催したコンテスト
        </p>
        <p css={[Styles.LinkStyle, selectedItem === 'entry_contests' && Styles.SelectedStyles]}
          onClick={() => selectItem('entry_contests')}
        >
          参加中のコンテスト
        </p>
      </Group>
      <div className='flex justify-center '>
        <p>並び替え</p>
        ：
        <p className='font-bold'>締切日↑</p>
      </div>
        <Item.Group className='px-20'>
          {contestsItem}
        </Item.Group>
    </div>
  )
}

export default MypageContest
