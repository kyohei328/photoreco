import { useState, useEffect } from 'react'
import axios from 'axios'
import { css } from '@emotion/react'
import { Input, Grid, Button, Select, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa";
import { useForm } from '@mantine/form';

const IndexPhotos = () => {

  const Styles = {
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
      maxHeight: '19vh',
      width: '100%',
      // objectFit: 'cover',
      objectFit: 'contain',
      // paddingTop: '100%', /* 縦横比を保つためのトリック */
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
    })
  }

  const [images, setImages] = useState<any[]>([]);
  // const [imagesPostDateAsc, setImagesPostDateAsc] = useState<any[]>([]);
  // const [imagesLikesAsc, setImagesLikesAsc] = useState<any[]>([]);
  // const [imagesLikesDesc, setImagesLikesDesc] = useState<any[]>([]);

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

  const indexImages = images.map((image, index) =>(
    <div key={index} css={Styles.ImageStyle} >
      <Link to={`/photos/${image.id}`}>
        <Image
          css={Styles.ImageStyle}
          className='px-0 mb-1'
          radius="sm"
          src={image.image_url}
        />
      </Link>
    </div>
  ))

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 画面下部に達したらページ数をプラス
      setPage(page + 1);
    }
  };

  console.log(import.meta.env.VITE_BASE_URL);

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
      // fetchData();
    };

  console.log(page)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // コンポーネントがアンマウントされるときにイベントリスナーをクリーンアップ
      window.removeEventListener('scroll', handleScroll);

    };
  }, []); // 空の依存配列で初回のみ実行

  // if (loading) {
  //   return <div></div>
  // }


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
            {/* <p css={[Styles.LinkStyle, selectedSort === 'post' && Styles.SelectedStyle]}
            onClick={() => setSelectedSort('post')}
          >投稿日↓</p>
            ｜
            <p css={[Styles.LinkStyle, selectedSort === 'like' && Styles.SelectedStyle]}
            onClick={() => setSelectedSort('like')}>お気に入り数</p> */}
            {sortLink}
          </div>
          </section>
          {loading ? (<></>):(
          <section className='h-screen  my-5'>
            <div css={Styles.ImageFrameStyle}>
              {indexImages}
            </div>
          </section>
          )}
    </div>
  )
}

export default IndexPhotos
