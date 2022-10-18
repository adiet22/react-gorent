import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const withAuth = (Component) => {
  return (props) => {
    const { isAuth } = useSelector((state) => state.users)

    if (!isAuth) {
      return <Navigate to="/login" />
    }

    return <Component {...props} />
  }
}

export default withAuth
