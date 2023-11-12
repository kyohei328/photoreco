import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import axios from 'axios';
import { Image, Item } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../assets/top.css'

const NewArrivalContest = (props) => {
   console.log(props)
  const newContests = props.contest.map(contest => (
    <Item key={contest.id}>
    <Item.Image size='tiny' src="https://photospace-image.s3.ap-northeast-1.amazonaws.com/rbkrutko9gmw25bogswl8x0vtul1"/>
    <Item.Content>
      <Item.Header as='a'>{contest.title}</Item.Header>
      <Item.Meta>開催内容</Item.Meta>
      <Item.Description>
        <p>{contest.description}</p>
      </Item.Description>
      <Item.Extra>応募期間</Item.Extra>
      <p>{contest.start_date} 〜 {contest.end_date}</p>
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
