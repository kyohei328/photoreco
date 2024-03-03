import { Group } from '@mantine/core';
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import moment from 'moment';
import { Icon, Item } from 'semantic-ui-react'
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';
import { IconTrash } from '@tabler/icons-react';
import { maxScreen } from '../mediaQueries';
import useWindowSize from '../useWindowSize';
import { TopContestSlider } from './Swiper';

const MypageContest = (props) => {

  const Styles = {
    GroupStyle: css ({
      borderBottom: '1px solid #CCCCCC',
      padding: '0 1rem 1rem 1rem',
      margin: '5rem 10rem 1rem 10rem',
      textAlign: 'center',
      [maxScreen('lg')] : {
        margin: '5rem 1rem 1rem 1rem',
      },
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
  const imagePath ='/contestIcon.jpg';

  const [ windowWidth, windowHeight ] = useWindowSize();

  const selectItem = (item: 'post_contests' | 'entry_contests') => {
    setSelectContest(contests[item]);
    setSelectedItem(item);
};

  useEffect(() => {
    const userStatus = async () => {
      try {
        const token = await user.getIdToken(true);
        const config = { headers: { 'Authorization': `Bearer ${token}` }, params: {data_type: 'contest'} };
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/mypage`, config);
        setContests({
          post_contests: resp.data.post_contests,
          entry_contests: resp.data.entry_contests,
        });
        setSelectContest(resp.data.post_contests)
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }
    userStatus();
  },[]);

  // const contestsItem = selectContest.map((contest, index) => (
  //   <Item key={index}>
  //     <Item.Image size='tiny' src={imagePath}/>
  //     <Item.Content>
  //       <Item.Header as={`a`} href={`/contest/${contest.id}`} contest={contest}>{contest.title}</Item.Header>
  //       <Item.Meta>開催内容</Item.Meta>
  //       <Item.Description className='indent-2'>
  //         <p>{contest.description}</p>
  //       </Item.Description>
  //       <Item.Extra>応募期間</Item.Extra>
  //       <p className='indent-2'>{moment(contest.start_date).format('YYYY年MM月D日')} 〜 {moment(contest.end_date).format('YYYY年MM月D日')}</p>
  //       {selectedItem === 'post_contests' &&
  //         <div><IconTrash className='ml-auto' css={Styles.LinkStyle} onClick={() => contestDelete(contest.id)}/></div>
  //       }
  //     </Item.Content>
  //   </Item>
  // ));

  const contestDelete = async(id) => {
    try {
      const token = await user.getIdToken(true);
      const config = { headers: { 'Authorization': `Bearer ${token}` }};
      const resp = await axios.delete(`${import.meta.env.VITE_BASE_URL}/contests/${id}`, config);
      setSelectContest(resp.data.post_contests)
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  }


  return (
    <div>
      <Group justify="center" gap={windowWidth <=1024 ? 40 : 120} css={Styles.GroupStyle}>
        <p
          className={`py-1.5 px-2 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-1.5 after:w-11/12 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${selectedItem === 'post_contests' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}
          onClick={() => selectItem('post_contests')}
        >
          開催したコンテスト
        </p>
        <p
          className={`py-1.5 px-2 hover:text-sky-700 relative after:absolute after:bottom-0 after:left-1.5 after:w-11/12 after:h-0.5 after:bg-sky-600 after:transition-all after:duration-300 after:scale-y-100 after:scale-x-0 after:origin-top-left hover:after:scale-y-100 hover:after:scale-x-100 ${selectedItem === 'entry_contests' ? 'after:scale-y-100 after:scale-x-100 text-sky-700' : ''}`}
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
        <TopContestSlider contests={selectContest} contestDelete={contestDelete} selectedItem={selectedItem}/>
    </div>
  )
}

export default MypageContest
