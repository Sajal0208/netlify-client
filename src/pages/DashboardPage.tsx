import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)



  return (
    <div>
    </div>
  )
}

export default DashboardPage