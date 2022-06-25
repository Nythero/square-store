const React = require('react')
const Servicio = require('./Servicio.jsx')

const envioGratis = {
  title: 'Envíos gratis',
  info: 'A partir de compras superiores a $100'
}

const cuotasSinInteres = {
  title: '3 y 6 cuotas sin interés',
  info: 'Pagando con tarjetas de débito y crédito'
}

const transferenciaBancaria = {
  title: '10% OFF',
  info: 'Pagando por transferencia bancaria'
}

const Servicios = () => {
  return (
    <section className='servicios d-flex justify-content-around'>
      <Servicio {...envioGratis} />
      <Servicio {...cuotasSinInteres}/>
      <Servicio {...transferenciaBancaria}/>
    </section>
  )
}

module.exports = Servicios
