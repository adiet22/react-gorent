import React from 'react'
import style from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/reducer/user'
import logo from './logo.png'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

function Header(props) {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { isAuth } = useSelector((state) => state.users)

  return (
    <>
      <Container>
        <Navbar expand="lg" className={style.nav}>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className={style.navbold}>
                {(!isAuth && pathname === '/') ||
                (!isAuth && pathname === '/vehi/') ||
                (!isAuth && pathname === '/vehi/search?name=') ? (
                  <>
                    <Link to={'/'} className={style.a}>
                      Home
                    </Link>
                    <Link to={'/vehi/'} className={style.a}>
                      Vehicle Type
                    </Link>
                    <Link to={'/histories'} className={style.a}>
                      History
                    </Link>
                    <Link to={'/about'} className={style.a}>
                      About
                    </Link>

                    <Link to={'/login'} className={style.a}>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className={style.button1}
                      >
                        Login
                      </Button>{' '}
                    </Link>
                    <Link to={'/register'} className={style.a}>
                      <Button
                        variant="warning"
                        size="sm"
                        className={style.button1}
                      >
                        Register
                      </Button>{' '}
                    </Link>
                  </>
                ) : (isAuth && pathname === '/') ||
                  (isAuth && pathname === '/vehi/')  ? (
                  <>
                    <Link to={'/'} className={style.a}>
                      Home
                    </Link>
                    <Link to={'/vehi/'} className={style.a}>
                      Vehicle Type
                    </Link>
                    <Link to={'/histories'} className={style.a}>
                      History
                    </Link>
                    <Link to={'/about'} className={style.a}>
                      About
                    </Link>
                    <Link to={'/'} className={style.a}>
                      <Button
                        onClick={() => dispatch(logout())}
                        variant="warning"
                        size="sm"
                        className={style.button1}
                      >
                        Log out
                      </Button>{' '}
                    </Link>
                  </>
                ) : null}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  )
}

export default Header
