import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Input, Grid, Button, Select, Checkbox } from '@mantine/core';
import NewArrivalContest from './NewArrivalContest'
import { Link } from 'react-router-dom';

const ContestTop = () => {

  const Styles = {
    ImageSectionStyle: css ({
    }),
    ImageFrameStyle: css({
      // width: '100%',
      // padding: '0 44px',
      // display: 'flex',
      // flexWrap: 'wrap',
      padding: '0 44px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', /* 列数の自動調整 */
      gridGap: '10px', /* グリッドアイテム間の隙間を調整 */
    }),
    ImageStyle: css({
      // height: '15Vw',
      // width: '25Vw',
      // minHeight: '150px',
      // minWidth : '300px',
      width: '100%',
      objectFit: 'cover',
      // paddingTop: '100%', /* 縦横比を保つためのトリック */
    }),
    LogoStyle: css ({
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '10px',
    }),
    TitleStyle: css({
      borderBottom: '1px solid #CCCCCC',
      marginLeft: '44px',
      marginRight: '44px',
    })
  }

  const [newArrivalContest, setNewArrivalContes] = useState([]);
  const [applyContest, setApplyContest] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/contests')
      .then(resp => {
        setApplyContest(resp.data);
        console.log(resp.data)
      }).catch(error => {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      // alert('エラーが発生しました: ' + error.message);
    })
  },[]);

  return (
    <div className='h-full'>
      <section className='my-10'>
        <div className='bg-slate-100 w-10/12 mx-auto pb-px pt-5'>
        <h3 css={Styles.LogoStyle}>検索フォーム</h3>
        <Grid grow gutter="xs" className='my-5 w-10/12 mx-auto'>
          <Grid.Col span={12}>
            <Input.Wrapper label="フリーワード" description="" error="">
              <Input />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={5}>
            <Select
              label="部門"
              data={['キレイ部門', 'エンタメ部門']}
            />
          </Grid.Col>
          <Grid.Col span={2} className='pt-9'>
            <Checkbox
            className=''
              label="応募受付中"
              color="gray"
            />
          </Grid.Col>
          <Grid.Col span={2} className='pt-9'>
            <Checkbox
              label="コンテスト結果"
              color="gray"
            />
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
          <Grid.Col span={5}></Grid.Col>
          <Grid.Col span={5}></Grid.Col>
          <Grid.Col span={0.5} >
            <Button
              className='mr-0'
              type="submit"
              variant="outline"
              color="rgba(59, 59, 59, 1)"
            >
            検索
            </Button>
          </Grid.Col>
        </Grid>
      </div>
      </section>
      <section className='my-5 '>
        <div className='text-right px-6'>
          <Link to='/contest/new'>
            <Button
              variant="outline"
              color="rgba(59, 59, 59, 1)"
            >
            コンテストを開催する
            </Button>
          </Link>
        </div>
        <h3 css={Styles.LogoStyle}>応募中のコンテスト</h3>
        <div css={Styles.TitleStyle}></div>
        <div className='my-5'>
          <NewArrivalContest contest={applyContest}/>
        </div>
      </section>
      <section className='my-5'>
        <h3 css={Styles.LogoStyle}>コンテスト結果発表</h3>
        <div css={Styles.TitleStyle}></div>
        <div>

        </div>
      </section>
      {/* <section className='h-screen overflow-hidden my-5'> */}
      <section className='h-screen  my-5'>
        <div css={Styles.ImageFrameStyle}>

        </div>
      </section>
    </div>
  )
}

export default ContestTop
