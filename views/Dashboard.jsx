const React = require('react')
const { Navigate } = require('react-router-dom')
const AdminDashboard = require('../components/AdminDashboard.jsx')
const SupportDashboard = require('../components/SupportDashboard.jsx')

const Dashboard = ({ user }) => {
  console.log(user)
  if(!user)
    return <Navigate to='/' replace={true} />
  switch(user.type) {
    case('support'):
      return <SupportDashboard />
    case('admin'):
      return <AdminDashboard />
    default:
      return null
  }
}

module.exports = Dashboard
