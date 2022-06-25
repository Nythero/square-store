const React = require('react')
const Producto = require('../components/Producto.jsx')
const { useSearchParams } = require('react-router-dom')

const suNombreIncluye = (prenda, query) => {
  const nombre = prenda.nombre
  const nombreLC = nombre.toLowerCase()
  const queryLC = query.toLowerCase()
  return nombreLC.includes(queryLC)
}

const Prendas = ({ content }) => {
  const [searchParams] = useSearchParams()
  const nombreQuery = searchParams.has('nombre')?
    searchParams.get('nombre') :
    ''
  console.log(nombreQuery)
  return (
    <section className='row g-0'>
      {
	content.map(
	  p => suNombreIncluye(p, nombreQuery)?
	    <Producto key={p.nombre} {...p} /> :
	    null
	)
      }
    </section>
  )
}

module.exports = Prendas
