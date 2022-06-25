const React = require('react')

const Servicio = ({ title, info }) => {
  return (
    <div>
      <h3 className='mt-3 text-light'>{title}</h3>
      <p className='text-light'>{info}</p>
    </div>
  )
}

module.exports = Servicio
