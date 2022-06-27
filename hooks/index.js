const { useState } = require('react')

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => setValue(event.target.value)

  const reset = () => setValue('')

  return [
    {
      value,
      onChange,
      type
    },
    reset
  ]
}

module.exports = {
  useField
}
