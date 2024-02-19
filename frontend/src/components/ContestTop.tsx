import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Input, Grid, Select, Checkbox } from '@mantine/core';
import NewArrivalContest from './NewArrivalContest'
import { Link } from 'react-router-dom';
import ContestResultList from './ContestResultList'
import { useForm } from '@mantine/form';
import { UserAuth } from '../context/AuthContext';
import { BiSearchAlt } from "react-icons/bi";
import { ContestSlider, VerticalSlider } from './Swiper';
import { maxScreen } from '../mediaQueries';
import useWindowSize from '../useWindowSize';

const ContestTop = () => {

  const Styles = {
    ImageFrameStyle: css({
      padding: '0 44px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', /* 列数の自動調整 */
      gridGap: '10px', /* グリッドアイテム間の隙間を調整 */
    }),
    ImageStyle: css({
      width: '100%',
      objectFit: 'cover',
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
    }),
    SectionStyle: css ({
      height: '65vh',
    })
  }

  const [applyContests, setApplyContests] = useState([]);
  const [contestResults, setContestResults] = useState([]);
  const [contestSearch, setContestSearch] = useState(false);
  const [contestCount, setContestCount] = useState();
  const [resultCheck, setResultCheck] = useState(false);
  
  const { user } = UserAuth();
  const [ windowWidth, windowHeight ] = useWindowSize();

  const form = useForm({
    initialValues: {
      freeWord: '',
      department: '',
      apply: '',
      result: '',
    },
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/contests`)
      .then(resp => {
        setApplyContests(resp.data.contests);
        setContestResults(resp.data.contests_result);
        setResultCheck(false)
      }).catch(error => {
      console.log('エラー:', error);
      console.log('エラーコード:', error.code);
      console.log('エラーメッセージ:', error.message);
      alert('エラーが発生しました: ' + error.message);
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
        const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/contests`, { params });
        setApplyContests(resp.data.contests);
        setContestCount(resp.data.contest_count);
        setContestResults(resp.data.contests_result);
        setContestSearch(true);
      }catch (error) {
        console.log('エラー:', error);
        console.log('エラーコード:', (error as any).code);
        console.log('エラーメッセージ:', (error as any).message);
        alert('エラーが発生しました: ' + error.message);
      }
  }

  const renderedSlides = [
    <section css={Styles.SectionStyle} className='pt-5'>
      <h3 css={Styles.LogoStyle} className='fadeUp'>応募受付中のコンテスト</h3>
      <div css={Styles.TitleStyle} className='fadeUp'></div>
      <div className='my-5 mx-12 fadeUp max-lg:mx-4'>
        <ContestSlider contests={applyContests}/>
      </div>
    </section>,
    <section css={Styles.SectionStyle} className='pt-5'>
      <h3 css={Styles.LogoStyle} className='fadeUp'>コンテスト結果発表</h3>
      <div css={Styles.TitleStyle} className='fadeUp'></div>
      <div className='my-5 mx-12 max-lg:mx-4'>
        <ContestSlider contestResults={contestResults} windowWidth={windowWidth}/>
      </div>
    </section>
  ];

  return (
    <div className='h-full min-h-screen'>
      <section>
        <div className='w-10/12 mx-auto pb-px pt-5 max-lg:w-full'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid grow gutter="xs" className='my-5 w-10/12 mx-auto max-lg:w-11/12'>
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
            { windowWidth <= 1024 && (
              <>
                <Grid.Col span={3} className='pt-9'></Grid.Col>
                <Grid.Col span={3} className='pt-9'></Grid.Col>
              </>
            )}
            <Grid.Col span={windowWidth <= 1024 ? 3 : 2} className='pt-9'>
              <Checkbox
              className='ml-6 max-lg:ml-0'
                label="応募受付中"
                color="gray"
                {...form.getInputProps('apply')}
              />
            </Grid.Col>
            <Grid.Col span={windowWidth <= 1024 ? 3 : 2} className='pt-9'>
              <Checkbox
                className='ml-4 max-lg:ml-0'
                label="コンテスト結果"
                color="gray"
                size='sm'
                {...form.getInputProps('result')}
              />
            </Grid.Col>
            {/* <Grid.Col span={1}></Grid.Col> モバイル */}
            <Grid.Col span={1} className='pt-7'><button type="submit" className='
              bg-transparent hover:bg-gray-400 text-gray-600 hover:text-white border border-gray-400 hover:border-transparent rounded
              ml-4 mb-4 py-1 px-4 shadow-sm shadow-gray-400 w-10/12 flex transition-all duration-100 active:translate-y-1 active:shadow-none max-lg:text-sm max-lg:ml-1 max-lg:px-4 max-lg:mt-1 max-lg:w-24'><BiSearchAlt className='mt-1 mr-3'/>探す</button></Grid.Col>
          </Grid>
        </form>
      </div>
      </section>
        <div className='text-right pr-28'>
        { user &&
          <Link to='/contest/new'>
            <button type="submit" className='
              bg-transparent hover:bg-gray-400 text-gray-600 hover:text-white border border-gray-400 hover:border-transparent rounded
              ml-4 mr-12 mb-8 py-1 px-4 shadow-sm shadow-gray-400 transition-all duration-100 active:translate-y-1 active:shadow-none'>
            コンテストを開催する
            </button>
          </Link>
          }
        </div>
        <VerticalSlider sliders={renderedSlides}/>
    </div>
  )
}

export default ContestTop
