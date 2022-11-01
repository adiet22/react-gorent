import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function useApi(urls = '') {
  const { token } = useSelector((state) => state.users)

  const [requests, setRequests] = useState({
    baseURL: process.env.REACT_APP_BASE_URL || urls,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const setConfig = () => {
    setRequests({
      ...requests,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }

  useEffect(() => {
    setConfig()
  }, [])

  return { requests: axios.create(requests) }
}

export default useApi
