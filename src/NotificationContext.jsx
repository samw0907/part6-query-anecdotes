import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, isVisible: true }
    case 'CLEAR_NOTIFICATION':
      return { message: '', isVisible: false }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: '',
    isVisible: false,
  })

  const setNotification = (message) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}