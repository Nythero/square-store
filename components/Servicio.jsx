const React = require('react')

const Servicio = ({ title, info }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{info}</p>
    </div>
  )
}

module.exports = Servicio
