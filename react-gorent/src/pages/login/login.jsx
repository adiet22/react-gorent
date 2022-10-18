import React, { useEffect, useState } from 'react'
import style from './login.module.css'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import { Body, Flex } from '../../component/style/Body'
import { useDispatch, useSelector } from 'react-redux'
import useApi from '../../helpers/useApi'
import { login } from '../../store/reducer/user'

function Login() {
  const [Users, setUsers] = useState({
    email: 'email',
    password: 'password'
  })

  const { isAuth } = useSelector((state) => state.users)
  const api = useApi()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const onChangeInput = (e) => {
    e.preventDefault()
    const data = { ...Users }
    data[e.target.name] = e.target.value
    setUsers(data)
  }

  const register = () => {
    navigate('/register')
  }

  const loginGoogle = () => {
    alert('success login with google')
  }

  const loginUser = () => {
    api
      .requests({
        method: 'POST',
        url: '/login',
        data: Users
      })
      .then((res) => {
        const { data } = res.data
        dispatch(login(data.token))
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <>
      <Header />
      <Body className={style.bglogin}>
        <Container>
          <h1>Let's Explore The World</h1>
          <Flex>
            <Row>
              <Col lg>
                <Form className={style.parent}>
                  <Form.Group>
                    <Form.Text className={style.forgot}>
                      Don't have account?
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Button
                      onClick={register}
                      variant="dark"
                      className={style.btn}
                    >
                      Sign Up
                    </Button>{' '}
                  </Form.Group>
                </Form>
              </Col>
              <Col lg>
                <Form>
                  <Form.Group className={style.line}>
                    <Form.Group className={style.parent2}>
                      <Form.Control
                        onChange={onChangeInput}
                        className={style.form}
                        type="text"
                        name="email"
                        placeholder="Email"
                      />
                    </Form.Group>

                    <Form.Group className={style.parent2}>
                      <Form.Control
                        onChange={onChangeInput}
                        className={style.form}
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </Form.Group>

                    <Form.Group className={style.parent2}>
                      <Form.Text className={style.forgot2}>
                        Forgot password?
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className={style.parent2}>
                      <Button
                        onClick={loginUser}
                        variant="warning"
                        className={style.btn2}
                      >
                        Login
                      </Button>{' '}
                    </Form.Group>

                    <Form.Group className={style.parent2}>
                      <Button
                        onClick={loginGoogle}
                        variant="light"
                        className={style.btn2}
                      >
                        Login With Google
                      </Button>{' '}
                    </Form.Group>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Flex>
        </Container>
      </Body>
      <Footer />
    </>
  )
}

export default Login
