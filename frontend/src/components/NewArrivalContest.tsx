// import { Item } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment';
import { css, keyframes } from '@emotion/react'
import {
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Button,
  Card,
  Image,
} from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';



const NewArrivalContest = (props: any) => {
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
   RotateYStyle: css({
     animationName: `${rotateYAnime}`,
     animationDuration: '0.5s',
     animationFillMode: 'forwards',
   }),
 }

  const imagePath ='/contestIcon.jpg';
  const navigate  = useNavigate()
  const MAX_DESCRIPTION_LENGTH = 70;

  console.log(props)


  const ContesDescription = ({ contest }) => {
    const limitedDescription = contest.description.length > MAX_DESCRIPTION_LENGTH
      ? `${contest.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : contest.description;
  
    return (
        <strong>{limitedDescription}</strong>
    );
  };


  const newContests = props.contest ? (
    props.contest.map((contest: any, index: number) => (
      <Card key={index}>
      <CardContent>
        <Image
          floated="right"
          size="mini"
          src={contest.user_avatar}
        />
        <CardHeader>{contest.title}</CardHeader>
        <CardMeta>{contest.user_name}</CardMeta>
        <CardDescription>
          <ContesDescription contest={contest}/>
        </CardDescription>
      </CardContent>
      <CardContent extra textAlign="right">
        <div className="">
          <Button content='View More' icon='right arrow' labelPosition='right' onClick={() => navigate(`/contest/${contest.id}`)} />
        </div>
      </CardContent>
    </Card>
    ))
  ) : (
    <p>新着のコンテストがありません</p>
  )

  return (
    <div>
      <CardGroup>
        {newContests}
      </CardGroup>
    </div>
  )
}

export default NewArrivalContest
