let timeout

const showNotification = (dispatch, notificacion) => {
  dispatch({ type: 'show-notification', payload: notificacion })
  clearTimeout(timeout)
  timeout = setTimeout(
    () => dispatch({ type: 'hide-notification' }),
    5000
  )
}

module.exports = showNotification
