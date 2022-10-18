import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function useApi(urls = '') {
  const { token } = useSelector((state) => state.users)

  const [requests, setRequests] = useState({
    baseURL: 'https://gorent-api.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.token}`
    }
  })

  const setConfig = () => {
    setRequests({
      ...requests,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.token}`
      }
    })
  }

  useEffect(() => {
    setConfig()
  }, [])

  return { requests: axios.create(requests) }
}

export default useApi
