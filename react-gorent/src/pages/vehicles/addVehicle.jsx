import React, { useState } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/navbar'
import { useNavigate } from 'react-router-dom'
import useApi from '../../helpers/useApi'
import './style.css'
import withAuth from '../../helpers/withAuth'

function AddVehicle() {
  const [data, setData] = useState({
    name: '',
    location: '',
    description: '',
    price: 0,
    status: '',
    stock: 0,
    category: 0,
    image: null
  })

  const navigate = useNavigate()
  const api = useApi()

  const onChangeInput = (event) => {
    event.preventDefault()

    const tmpdata = { ...data }
    tmpdata[event.target.name] = event.target.value
    setData(tmpdata)
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

  const postData = () => {
    const formData = new FormData()
    for (const key in data) {
      formData.append(`${key}`, data[key])
    }
    api
      .requests({
        method: 'POST',
        url: '/vehicles',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      })
      .then((res) => {
        console.log(res)
        navigate('/admin')
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className="App">
      <Header />
      <main>
        <section className="mt-5">
          <div className="container">
            <h2>Add Vehicle</h2>
            <div className="row">
              <div className="col">
                <input
                  className="form-control form-control-lg"
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="location"
                  type="text"
                  placeholder="Location"
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="description"
                  type="text"
                  placeholder="Description"
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="price"
                  type="number"
                  placeholder="Price"
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="status"
                  type="text"
                  placeholder="Status"
                  onChange={onChangeInput}
                  required
                ></input>
                <input
                  className="form-control form-control-lg"
                  name="stock"
                  type="number"
                  placeholder="Stock"
                  onChange={onChangeInput}
                  required
                ></input>
                <br />
                <select
                  name="category"
                  className="form-select"
                  onChange={onChangeInput}
                >
                  <option value="">Select Category</option>
                  <option value="Cars">Cars</option>
                  <option value="Motocycle">Motocycle</option>
                  <option value="Bike">Bike</option>
                </select>
                <input
                  className="form-control form-control-lg"
                  name="image"
                  type="file"
                  placeholder="Image"
                  onChange={onChangeFile}
                  required
                ></input>
                <br />
                <button
                  className="btn btn-lg btn-warning w-100 fw-bold mb-5"
                  onClick={postData}
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

export default withAuth(AddVehicle)
