const React = require('react')
const {
  Routes, Route
} = require('react-router-dom')
const useReducer = React.useReducer 

const initialState = 0

const countReducer = (state, action) => {
  switch(action.type) {
    case 'increment': {
      return state + 1
    }
    case 'decrement': {
      return state - 1
    }
    default: {
      return state
    }
  }
}

const Component = (props) => {
  const [state, dispatch] = useReducer(countReducer, initialState)
  const increment = () => dispatch({ type: 'increment' })
  const decrement = () => dispatch({ type: 'decrement' })
  return (
    <html id='root'>
      <head>
        <title>{props.title}</title>
      </head>
      <body>
	    <div>
              <h1>Hello World!</h1>
              <p>{state}</p>
              <button onClick={increment}>Increment</button>
              <button onClick={decrement}>Decrement</button>
	    </div>
        <script dangerouslySetInnerHTML={{
	  __html: 'window.PROPS=' + JSON.stringify(props)
	}}/>
        <script src='/public/bundle.js' />
      </body>
    </html>
  )
}

module.exports = Component
