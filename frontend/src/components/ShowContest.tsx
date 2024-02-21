import { useEffect, useState } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { Button, Modal } from '@mantine/core';
import moment from 'moment';
import EntryContestModal from './EntryContestModal';
import VoteContestModal from './VoteContestModal';
import { UserAuth } from '../context/AuthContext';

const ShowContest = () => {

  const Styles = {
    LogoStyle: css ({
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      minHeight: '40px',
      marginBottom: '20px',
    }),
    ContainerStyle: css ({
      maxWidth: '1020px',
      width: '90%',
      height: '84vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    ButtonStyles: css({
      margin: '30px 0',
      justifyContent: 'center',
    }),
    TableTitleStyle: css ({
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      minHeight: '40px',
    }),
    TableBoxStyle: css ({
      display: 'flex',
      justifyContent: 'center',
      height: '30em',
      padding: '30px',
      border: '1px solid',
      borderRadius: '5px',
      borderColor: '#ADB5BD',

    }),
    TableDataStyle: css ({
      borderBottom: '1px solid',
      borderColor: '#ADB5BD',
    }),
  };

  const [contest, setContest] = useState({});
  const [postUser, setPostUser] = useState({});
  const [entryContestOpened, setEntryContestOpened] = useState(false);
  const [voteContestOpened, setVoteContestOpened] = useState(false);

  const { id } = useParams();
  const { user } = UserAuth() as { user: object };


  useEffect(() => {
   axios.get(`${import.meta.env.VITE_BASE_URL}/contests/${id}`)
   .then(resp => {
      setContest(resp.data)
      setPostUser(resp.data.user)
   }).catch(error => {
    console.log('エラー:', error);
    console.log('エラーコード:', error.code);
    console.log('エラーメッセージ:', error.message);
    alert('エラーが発生しました: ' + error.message);
   })
  }, [])

  const start_date = moment(contest.start_date).format('YYYY年MM月D日');
  const end_date = moment(contest.end_date).format('YYYY年MM月D日');

  return (
    <div css={Styles.ContainerStyle}>
    <h1 css={Styles.LogoStyle}>{contest.title}</h1>
    <div className=''>
      <h3 css={Styles.TableTitleStyle}>応募事項</h3>
      <div css={Styles.TableBoxStyle}>
        <table className='min-w-full'>
          <tbody>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10 max-lg:indent-2 max-lg:text-sm'>主催者</td>
              <td className='indent-20 max-lg:indent-8 max-lg:text-sm'>{postUser.name}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10 max-lg:indent-2 max-lg:text-sm'>開催期間</td>
              <td className='indent-20 max-lg:indent-8 max-lg:text-sm'>{start_date} 〜 {end_date}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10 max-lg:indent-2 max-lg:text-sm'>結果発表日</td>
              <td className='indent-20 max-lg:indent-8 max-lg:text-sm'>{contest.result_date}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10 max-lg:indent-2 max-lg:text-sm'>開催部門</td>
              <td className='indent-20 max-lg:indent-8 max-lg:text-sm'>{contest.department}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10 max-lg:indent-2 max-lg:text-sm'>開催内容</td>
              <td className='indent-20 max-lg:indent-8 max-lg:text-sm'>{contest.description}</td>
            </tr>
            <tr>
              <td className='indent-10 max-lg:indent-2 max-lg:text-sm'>応募条件</td>
              <td className='indent-20 max-lg:indent-8 max-lg:text-sm'>{contest.entry_conditions}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-5 text-center'>
      <Modal
        opened={entryContestOpened}
        onClose={() => setEntryContestOpened(false)}
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
        size="80%"
      >
        <EntryContestModal user={postUser} contest={contest}/>
      </Modal>
      <Modal
        opened={voteContestOpened}
        onClose={() => setVoteContestOpened(false)}
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
        size="80%"
      >
        <VoteContestModal contestId={id}/>
      </Modal>
      { user && 
        <>
          <Button
            className='mx-32 max-lg:mx-10'
            onClick={() => setVoteContestOpened(true)} variant="default"
            color="rgba(59, 59, 59, 1)"
          >
            投票する
          </Button>
          <Button
            className='mx-32 max-lg:mx-10'
            onClick={() => setEntryContestOpened(true)} variant="default"
            color="rgba(59, 59, 59, 1)"
          >
            応募する
          </Button>
        </>
      }
      </div>
    </div>
</div>
  )
}

export default ShowContest
