import React, { useState, useEffect } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/navbar'
import useApi from '../../helpers/useApi'
import './style.css'
import withAuth from '../../helpers/withAuth'
import { useParams, useNavigate } from 'react-router-dom'

function EditVehicle() {
  const params = useParams()
  const [vehicle, setVehicle] = useState({})
  const [data, setData] = useState({})

  const navigate = useNavigate()
  const api = useApi()

  const onChangeInput = (event) => {
    event.preventDefault()

    const tmpdata = { ...data }
    tmpdata[event.target.name] = event.target.value
    setData(tmpdata)
    console.log(data)
  }

  const onChangeFile = (event) => {
    event.preventDefault()

    const file = event.target.files[0]
    if (file) {
      const tmpdata = { ...data }
      tmpdata['image'] = file
      setData(tmpdata)
    }
  }

  const updateData = () => {
    api
      .requests({
        method: 'PUT',
        url: '/vehicles/' + params.id,
        data: data
      })
      .then((res) => {
        console.log(res)
        navigate('/admin')
      })
      .catch((err) => {
        alert(err)
      })
  }

  const getVehicle = () => {
    api
      .requests({
        method: 'GET',
        url: `/vehicles`
      })
      .then((res) => {
        const { data } = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].vehicle_id == params.id) {
            setVehicle(data[i])
          }
        }
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
      <Header />
      <main>
        <section className="mt-5">
          <div className="container">
            <h2>Edit Vehicle</h2>
            <div className="row">
              <div className="col">
                <input
                  className="form-control form-control-lg"
                  name="name"
                  type="text"
                  defaultValue={vehicle.name}
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="location"
                  type="text"
                  defaultValue={vehicle.location}
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="description"
                  type="text"
                  defaultValue={vehicle.description}
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="price"
                  type="number"
                  defaultValue={vehicle.price}
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="status"
                  type="text"
                  defaultValue={vehicle.status}
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="stock"
                  type="text"
                  defaultValue={vehicle.stock}
                  onChange={onChangeInput}
                  required
                ></input>
                <br />
                <select
                  name="category"
                  className="form-select"
                  defaultValue={vehicle.category}
                  onChange={onChangeInput}
                >
                  <option value="" selected disabled hidden>
                    {vehicle.category}
                  </option>
                  <option value="Cars">Cars</option>
                  <option value="Motocycle">Motocycle</option>
                  <option value="Bike">Bike</option>
                </select>
                <br />
                <button
                  className="btn btn-lg btn-warning w-100 fw-bold mb-5"
                  onClick={updateData}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default withAuth(EditVehicle)
