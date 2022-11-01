import { React, useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { FaEdit, FaTrash } from 'react-icons/fa'
import useApi from '../../helpers/useApi'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import withAuth from '../../helpers/withAuth'

function Admin() {
  const [vehicle, setVehicle] = useState([])

  const api = useApi()
  const navigate = useNavigate()

  const getPopularVehicle = () => {
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

  const deleteVehicle = (id) => {
    api
      .requests({
        method: 'DELETE',
        url: `/vehicles/` + id
      })
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getPopularVehicle()
  }, [])

  return (
    <div className="App">
      <Navbar />

      <main>
        <section className="popular-in-town">
          <div className="container">
            <div className="row">
              <h2 className="title">List Vehicle</h2>
              <Link to="/vehicles/add">
                <button
                  type="button"
                  className="btn btn-warning rounded-3 mx-2 mb-4 navbtn"
                >
                  Add Vehicle
                </button>
              </Link>
            </div>

            <div className="row">
              <div class="table-responsive">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicle.map((v, k) => {
                      return (
                        <tr>
                          <td>{k + 1}</td>
                          <td>{v.name}</td>
                          <td>{v.location}</td>
                          <td>{v.description}</td>
                          <td>{v.price}</td>
                          <td>{v.status}</td>
                          <td>{v.stock}</td>
                          <td>{v.category}</td>
                          <td>
                            <img
                              src={v.image}
                              height="100px"
                              width="100px"
                              alt="vehicle"
                            />
                          </td>
                          <td>
                            <Link to={'/vehicles/edit/' + v.vehicle_id}>
                              <button className="border-0">
                                <FaEdit />
                              </button>
                            </Link>
                            <button
                              className="border-0 text-danger"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Are you sure to delete this vehicle?'
                                  )
                                ) {
                                  deleteVehicle(v.vehicle_id)
                                }
                              }}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default withAuth(Admin)
