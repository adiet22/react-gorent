import { React, useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Card from '../../components/card'
import star from '../../img/star.png'
import testimony from '../../img/zz.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './style.css'

function Home() {
  const [vehicle, setVehicle] = useState([])

  const getPopularVehicle = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BASE_URL + 'vehicles'
      )
      setVehicle(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPopularVehicle()
  })

  return (
    <div className="App">
      <Navbar />

      <main>
        <section className="finder">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h1 className="tagline text-white">
                  Explore and
                  <br />
                  Travel
                </h1>
                <p className="text-white subtagline">Vehicle Finder</p>
                <div className="row">
                  <div className="col-lg-6 finderopt">
                    <select
                      className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold"
                      name="location"
                      id="location"
                    >
                      <option value="" selected disabled hidden>
                        Location
                      </option>
                      <option value="jakarta">Jakarta</option>
                      <option value="tangerang">Tangerang</option>
                      <option value="bogor">Bogor</option>
                    </select>
                  </div>
                  <div className="col-lg-6 finderopt">
                    <select
                      className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold"
                      name="type"
                      id="type"
                    >
                      <option value="" selected disabled hidden>
                        Type
                      </option>
                      <option value="car">Car</option>
                      <option value="motocycle">Motocycle</option>
                      <option value="bike">Bike</option>
                    </select>
                  </div>
                  <div className="col-lg-6 finderopt">
                    <select
                      className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold"
                      name="price"
                      id="price"
                    >
                      <option value="" selected disabled hidden>
                        Price
                      </option>
                      <option value="100000">{'< 100000'}</option>
                      <option value="100000">100000 - 250000</option>
                      <option value="100000">{'> 250000'}</option>
                    </select>
                  </div>
                  <div className="col-lg-6 finderopt">
                    <select
                      className="w-100 opacity-75 px-2 py-3 rounded-3 fw-bold"
                      name="date"
                      id="date"
                    >
                      <option value="" selected disabled hidden>
                        Date
                      </option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">Oktober</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-lg btn-warning w-25 fw-bold btn-explore">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="popular-in-town">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h2 className="title">Popular in Town</h2>
              </div>
              <div className="col-sm-6">
                <Link to="/vehicles/all" className="view-all">
                  <p className="text-end fw-bold">
                    {'View all '}
                    <b>{'>'}</b>
                  </p>
                </Link>
              </div>
            </div>

            <div className="row">
              {vehicle.map((v, k) => {
                if (k < 4) {
                  return (
                    <Card
                      id={v.vehicle_id}
                      image={v.image}
                      name={v.name}
                      city={v.location}
                    />
                  )
                }
              })}
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <div className="row">
              <h2 className="title">Testimonials</h2>
              <div className="col-md-6 my-auto">
                <img className="star-rate" src={star} alt="" />
                <img className="star-rate" src={star} alt="" />
                <img className="star-rate" src={star} alt="" />
                <img className="star-rate" src={star} alt="" />
                <img className="star-rate" src={star} alt="" />
                <p className="comment">
                  ”It was the right decision to rent vehicle here, I spent less
                  money and enjoy the trip. It was an amazing experience to have
                  a ride for wildlife trip!”
                </p>
                <p className="testi-man">Edward Newgate</p>
                <p className="testi-job">Founder Circle</p>
              </div>
              <div className="col-md-6 text-center">
                <img className="rounded-4" src={testimony} alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
