import React, { useState, useEffect } from 'react'
import style from './sortlocation.module.css'
import useApi from '../../helpers/useApi'
import { Container } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import Card from '../../component/cards/cards'
import { Body, Flex, Button } from '../../component/style/Body'

function Location() {
  const [locations, setLocation] = useState([])

  const [loc, setLoc] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  const api = useApi()

  const explore = () => {
    if (loc !== '') {
      navigate(`/location/${loc}`)
      window.location.reload(false)
    }
  }

  const getPopular = () => {
    api
      .requests({
        method: 'GET',
        url: `/vehi/popular?city=${params.location}`
      })
      .then((res) => {
        const { data } = res.data
        setLocation(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

//Hoks
  useEffect(() => {
    getPopular()
  }, [])

  return (
    <>
      <Header />

      <Container>
        <div className={style.container}>
          <select
            className={style.locstyle}
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

          <Button onClick={explore}>explore</Button>
        </div>
        <div className={style.container}>
          <div className="sub">
            <h2>Result</h2>
            <Link to="/vehi/">view all {'>'} </Link>
          </div>

          <div className="content">
            {locations.map((v, k) => {
              return (
                <Card
                  key={k}
                  id={v.vehicle_id}
                  title={v.vehicle_name}
                  image={v.status}
                  city={v.city}
                />
              )
            })}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Location
