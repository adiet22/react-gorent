import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import './style.css'
import useApi from '../../helpers/useApi'
import { useParams } from 'react-router-dom'

function Details() {
  const [vehicle, setVehicle] = useState([])
  const params = useParams()
  const api = useApi()

  const getVehicle = () => {
    api
      .requests({
        method: 'GET',
        url: `/vehicles`
      })
      .then((res) => {
        const { data } = res.data
        setVehicle(data)
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
      <section className="popular-in-town">
        <div className="container">
          <div className="row">
            <h2 className="title">Details</h2>
          </div>
          {vehicle.map((v, k) => {
            if (v.vehicle_id == params.id) {
              return (
                <div className="row">
                  <div className="col-lg-6">
                    <img src={v.image} alt="uihef" />
                  </div>
                  <div className="col-lg-6">
                    <p className="detail-name">{v.name}</p>
                    <p className="detail-location">{v.location}</p>
                    <p className="detail-status">{v.status}</p>
                    <p className="detail-desc">{v.description}</p>
                    <p className="detail-etc">
                      Capacity : {v.category == 'Cars' ? '4' : 2} person
                    </p>
                    <p className="detail-etc">Type : {v.category}</p>
                    <p className="detail-etc">Reservation before 2PM</p>
                  </div>
                </div>
              )
            }
          })}
          <div className="row mt-5">
            <div className="col-md-4">
              <button className="btn btn-lg btn-warning fw-bold btn-signup form-login">
                Chat Admin
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-lg btn-warning w-100 fw-bold form-login">
                Reservation
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-lg btn-warning fw-bold btn-signup form-login">
                Like
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Details
