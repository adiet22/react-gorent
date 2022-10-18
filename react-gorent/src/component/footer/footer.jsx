import React from 'react'
import { Container } from 'react-bootstrap'
import { Foot, Content } from '../style/footer'
import logo from './logo.png'

const Footer = () => {
  return (
    <>
      <Foot>
        <Container>
          <Content className="ms-auto">
            {' '}
            <div>
              <img
                alt=""
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
              />
              <p>
                {' '}
                <br />
                Plan and book your perfect trip with expert advice, travel tips
                for vehicle information from us
              </p>{' '}
              <br />
              <p>2022 Dho Vehicle Rental. All rights reserved</p>
            </div>
            <ul>
              {' '}
              Destinations
              <li>Bali</li>
              <li>Yogyakarta</li>
              <li>Jakarta</li>
              <li>Lombok</li>
              <li>Malang</li>
            </ul>
            <ul>
              {' '}
              Vehicle
              <li>Bike</li>
              <li>Cars</li>
              <li>Motorbike</li>
              <li>Return Times</li>
              <li>FAQs</li>
            </ul>
            <ul>
              {' '}
              Interest
              <li>Adventure</li>
              <li>Art and Culture</li>
              <li>Wildlife and Nature</li>
              <li>Family Holidays</li>
              <li>Culinary Trip</li>
            </ul>
          </Content>
        </Container>
      </Foot>
    </>
  )
}

export default Footer
