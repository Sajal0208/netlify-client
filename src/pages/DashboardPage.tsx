import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  console.log(user)

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}</p>
      <p>Your token: {token}</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default DashboardPage