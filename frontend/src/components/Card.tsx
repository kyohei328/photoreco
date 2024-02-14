import 'semantic-ui-css/semantic.min.css'
import { css, keyframes } from '@emotion/react'
import {
  CardMeta as SemanticCardMeta,
  CardHeader as SemanticCardHeader,
  CardDescription as SemanticCardDescription,
  CardContent as SemanticCardContent,
  Button as SemanticButton,
  Card as SemanticCard,
  Image as SemanticImage,
} from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card as MantineCard, Image as MantineImage, Text as MantineText, Group as MantineGroup } from '@mantine/core';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import '../assets/card.css'

const ContestCard = (props: any) => {
  const rotateYAnime = keyframes`
  from {
    transform: perspective(600px) translate3d(0, 0, 0) rotateY(-30deg);
    opacity: 0;
  }
  to {
    transform: perspective(600px) translate3d(0, 0, 0) rotateY(0deg);
    opacity: 1;
  }`;

  const Styles = {
    RotateYStyle: css({
      animationName: `${rotateYAnime}`,
      animationDuration: '0.5s',
      animationFillMode: 'forwards',
    }),
  }

  const navigate  = useNavigate()
  const MAX_DESCRIPTION_LENGTH = 70;



  const ContesDescription = ({ contest }) => {
    const limitedDescription = contest.contest.description.length > MAX_DESCRIPTION_LENGTH
      ? `${contest.contest.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : contest.contest.description;
  
    return (
        <strong>{limitedDescription}</strong>
    );
  };

  return (
    <SemanticCard>
      <SemanticCardContent>
        <SemanticImage
          floated="right"
          size="mini"
          src={props.contest.user_avatar}
        />
        <SemanticCardHeader>{props.contest.title}</SemanticCardHeader>
        <SemanticCardMeta>{props.contest.user_name}</SemanticCardMeta>
        <SemanticCardDescription>
          <ContesDescription contest={props}/>
        </SemanticCardDescription>
      </SemanticCardContent>
      <SemanticCardContent extra textAlign="right">
        <div className="">
          <SemanticButton content='View More' icon='right arrow' labelPosition='right' onClick={() => navigate(`/contest/${props.contest.id}`)} />
        </div>
      </SemanticCardContent>
    </SemanticCard>
  )
}


const ContestResultCard = (props: any) => {

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
    LinkStyle: css ({
      flex: '0 1 23rem',
    }),
    RotateYStyle: css({
      animationName: `${rotateYAnime}`,
      animationDuration: '0.5s',
      animationFillMode: 'forwards',
    }),
  }

  const [selectedId, setSelectedId] = useState(null);
  const imagePath ='/contestIcon.jpg';

  const [ref, inView] = useInView({
    triggerOnce: true, // 一度だけアニメーションを実行する
    rootMargin: '-150px',
  });

  const handleHover = (hoverId) => {
    setSelectedId(hoverId);
  };

  return (
    <Link to={`/contest/${props.contestResult.id}/result`} css={[Styles.LinkStyle, Styles.RotateYStyle]} ref={ref}>
      <MantineCard
        styles={{
          root: {
            margin: '0.5rem',
            boxSizing: 'border-box',
            overflow: 'hidden',
            background: selectedId === props.contestResult.id ? '#D9E5FF' : '#FFFFFF',
            opacity: selectedId === props.contestResult.id ? 0.7 : '',
            cursor: 'pointer',
            width: '100%',
            height: '28rem',
            backgroundColor: '#FFFFFF',
          },
        }}
        shadow="sm"
        padding="md"
        radius="sm"
        withBorder
        onMouseEnter={() => handleHover(props.contestResult.id)}
        onMouseLeave={() => handleHover(null)}
        className={`fadeUpTrigger ${inView ? 'flipLeft' : ''}`}
        // style={inView ? {animationDelay: `${index * 0.2}s`} : {}}
      >
        <MantineCard.Section>
          <MantineImage
            src={imagePath}
            height={20}
            style={{ height: '20rem', width: '100%', objectFit: 'cover' }}
            alt="Norway"
          />
        </MantineCard.Section>

        <MantineGroup justify="space-between" mt="md" mb="xs">
          <MantineText fw={500}>{props.contestResult.department}</MantineText>
        </MantineGroup>

        <MantineText size="sm" c="dimmed">{props.contestResult.description}</MantineText>

        <MantineText size="sm" c="dimmed" className='pt-3'>開催者：{props.contestResult.user.name}</MantineText>
      </MantineCard>
    </Link>
  )
}


export {ContestCard, ContestResultCard}
