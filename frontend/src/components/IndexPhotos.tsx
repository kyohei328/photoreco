import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Input, Grid, Button, Select } from '@mantine/core';



const IndexPhotos = () => {

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
    }),
  }

  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // useEffect (() => {
  //   axios.get('http://localhost:3000/api/v1/photos')
  //   .then(resp => {
  //     setImages(resp.data.photos);
  //     console.log(resp.data)
  //   }).catch(error => {
  //   console.log('エラー:', error);
  //   console.log('エラーコード:', error.code);
  //   console.log('エラーメッセージ:', error.message);
  //   // alert('エラーが発生しました: ' + error.message);
  // })
  // },[]);

  const indexImages = images.map((image, index) =>(
    <div key={index} css={Styles.ImageStyle} >
      <img
        css={Styles.ImageStyle}
        src={image}
      />
    </div>
  ))

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 画面下部に達したらページ数をプラス
      setPage(page + 1);
    }
  };
  
    useEffect(() => {
      axios.get(`http://localhost:3000/api/v1/photos?page=${page}`)
      .then(resp => {
        setImages((prevImages) => [...prevImages, ...resp.data.photos]);
        console.log(resp.data.photos);
      }).catch(error => {
        console.error('Error fetching images:', error);
      })
    },[page]);

  console.log(page)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // コンポーネントがアンマウントされるときにイベントリスナーをクリーンアップ
      window.removeEventListener('scroll', handleScroll);

    };
  }, []); // 空の依存配列で初回のみ実行

  return (
    <div className='h-full'>
      <section className=''>
        <div className='bg-slate-100 w-10/12 mx-auto pb-px pt-5'>
        <h3 css={Styles.LogoStyle}>検索フォーム</h3>
        <Grid grow gutter="xs" className='my-5 w-10/12 mx-auto'>
          <Grid.Col span={12}>
            <Input.Wrapper label="フリーワード" description="" error="">
              <Input />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="シーン" description="" error="">
              <Input  disabled placeholder="本リリースにて実装"/>
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="カテゴリー"
              data={['風景', '植物', '動物', '人物']}
              disabled
              placeholder="本リリースにて実装"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="撮影者" description="" error="">
              <Input />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Input.Wrapper label="撮影地" description="" error="">
              <Input />
            </Input.Wrapper>
          </Grid.Col>
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
      <div className='my-5'>
        <p className='text-center'>検索結果：〇〇件</p>
      </div>
      <div className='flex justify-center '>
        <p>並び替え</p>
        ：
        <p className='font-bold'>投稿日↓</p>
        ｜
        <p>お気に入り数</p>
        ｜
        <p>コメント数</p>
      </div>
      </section>
      {/* <section className='h-screen overflow-hidden my-5'> */}
      <section className='h-screen  my-5'>
        <div css={Styles.ImageFrameStyle}>
          {indexImages}
        </div>
      </section>
    </div>
  )
}

export default IndexPhotos
