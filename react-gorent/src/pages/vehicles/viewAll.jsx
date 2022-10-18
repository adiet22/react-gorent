import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import style from './vehicle.module.css'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import Card from '../../component/cards/cards'
import { useParams } from 'react-router-dom'
import useApi from '../../helpers/useApi'

function AllVehicle() {
  const [category, setCategory] = useState([])
  const params = useParams()
  const api = useApi()

  const getAllVehicle = () => {
    api
      .requests({
        method: 'GET',
        url:
          `${params.category}` === 'popular'
            ? `/vehi/`
            : `/vehi/searchType/?tipe=${params.category}`
      })
      .then((res) => {
        const { data } = res.data
        setCategory(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllVehicle()
  }, [])

  return (
    <>
      <Header />
      <Container>
        <h1>All {params.category} </h1>
        <div className={style.container}>
          <div className="content">
            {category.map((v, k) => {
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

export default AllVehicle
