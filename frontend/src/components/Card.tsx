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
import { Card as MantineCard, Image as MantineImage, Text as MantineText, Group as MantineGroup, BackgroundImage } from '@mantine/core';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import '../assets/card.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useTranslation } from 'react-i18next';



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

  const { windowWidth } = props;

  const Styles = {
    LinkStyle: css ({
      flex: '0 1 23rem',
    }),
    RotateYStyle: css({
      animationName: `${rotateYAnime}`,
      animationDuration: '0.5s',
      animationFillMode: 'forwards',
    }),
    CoverImageStyle: css ({
      backgroundImage: 'url("/frame-10.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: '99999',
      position: 'absolute',
      top: '-1rem',
      // /* background-attachment: fixed; */
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
            width: windowWidth <= 1024 ? '16rem' : '25rem',
            height: windowWidth <= 1024 ? '22rem' : '31rem',
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
            style={windowWidth <= 1024 ?
              { height: '11.5rem', width: '100%', objectFit: 'contain' }
              :
              { height: '20rem', width: '100%', objectFit: 'cover' }
            }
            alt="Norway"
          />
        </MantineCard.Section>

        <MantineGroup justify="space-between" mt="md" mb="xs">
          <MantineText size={ windowWidth <= 1024 ? 'sm' : undefined }  fw={500}>{props.contestResult.department}</MantineText>
        </MantineGroup>

        <MantineText size={ windowWidth <= 1024 ? 'xs' : 'sm' } c="dimmed">{props.contestResult.description}</MantineText>

        <MantineText size={ windowWidth <= 1024 ? 'xs' : 'sm' } c="dimmed" className='pt-3'>開催者：{props.contestResult.user.name}</MantineText>
      </MantineCard>
    </Link>
  )
}

const ContestAwardCard = (props: any) => {
  const { result } = props;
  const { vote } = props;
  const { t } = useTranslation();

  const AwardStyle = (award) => {
    let styles = ''; // スタイルを格納する変数
  
    switch (award) {
      case 'GrandPrize':
        styles = css`
          background: linear-gradient(to bottom, #e6b422, #ffffff);
        `;
        break;
      case 'SecondPrize':
        styles = css`
          background: linear-gradient(to bottom, #9E9E9E, #ffffff); /* セカンドプライズの背景色 */
        `;
        break;
      case 'SelectedPrize':
        styles = css`
          background: linear-gradient(to bottom, #a57e65, #ffffff); /* セレクトプライズの背景色 */
        `;
        break;
    }
  
    return styles;
  };

  return(
    <Link to={`/photos/${result.photo.id}`}>
      <Card sx={{ maxWidth: 345 }} className='mr-auto ml-auto mt-8'>
        <CardHeader
          title={t(`${result.result.award}`)}
          css={AwardStyle(result.result.award)}
        />
        <CardMedia
          component="img"
          height="194"
          image={result.photo.image_url}
          alt="Paella dish"
        />
        <CardContent>
          <Typography>
            {result.photo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='indent-2'>
            撮影書：{result.user.name}
          </Typography>
          <Typography className='pt-4'>
            投稿者コメント
          </Typography>
          <Typography variant="body2" color="text.secondary" className='indent-2'>
          {vote[result.result.award] && vote[result.result.award].comment != 'undefined' && (
            <>
              {vote[result.result.award].comment}
            </>
          )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
      </Card>
    </Link>
  )
}

export {ContestCard, ContestResultCard, ContestAwardCard}
