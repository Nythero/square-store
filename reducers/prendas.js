const prendasReducer = (state, action) => {
  switch(action.type) {
    case('set'): {
      return action.payload
    }
    default: {
      return state
    }
  }
}

module.exports = prendasReducer
