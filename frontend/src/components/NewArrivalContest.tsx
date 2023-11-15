import { Item } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../assets/top.css'
import moment from 'moment';

const NewArrivalContest = (props: any) => {
   console.log(props)

  const newContests = props.contest.map((contest: any) => (

    <Item key={contest.id}>
    <Item.Image size='tiny' src="https://photospace-image.s3.ap-northeast-1.amazonaws.com/rbkrutko9gmw25bogswl8x0vtul1"/>
    <Item.Content>
      <Item.Header as={`a`} href={`/contest/${contest.id}`} contest={contest}>{contest.title}</Item.Header>
      <Item.Meta>開催内容</Item.Meta>
      <Item.Description>
        <p>{contest.description}</p>
      </Item.Description>
      <Item.Extra>応募期間</Item.Extra>
      <p>{moment(contest.start_date).format('YYYY年MM月D日')} 〜 {moment(contest.end_date).format('YYYY年MM月D日')}</p>
    </Item.Content>
  </Item>
  ))

  return (
    <div>
      <Item.Group>
        {newContests}
      </Item.Group>
    </div>
  )
}

export default NewArrivalContest
