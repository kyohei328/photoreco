import { Item } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment';
import { css, keyframes } from '@emotion/react'


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

  const newContests = props.contest ? (
    props.contest.map((contest: any, index: number) => (
      <Item key={index}>
      <Item.Image size='tiny' src={imagePath}/>
      <Item.Content>
        <Item.Header as={`a`} href={`/contest/${contest.id}`} contest={contest} className='py-2'>{contest.title}</Item.Header>
        <Item.Meta>開催内容</Item.Meta>
        <Item.Description>
          <p className='indent-2'>{contest.description}</p>
        </Item.Description>
        <Item.Extra>応募期間</Item.Extra>
        <p className='indent-2 pt-2'>{moment(contest.start_date).format('YYYY年MM月D日')} 〜 {moment(contest.end_date).format('YYYY年MM月D日')}</p>
      </Item.Content>
      </Item>
    ))
  ) : (
    <p>新着のコンテストがありません</p>
  )

  return (
    <div>
      <Item.Group>
        {newContests}
      </Item.Group>
    </div>
  )
}

export default NewArrivalContest
