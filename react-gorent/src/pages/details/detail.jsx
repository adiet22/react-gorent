import React, { useState, useEffect } from 'react'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useApi from '../../helpers/useApi'
import style from './detail.module.css'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'

function Details() {
  const [prod, setProd] = useState([])
  const [co, setCo] = useState([])
  const [vehicle, setVehicle] = useState({
    quantity: 0
  })

  const params = useParams()
  const api = useApi()

  const notice = () => {
    alert('')
  }

  const calcPlus = () => {
    const data = { ...vehicle }
    vehicle.quantity += 1
    data.quantity = vehicle.quantity
    setVehicle(data)
  }

  const calcMin = () => {
    const data = { ...vehicle }
    if (vehicle.quantity === 0) {
      data.quantity = vehicle.quantity
      setVehicle(data)
    } else {
      vehicle.quantity -= 1
      data.quantity = vehicle.quantity
      setVehicle(data)
    }
  }

  const getVehicleName = () => {
    api
      .requests({
        method: 'GET',
        url: `/vehi/search?name=${params.name}`
      })
      .then((res) => {
        const { data } = res.data
        setProd(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const checkout = () => {
    const amount = vehicle.quantity
    let body = 0
    prod.map((v,k)=> {
      body = v.vehicle_id
    })
    const dataTemp = (amount, body)
    api
      .requests({
        method: 'POST',
        url: `/checkout/`,
        data: dataTemp
      })
      .then((res) => {
        const { data } = res.data
        setCo(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getVehicleName()
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="sub">
          <h2>Detail</h2>
        </div>

        <div className={style.content}>
          {prod.map((v, k) => {
            if (v.vehicle_name === params.name) {
              return (
                <>
                  <img src={v.status} alt={v.vehicle_name} className={style.image} />
                  <div className={style.rightside}>
                    <h4>{v.vehicle_name}</h4>
                    <h5>{v.city}</h5>

                    <div className={style.status}>
                      <p className={style.ava}>Availabel</p>
                    </div>

                    <div className={style.desc}>
                      <p>Capacity : {v.capacity}</p>
                      <p>Type : {v.type}</p>
                      <p>Description : {v.description} </p>
                      <p>Popular : {v.popular} </p>
                    </div>

                    <p className={style.price}>Rp. {v.price}/day</p>
                  </div>
                  <Row xs={1} md={2}>
                    {Array.from({ length: 2 }).map(() => (
                      <Col>
                        <Card>
                          <Card.Img
                            className={style.dispimage}
                            variant="top"
                            src={v.image}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <div className={style.stock}>
                    <Button
                      onClick={calcMin}
                      variant="outline"
                      size="sm"
                      className={style.button1}
                    >
                      -
                    </Button>{' '}
                    <h3>{vehicle.quantity}</h3>
                    <Button
                      onClick={calcPlus}
                      variant="warning"
                      size="sm"
                      className={style.button1}
                    >
                      +
                    </Button>{' '}
                  </div>
                </>
              )
            }
          })}

          <div className={style.newdiv}>
            <Button
              onClick={notice}
              variant="dark"
              size="sm"
              className={style.btn1}
            >
              Chat Admin
            </Button>{' '}
            <Button
              onClick={checkout}
              variant="warning"
              size="sm"
              className={style.btn2}
            >
              Reservation
            </Button>{' '}
            <Button
              onClick={notice}
              variant="dark"
              size="sm"
              className={style.btn3}
            >
              Like
            </Button>{' '}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Details
