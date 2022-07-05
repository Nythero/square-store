const React = require('react')
const { useNavigate } = require('react-router-dom')

const SearchBar = () => {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    const prenda = event.target.prenda.value
    event.preventDefault()
    navigate(`/prendas?nombre=${prenda}`)
  }
  return (
    <form 
      className='d-flex my-0 px-3'
      onSubmit={handleSubmit} >
      <input 
        name='prenda'
        className='form-control'
        type='search'
        placeholder='¿Qué estás buscando?' />
      <button className='btn' type='submit'>Buscar</button>
    </form>
  )
}

module.exports = SearchBar
