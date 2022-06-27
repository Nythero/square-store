const React = require('react')

const InputField = (props) => {
  const { name } = props
  return (
    <React.Fragment>
      <label className='form-label' htmlFor={name}>{name}</label>
      <input className='form-control w-25' id={name} {...props} name={name}></input>
    </React.Fragment>
  )
}

module.exports = InputField
