import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import Card from '../../components/card'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Vehicles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: [],
      cars: [],
      bike: [],
      motocycle: []
    }
  }

  getVehicle = async () => {
    try {
      const { data: vehicle } = await axios.get(
        process.env.REACT_APP_BASE_URL + 'vehicles'
      )
      const { data: cars } = await axios.get(
        process.env.REACT_APP_BASE_URL + 'vehicles/?category=cars'
      )
      const { data: motocycle } = await axios.get(
        process.env.REACT_APP_BASE_URL + 'vehicles/?category=motorcycle'
      )
      const { data: bike } = await axios.get(
        process.env.REACT_APP_BASE_URL + 'vehicles/?category=bike'
      )
      this.setState({
        vehicle: vehicle.data,
        cars: cars.data,
        motocycle: motocycle.data,
        bike: bike.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getVehicle()
  }

  render() {
    return (
      <div className="App">
        <Navbar />
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
              {this.state.vehicle.map((v, k) => {
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

        <section className="popular-in-town">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h2 className="title">Cars</h2>
              </div>
              <div className="col-sm-6">
                <Link to="/vehicles/Cars" className="view-all">
                  <p className="text-end fw-bold">
                    {'View all '}
                    <b>{'>'}</b>
                  </p>
                </Link>
              </div>
            </div>

            <div className="row">
              {this.state.cars.map((v, k) => {
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
        <section className="popular-in-town">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h2 className="title">Motocycle</h2>
              </div>
              <div className="col-sm-6">
                <Link to="/vehicles/Motocycle" className="view-all">
                  <p className="text-end fw-bold">
                    {'View all '}
                    <b>{'>'}</b>
                  </p>
                </Link>
              </div>
            </div>

            <div className="row">
              {this.state.motocycle.map((v, k) => {
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
        <section className="popular-in-town">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h2 className="title">Bike</h2>
              </div>
              <div className="col-sm-6">
                <Link to="/vehicles/Bike" className="view-all">
                  <p className="text-end fw-bold">
                    {'View all '}
                    <b>{'>'}</b>
                  </p>
                </Link>
              </div>
            </div>

            <div className="row">
              {this.state.bike.map((v, k) => {
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
        <Footer />
      </div>
    )
  }
}

export default Vehicles
