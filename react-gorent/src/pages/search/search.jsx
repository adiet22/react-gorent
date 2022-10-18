import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import style from './search.module.css'
import useApi from '../../helpers/useApi'
// import withAuth from '../../helpers/withAuth'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import Card from '../../component/cards/cards'
import { Link } from 'react-router-dom'

function Search() {
  const [prod, setProd] = useState([])
  const params = useParams()
  const [name, setName] = useState('')

  const navigate = useNavigate()
  const api = useApi()

  const goSearch = () => {
    navigate(`/search/${name}`)
    window.location.reload(false)
  }

  const getVehicle = () => {
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

  // ComponentDidMount
  useEffect(() => {
    getVehicle()
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className={style.container}>
          <div className={style.search}>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vehicle Name"
                  />
                </Col>

                <Col>
                  <Button
                    onClick={goSearch}
                    variant="warning"
                    size="sm"
                    className={style.button1}
                  >
                    Search
                  </Button>{' '}
                </Col>
              </Row>
            </Form>
          </div>
          <div className="sub">
            <h2>Result</h2>
            <Link to="/vehicles">view all {'>'} </Link>
          </div>

          <div className="content">
            {prod.map((v, k) => {
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

export default Search
