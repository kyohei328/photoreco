import { Card, Image, Text, Group } from '@mantine/core';
import { useState } from 'react'
import { css, keyframes } from '@emotion/react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';


const ContestResultList = (props) => {

  const rotateYAnime = keyframes`
    from {
      transform: perspective(600px) translate3d(0, 0, 0) rotateY(-30deg);
      opacity: 0;
    }
    to {
      transform: perspective(600px) translate3d(0, 0, 0) rotateY(0deg);
      opacity: 1;
    }
  `;

  const Styles = {
    ImageFrameStyle: css({
      padding: '0 44px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', /* 列数の自動調整 */
      gridGap: '10px', /* グリッドアイテム間の隙間を調整 */
    }),
    ImageStyle: css({
      maxHeight: '19vh',
      width: '100%',
      objectFit: 'contain',
    }),
    LinkStyle: css ({
      flex: '0 1 23rem',
    }),
    RotateYStyle: css({
      animationName: `${rotateYAnime}`,
      animationDuration: '0.5s',
      animationFillMode: 'forwards',
    }),
  }

  const { contestResults } = props;
  const [selectedId, setSelectedId] = useState(null);
  const imagePath ='/contestIcon.jpg';

  const [ref, inView] = useInView({
    triggerOnce: true, // 一度だけアニメーションを実行する
    rootMargin: '-150px',
  });

  const newContestsResults = (contestResults || []).map((contestResult, index) => (
    <Link to={`/contest/${contestResult.id}/result`} css={[Styles.LinkStyle, Styles.RotateYStyle]} key={index} ref={ref}>
      <Card  styles={{
          root: {
            margin: '0.5rem',
            boxSizing: 'border-box',
            overflow: 'hidden',
            background: selectedId === contestResult.id ? '#D9E5FF' : 'transparent',
            opacity: selectedId === contestResult.id ? 0.7 : '',
            cursor: 'pointer',
          },
        }} 
        shadow="sm" 
        padding="md" 
        radius="sm" 
        withBorder 
        key={index}
        onMouseEnter={() => handleHover(contestResult.id)}
        onMouseLeave={() => handleHover(null)}
        className={`fadeUpTrigger ${inView ? 'flipLeft' : ''}`}
        style={inView ? {animationDelay: `${index * 0.2}s`} : {}}
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
    setSelectedId(hoverId);
  };

  return (
    <div className="flex flex-wrap mx-auto">
      {newContestsResults}
    </div>
  )
}

export default ContestResultList
