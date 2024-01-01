import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Input, Grid, Button, Select, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa";
import { useForm } from '@mantine/form';
import classes from '../assets/parts.module.css'
// import '../assets/layout.css'
import { MuuriComponent } from "muuri-react";

const IndexPhotos = () => {

  const Styles = {
    ImageSectionStyle: css({
      position: 'relative',
    }),
    ImageFrameStyle: css({
      display: 'block',
      position: 'absolute',
      width: '19.7%',
      zIndex: 1,
    }),
    ImageContentStyle: css({
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: '10px 0 0 10px',
    }),
    ImageBoxStyle: css({
      overflow: 'hidden',
    }),
    ImageStyle: css({
      width:'100%',
      height: 'auto',
      verticalAlign: 'bottom',
      transform: 'scale(1)',
      transition: '.5s ease-in-out',
      '&:hover':{
        transform: 'scale(1.1)'
      },
    }),
    LogoStyle: css ({
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
    }),
    LinkStyle: css ({
      cursor: 'pointer',
      '&:hover': {
        fontWeight: 'bold',
      }
    }),
    SelectedStyle: css({
      fontWeight: 'bold',
      textDecoration: 'underline',
    }),
  }

  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({});
  const [photoCount, setPhotoCount] = useState();
  const [photoSearch, setPhotoSearch] = useState(false);
  const [selectedSort, setSelectedSort] = useState('postDesc');

  const form = useForm({
    initialValues: {
      freeWord: '',
      postUserName: '',
    },
  });

  const options = {
    layout: {
      fillGaps: true, // グリッドの穴埋めを行うかどうか
      horizontal: false, // アイテムを水平に配置するかどうか
    },
  };

  const indexImages = images.map((image, index) =>(
    <div key={index} className={classes.item}>
      <div css={Styles.ImageContentStyle}>
        <Link to={`/photos/${image.id}`}>
          <div css={Styles.ImageBoxStyle}>
            <Image
              css={Styles.ImageStyle}
              className='px-0 mb-1'
              radius="sm"
              src={image.image_url}
            />
          </div>
        </Link>
      </div>
    </div>
  ))

  const handleScroll = () => {
    console.log('scroll')
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 画面下部に達したらページ数をプラス
      setPage(page + 1);
    }
  }

    useEffect(() => {
      // axiosでデータを取得する部分は関数化して、利用する
      const fetchData = async () => {
        try {
          const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/photos?page=${page}`, {
            params: { ...searchParams } // ページ数も追加
          });
          setImages((prevImages) => [...prevImages, ...resp.data.photos]);
          setPhotoCount(resp.data.photo_count)
          setLoading(false);
          console.log(resp.data);
        } catch (error) {
          setLoading(false);
          console.error('Error fetching images:', error);
        }
      };
    
      fetchData(); // 初回レンダリング時にもデータを取得
    
      // pageが変更されたときにもデータを取得
    }, [page, searchParams]);


    const sortPhotos = (images, key, order) => {
      return [...images].sort((a, b) => {
        if (order === 'asc') {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
    };

    const handleSortByPostDateAsc = () => {
      const sortedPhotos = sortPhotos(images, 'created_at', 'asc');
      setImages(sortedPhotos);
    };

    const handleSortByPostDateDesc = () => {
      const sortedPhotos = sortPhotos(images, 'created_at', 'desc');
      setImages(sortedPhotos);
    };
    
    const handleSortByLikesAsc = () => {
      const sortedPhotos = sortPhotos(images, 'likes_count', 'asc');
      setImages(sortedPhotos);
    };
    
    const handleSortByLikesDesc = () => {
      const sortedPhotos = sortPhotos(images, 'likes_count', 'desc');
      setImages(sortedPhotos);
    };
    
    const handleSubmit = async (values: any) => {
      setPage(1);
      setLoading(true);
      setImages([]);
      setPhotoSearch(true);

      const params = {
        q: {
          title_or_description_or_camera_cont: values.freeWord,
          user_name_cont: values.postUserName,
        },
      };

      setSearchParams(params)
    };

  console.log(page)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // コンポーネントがアンマウントされるときにイベントリスナーをクリーンアップ
      window.removeEventListener('scroll', handleScroll);

    };
  }, []); // 空の依存配列で初回のみ実行


  const sortLink = (() => {
    switch (selectedSort) {
      case 'postDesc':
        return (
          <>
            <p css={[Styles.SelectedStyle, Styles.LinkStyle]} onClick={() => {setSelectedSort('postAsc');handleSortByPostDateAsc()}}>
              投稿日↓
            </p>
            ｜
            <p css={Styles.LinkStyle} onClick={() => {setSelectedSort('likeDesc'); handleSortByLikesDesc()}}>
              お気に入り数
            </p>
          </>
        );
      case 'postAsc':
        return (
          <>
            <p css={[Styles.SelectedStyle, Styles.LinkStyle]} onClick={() => {setSelectedSort('postDesc'); handleSortByPostDateDesc()}}>
              投稿日↑
            </p>
            ｜
            <p css={Styles.LinkStyle} onClick={() => {setSelectedSort('likeDesc'); handleSortByLikesDesc()}}>
              お気に入り数
            </p>
          </>
        );
      case 'likeDesc':
        return (
          <>
            {/* お気に入り数に関連する表示 */}
            <p css={Styles.LinkStyle} onClick={() => setSelectedSort('postDesc')}>
              投稿日
            </p>
            ｜
            <p css={[Styles.SelectedStyle, Styles.LinkStyle]} onClick={() => {setSelectedSort('likeAsc'); handleSortByLikesAsc()}}>
              お気に入り数↓
            </p>
          </>
        );
      case 'likeAsc':
        return (
          <>
            {/* お気に入り数に関連する表示 */}
            <p css={Styles.LinkStyle} onClick={() => setSelectedSort('postDesc')}>
              投稿日
            </p>
            ｜
            <p css={[Styles.SelectedStyle, Styles.LinkStyle]} onClick={() => {setSelectedSort('likeDesc'); handleSortByLikesDesc()}}>
              お気に入り数↑
            </p>
          </>
        );
      // 他のケースに関する表示を追加することもできます
      default:
        return null;
    }
  })();


  if (loading) {
    return <div></div>
  }

  return (
    <div className='h-full'>
      <section className=''>
        <div className='bg-slate-100 w-10/12 mx-auto pb-px pt-5'>
        <h3 css={Styles.LogoStyle}>検索フォーム</h3>
        <form onSubmit={(e) => { setLoading(true); form.onSubmit(handleSubmit)(e); }}>
          <Grid grow gutter="xs" className='my-5 w-10/12 mx-auto'>
            <Grid.Col span={12}>
              <Input.Wrapper label="フリーワード" description="" error="">
                <Input
                  {...form.getInputProps('freeWord')}
                />
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
                <Input
                  {...form.getInputProps('postUserName')}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6} className='flex-wrap pt-2'>
                <Text size="sm" className='mb-2'>撮影地</Text>
                <Link to='/photos/map' className='flex items-center justify-end'>
                  <Text size="md" c="dimmed">地図を開く</Text>
                  <FaAngleRight style={{ color: '#868e96' }}/>
                </Link>
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
        </form>
      </div>
          <div className='mt-10 mb-5'>
            { photoSearch && 
              <p className='text-center'>検索結果： {photoCount} 件</p>
            }
          </div>
          <div className='flex justify-center '>
            <p>並び替え</p>
            ：
            {sortLink}
          </div>
          </section>
          {/* <section className='h-screen my-5 grid delayScroll' ref={sectionRef}>
            <MuuriComponent>
              {indexImages}
            </MuuriComponent>
          </section> */}
          <section className='h-3/6 my-5 grid' css={Styles.ImageSectionStyle}>
            <MuuriComponent {...options}>
              {indexImages}
            </MuuriComponent>
          </section>
    </div>
  )
}

export default IndexPhotos