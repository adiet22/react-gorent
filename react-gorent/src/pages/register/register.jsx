import React, { useEffect, useState } from 'react'
import style from './register.module.css'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../component/header/header'
import Footer from '../../component/footer/footer'
import { Body, Flex } from '../../component/style/Body'
import useApi from '../../helpers/useApi'
import { addUsers } from '../../store/reducer/user'

function Register() {
  const [Users, setUsers] = useState({
    email: 'username',
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

  const login = () => {
    navigate('/login')
  }

  const registerGoogle = () => {
    alert('sign-up with google successfully')
  }

  const onChangeInput = (e) => {
    e.preventDefault()
    const data = { ...Users }
    data[e.target.name] = e.target.value
    setUsers(data)
  }

  const register = () => {
    api
      .requests({
        method: 'POST',
        url: '/register',
        data: Users
      })
      .then((res) => {
        dispatch(addUsers(res.data))
        navigate('/login')
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <>
      <Header />
      <Body className={style.bgregis}>
        <Container>
          <h1>Let's Explore The World</h1>
          <Flex>
            <Form className={style.parent}>
              <Form.Group>
                <Form.Text className={style.forgot}>Have account?</Form.Text>
              </Form.Group>
              <Form.Group>
                <Button onClick={login} variant="dark" className={style.btn}>
                  Login
                </Button>{' '}
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className={style.line}>
                <Form.Group className={style.parent2} id="name" name="name">
                  <Form.Control
                    onChange={onChangeInput}
                    className={style.form}
                    type="username"
                    name="username"
                    placeholder="Username"
                  />
                </Form.Group>

                <Form.Group className={style.parent2} id="email" name="email">
                  <Form.Control
                    onChange={onChangeInput}
                    className={style.form}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group
                  className={style.parent2}
                  id="password"
                  name="password"
                >
                  <Form.Control
                    onChange={onChangeInput}
                    className={style.form}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group className={style.parent2}>
                  <Button
                    onClick={register}
                    variant="warning"
                    className={style.btn2}
                  >
                    Sign Up
                  </Button>{' '}
                </Form.Group>

                <Form.Group className={style.parent2}>
                  <Button
                    onClick={registerGoogle}
                    variant="light"
                    className={style.btn2}
                  >
                    Sign Up With Google
                  </Button>{' '}
                </Form.Group>
              </Form.Group>
            </Form>
          </Flex>
        </Container>
      </Body>
      <Footer />
    </>
  )
}

export default Register
