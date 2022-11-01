import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <div className="col-lg-3 col-md-6">
      <Link to={'/vehicles/details/' + props.id} className="link-card">
        <div className="card card-popular">
          <img src={props.image} class="card-img-top" alt="..."></img>
        </div>
        <div className="card-content">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.city}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card
