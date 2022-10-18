import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../style/Card'

function Cards(props) {
  return (
    <Card key={props.id} bg={props.image} backdrop={props.backdrop}>
      <div>
        <Link to={'/detail/' + props.title} className="LinkStyle">
          <h4>{props.title}</h4>
          <p>{props.city}</p>
        </Link>
      </div>
    </Card>
  )
}

export default Cards
