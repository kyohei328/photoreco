import { Card, Image, Text, Group } from '@mantine/core';
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const ContestResultList = (props) => {

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
    LinkStyle: css ({
      flex: '0 1 23rem',
    }),
  }

  const { contestResults } = props;
  console.log(contestResults)
  const [selectedId, setSelectedId] = useState(null);
  const imagePath ='/contestIcon.jpg';

  const newContestsResults = (contestResults || []).map((contestResult, index) => (
    <Link to={`/contest/${contestResult.id}/result`} css={Styles.LinkStyle} key={index}>
      <Card  styles={{
          root: {
            // flex: '0 1 23rem',
            margin: '0.5rem',
            boxSizing: 'border-box',
            overflow: 'hidden',
            background: selectedId === contestResult.id ? '#D9E5FF' : 'transparent',
            opacity: selectedId === contestResult.id ? 0.7 : 1,
            cursor: 'pointer',
          },
        }} 
        shadow="md" 
        padding="md" 
        radius="sm" 
        withBorder 
        key={index}
        onMouseEnter={() => handleHover(contestResult.id)}
        onMouseLeave={() => handleHover(null)}
      >
        <Card.Section>
          <Image
            src={imagePath}
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{contestResult.department}</Text>
        </Group>

        <Text size="sm" c="dimmed">{contestResult.description}</Text>

        <Text size="sm" c="dimmed" className='pt-3'>開催者：{contestResult.user.name}</Text>
      </Card>
    </Link>
  ))

  const handleHover = (hoverId) => {
    // クリックされた画像の ID を取得
    // console.log('Clicked Image ID:', hoverId);

    // 選択された画像の ID を更新
    setSelectedId(hoverId);
  };

  return (
    <div className="flex flex-wrap mx-auto">
      {newContestsResults}
    </div>
  )
}

export default ContestResultList
