const React = require('react')
const { Navigate } = require('react-router-dom')

const Dashboard = ({ user }) => {
  return (
    <div>
      {!user && <Navigate to='/' replace={true} />}
    </div>
  )
}

module.exports = Dashboard
