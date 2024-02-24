import { Item } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment';
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import axios from 'axios'
import { Avatar, Text, Group, Button, Image } from '@mantine/core';
import { IconPhoneCall, IconAt, IconChevronsRight } from '@tabler/icons-react';
import classes from '../assets/UserInfoIcons.module.css';
import { useTranslation } from 'react-i18next';
import { ContestAwardCard } from './Card';
import useWindowSize from '../useWindowSize';
import { dividerClasses } from '@mui/material';


const ContestResult = () => {

  const Styles = {
    AwardStyle: css ({
      marginLeft: '0.5rem',
    }),
    DetailedStatementStyle: css ({
      width: '100%',
      height: '19rem',
    }),
    DetailedTileStyle: css ({
      margin: '1rem 0.5rem',
    }),
    DetailedDescriptionStyle: css ({
      margin: '1rem 0.5rem',
    }),
    DetailedCommentAreaStyle: css ({
      margin: '1rem 0.5rem 0 0.5rem',
      borderTop: 'solid 1px #ADB5BD',
      paddingTop: '1rem',
    }),
    DetailedCommentStyle: css ({
      margin: '0.25rem 0.5rem 0 0.5rem',
      paddingTop: '1rem',
    }),
  }
  
  const AwardStyle = (award) => {
    let styles = ''; // スタイルを格納する変数
  
    switch (award) {
      case 'GrandPrize':
        styles = css`
          background: linear-gradient(to bottom, #e6b422, #ffffff);
        `;
        break;
      case 'SecondPrize':
        styles = css`
          background: linear-gradient(to bottom, #9E9E9E, #ffffff); /* セカンドプライズの背景色 */
        `;
        break;
      case 'SelectedPrize':
        styles = css`
          background: linear-gradient(to bottom, #a57e65, #ffffff); /* セレクトプライズの背景色 */
        `;
        break;
    }
  
    return styles;
  };

  const { t } = useTranslation();
  const { id } = useParams();
  const [contestResults, setContestResults] = useState([]);
  const [contest, setContest] = useState();
  const [vote, setVote] = useState();
  const [loading, setLoading] = useState(true);

  const [ windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/contests/${id}/contest_results`)
      .then(resp => {
        setContestResults(resp.data.results);
        setContest(resp.data.contest);
        setVote(resp.data.vote);
        setLoading(false);
      }).catch(error => {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      alert('エラーが発生しました: ' + error.message);
      setLoading(false);
    })
  },[]);

  const awards = contestResults.map((result, index) => (
    ( windowWidth <= 1024 ? (
      <ContestAwardCard result={result} vote={vote} key={index}/>
    ) : (
    <Group wrap="nowrap" key={index} className='m-16 py-0'>
    <Image
      radius="sm"
      h={305}
      w={400}
      fit="cover"
      src={result.photo.image_url}
    />

  <div css={Styles.DetailedStatementStyle}>
    <div css={AwardStyle(result.result.award)}>
      <Text fz="md" tt="uppercase" fw={700} c="black" css={Styles.AwardStyle}>
        {t(`${result.result.award}`)}
      </Text>
    </div>

    <Text fz="xl" fw={700} className={classes.name} css={Styles.DetailedTileStyle}>
      {result.photo.title}
    </Text>

    <Group wrap="nowrap" gap={10} mt={3} >
      <Text fz="sm" c="dimmed" css={Styles.DetailedDescriptionStyle}>
        撮影者：{result.user.name}
      </Text>
    </Group>
    <div className='text-right'>
      <Link to={`/photos/${result.photo.id}`}>
        <Button
          size="xs"
          variant="outline"
          color="rgba(59, 59, 59, 1)"
          rightSection={<IconChevronsRight size={14} />}
        >
        写真の詳細へ
        </Button>
      </Link>
    </div>

    <Group wrap="nowrap" gap={10} mt={30} css={Styles.DetailedCommentAreaStyle}>
      <Text fz="md" c="black">
        投票者コメント
      </Text>
    </Group>
    <Group wrap="nowrap" gap={10} mt={0} css={Styles.DetailedCommentStyle}>
    {vote[result.result.award] && vote[result.result.award].comment != 'undefined' && (
      <Text fz="sm" c="dimmed">
        {vote[result.result.award].comment}
      </Text>
    )}
    </Group>
  </div>
  </Group>))
  ))

  if (loading) {
    return <div></div>
  }

  return (
    <div className='pb-4'>
      <section className='text-center'>
        <p className='mb-2'>{contest.department}</p>
        <h3 className='font-bold mb-2 text-lg'>{contest.title}</h3>
        <h3 className='font-bold mb-2 text-lg'>受賞作品一覧</h3>
      </section>
      <div>
        {awards}
      </div>
    </div>
  )
}

export default ContestResult
