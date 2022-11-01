import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../img/logo.png'
import { logout } from '../../store/reducer/user'
import { Link, useLocation } from 'react-router-dom'
import useApi from '../../helpers/useApi'

function Navbar(props) {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.users)
  const [user, setUser] = useState({})
  const api = useApi()

  const getUser = () => {
    api
      .requests({
        method: 'GET',
        url: '/users/profile'
      })
      .then((res) => {
        const { data } = res.data
        setUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="container">
      <header className="py-3">
        <nav className="navbar navbar-expand-lg bg-white">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto my-auto">
                <Link to="/" className="nav-link navmenu">
                  Home
                </Link>
                <Link to="/vehicles" className="nav-link navmenu">
                  Vehicle Type
                </Link>
                <a className="nav-link navmenu" href="#">
                  History
                </a>
                <a className="nav-link navmenu" href="#">
                  About
                </a>
                {isAuth ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle btnlog"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome, {user.username}
                    </button>
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <button
                        type="button"
                        className="btn btn-outline-warning rounded-3 mx-2 my-2 navbtn"
                      >
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button
                        type="button"
                        className="btn btn-warning rounded-3 mx-2 my-2 navbtn"
                      >
                        Register
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
