import React, { useState, useEffect } from 'react'
import style from './sorttype.module.css'
import useApi from '../../helpers/useApi'
import { Container } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import Card from '../../component/cards/cards'
import { Button } from '../../component/style/Body'

function Type() {
  const [category, setCategory] = useState([])

  const [type, setType] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  const api = useApi()

  const explore = () => {
    if (type !== '') {
      navigate(`/type/${type}`)
      window.location.reload(false)
    }
  }

  const getType = () => {
    api
      .requests({
        method: 'GET',
        url: `/vehi/searchType/?tipe=${params.type}`
      })
      .then((res) => {
        const { data } = res.data
        setCategory(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

//Hoks
  useEffect(() => {
    getType()
  }, [])

  return (
    <>
      <Header />

      <Container>
        <div className={style.container}>
          <select
            className={style.typestyle}
            value={type}
            onChange={(e) => setType(e.target.value)}
            name="type"
            id="type"
          >
            <option value="" selected disabled hidden>
              Type
            </option>
            <option value="Cars">Cars</option>
            <option value="Motor">Motorcycle</option>
            <option value="Bike">Bike</option>
          </select>

          <Button onClick={explore}>explore</Button>
        </div>
        <div className={style.container}>
          <div className="sub">
            <h2>Result</h2>
            <Link to="/vehicles">view all {'>'} </Link>
          </div>

          <div className="content">
            {category.map((v, k) => {
              return (
                <Card
                  key={k}
                  id={v.vehicle_id}
                  title={v.name}
                  image={v.image}
                  city={v.location}
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

export default Type
