import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Input, Grid, Button, Select, Checkbox } from '@mantine/core';
import NewArrivalContest from './NewArrivalContest'
import { Link } from 'react-router-dom';
import ContestResultList from './ContestResultList'
import { useForm } from '@mantine/form';

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

  const [applyContest, setApplyContest] = useState([]);
  const [contestResults, setContestResults] = useState([]);
  const [contestSearch, setContestSearch] = useState(false);
  const [contestCount, setContestCount] = useState();
  const [resultCheck, setResultCheck] = useState(false);
  

  const form = useForm({
    initialValues: {
      freeWord: '',
      department: '',
      apply: '',
      result: '',
    },
  });

  useEffect(() => {
    // axios.get('http://localhost:3000/api/v1/contests')
    axios.get(`${import.meta.env.VITE_BASE_URL}/contests`)
      .then(resp => {
        setApplyContest(resp.data.contests);
        setContestResults(resp.data.contests_result);
        setResultCheck(false)
        console.log(resp.data)
      }).catch(error => {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      // alert('エラーが発生しました: ' + error.message);
    })
  },[]);

  const handleSubmit = async (values: any) => {

    try {
      const today = new Date().toISOString().split('T')[0]; // 今日の日付を取得

      const params = {
        q: {
          title_or_description_cont: values.freeWord,
          department_eq: values.department,
        }
      };

        if (values.apply) {
          params.q.end_date_gteq = today;
          setResultCheck(false) // 今日以降の受付中のコンテストを検索
        }
        if (values.result) {
          params.q.result_date_lteq = today;
          setResultCheck(true)
        }else{
          setResultCheck(false)
        }
        // const resp = await axios.get("http://localhost:3000/api/v1/contests", { params });
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/contests`, { params });
        setApplyContest(resp.data.contests);
        setContestCount(resp.data.contest_count);
        setContestResults(resp.data.contests_result);
        console.log(resp.data)
        setContestSearch(true);
      }catch (error) {
        console.log('エラー:', error);
        console.log('エラーコード:', (error as any).code);
        console.log('エラーメッセージ:', (error as any).message);
        // alert('エラーが発生しました: ' + error.message);
      }
  }
  

  return (
    <div className='h-full'>
      <section className='my-10'>
        <div className='bg-slate-100 w-10/12 mx-auto pb-px pt-5'>
        <h3 css={Styles.LogoStyle}>検索フォーム</h3>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid grow gutter="xs" className='my-5 w-10/12 mx-auto'>
            <Grid.Col span={12}>
              <Input.Wrapper label="フリーワード" description="" error="">
                <Input {...form.getInputProps('freeWord')}/>
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={5}>
              <Select
                label="部門"
                data={['キレイ部門', 'エンタメ部門']}
                {...form.getInputProps('department')}
              />
            </Grid.Col>
            <Grid.Col span={2} className='pt-9'>
              <Checkbox
              className=''
                label="応募受付中"
                color="gray"
                {...form.getInputProps('apply')}
              />
            </Grid.Col>
            <Grid.Col span={2} className='pt-9'>
              <Checkbox
                label="コンテスト結果"
                color="gray"
                {...form.getInputProps('result')}
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
        </form>
      </div>
      </section>
     
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
        {contestSearch &&  (
          <h3 className='text-center my-4'>検索結果 {contestCount} 件</h3>
        ) || <div></div>}
        { !resultCheck &&  (
           <section className='my-5 '>
            <h3 css={Styles.LogoStyle}>応募中のコンテスト</h3>
            <div css={Styles.TitleStyle}></div>
            <div className='my-5'>
              <NewArrivalContest contest={applyContest}/>
            </div>
          </section>
        )}

      {(!contestSearch || resultCheck) &&
      <div>
        <section className='my-20'>
          <h3 css={Styles.LogoStyle}>コンテスト結果発表</h3>
          <div css={Styles.TitleStyle}></div>
          <div className='my-5 mx-5'>
            <ContestResultList contestResults={contestResults}/>
          </div>
        </section>
        <section className='pb-1'>
        </section>
      </div>
      } 
    </div>
  )
}

export default ContestTop
