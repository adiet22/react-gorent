import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Card from '../../components/card'
import { useParams } from 'react-router-dom'
import useApi from '../../helpers/useApi'

function TypeVehicle() {
  const [category, setCategory] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterParam, setFilterParam] = useState('')
  const params = useParams()
  const api = useApi()

  const getVehicle = () => {
    api
      .requests({
        method: 'GET',
        url:
          `${params.category}` == 'all'
            ? `/vehicles`
            : `/vehicles/?category=${params.category}`
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
    getVehicle()
  }, [])

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-6 align-self-start">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={(event) => {
                setSearchTerm(event.target.value)
              }}
            ></input>
          </div>
          <div className="col-3 align-self-end">
            <select
              className="form-select"
              onChange={(e) => {
                setFilterParam(e.target.value)
              }}
            >
              <option value="">Filter By Location</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Kalimantan">Kalimantan</option>
              <option value="Malang">Malang</option>
              <option value="South Jakarta">South Jakarta</option>
              {/* {category.map((v, k) => {
                return <option value={v.location}>{v.location}</option>
              })} */}
            </select>
          </div>
        </div>
      </div>
      <section className="popular-in-town">
        <div className="container">
          <div className="row">
            <h2 className="title">
              {params.category == 'all'
                ? 'All Vehicles'
                : 'All ' + params.category}
            </h2>
          </div>

          <div className="row">
            {category
              .filter((v) => {
                if (searchTerm == '') {
                  return v
                } else if (
                  v.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return v
                }
              })
              .filter((v) => {
                if (filterParam == '') {
                  return v
                } else if (
                  v.location.toLowerCase().includes(filterParam.toLowerCase())
                ) {
                  return v
                }
              })
              .map((v, k) => {
                return (
                  <Card
                    id={v.vehicle_id}
                    image={v.image}
                    name={v.name}
                    city={v.location}
                  />
                )
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TypeVehicle
