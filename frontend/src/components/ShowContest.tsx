import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { Button, Group } from '@mantine/core';
import moment from 'moment';

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

  const { id } = useParams();

  console.log(id)

  useEffect(() => {
   axios.get(`http://localhost:3000/api/v1/contests/${id}`)
   .then(resp => {
      setContest(resp.data)
      setPostUser(resp.data.user)
      console.log(resp.data)
   }).catch(error => {
    console.log('エラー:', error);
    console.log('エラーコード:', error.code);
    console.log('エラーメッセージ:', error.message);
    // alert('エラーが発生しました: ' + error.message);
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
              <td className='indent-10'>主催者</td>
              <td className='indent-20'>{postUser.name}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10'>開催期間</td>
              <td className='indent-20'>{start_date} 〜 {end_date}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10'>結果発表日</td>
              <td className='indent-20'>{contest.result_date}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10'>開催部門</td>
              <td className='indent-20'>{contest.department}</td>
            </tr>
            <tr css={Styles.TableDataStyle}>
              <td className='indent-10'>開催内容</td>
              <td className='indent-20'>{contest.description}</td>
            </tr>
            <tr>
              <td className='indent-10'>応募条件</td>
              <td className='indent-20'>{contest.entry_conditions}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-5 text-center'>
        <Button
          variant="outline"
          color="rgba(59, 59, 59, 1)"
        >
          応募する
        </Button>
      </div>
    </div>
</div>
  )
}

export default ShowContest
