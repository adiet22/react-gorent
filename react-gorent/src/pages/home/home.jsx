import React, { useState, useEffect } from 'react'
import style from './home.module.css'
import useApi from '../../helpers/useApi'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import Card from '../../component/cards/cards'
import { Body, Flex, Button } from '../../component/style/Body'

function Home() {
  const [prod, setProd] = useState([])
  const [loc, setLoc] = useState('')
  const [type, setType] = useState('')

  const navigate = useNavigate()
  const api = useApi()

  const explore = () => {
    if (loc !== '') {
      navigate(`/location/${loc}`)
    }

    if (type !== '') {
      navigate(`/type/${type}`)
    }
  }

  const getPopularVehicle = async () => {
    api
      .requests({
        method: 'GET',
        url: '/vehi/'
      })
      .then((res) => {
        const { data } = res.data
        setProd(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Component DidMount
  useEffect(() => {
    getPopularVehicle()
  }, [])

  return (
    <>
      <Header />
      <Body className={style.bghome}>
        <Container>
          <h1>Explore and Travel</h1>
          <p>Vehicle Finder</p>
          <Flex>
            <select
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              name="location"
              id="location"
            >
              <option value="" selected disabled hidden>
                Location
              </option>
              <option value="Bali">Bali</option>
              <option value="Lombok">Lombok</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Malang">Malang</option>
              <option value="Jakarta">Jakarta</option>
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="cars"
              id="cars"
            >
              <option value="" selected disabled hidden>
                Type
              </option>
              <option value="Cars">Cars</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Bike">Bike</option>
            </select>
          </Flex>

          <Flex>
       
          </Flex>
          <Button onClick={explore}>explore</Button>
        </Container>
      </Body>
      <Container>
        <div className={style.container}>
          <div className="sub">
            <h2>popular</h2>
            <Link to="/vehi/">view all {'>'} </Link>
          </div>

          <div className="content">
            {prod.map((v, k) => {
              if (k < 4) {
                return (
                  <Card
                    key={k}
                    id={v.vehicle_id}
                    title={v.vehicle_name}
                    image={v.status}
                    city={v.city}
                  />
                )
              }
            })}
          </div>

          <div className={style.sub}>
            <h2>testimonials</h2>
          </div>

          <div className="testimoni">
            <div>
              "it was the right decision to rent vehicle here, I spent less
              money and enjoy the trip. It was an amazing experience to have a
              ride for wildlife trip!"            
            </div>

          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Home
