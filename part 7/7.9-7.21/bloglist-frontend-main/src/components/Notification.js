import React from 'react'
import { useSelector } from 'react-redux'

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === 'Wrong Credentials') {
    return <div style={error}>{notification}</div>
  }
  return <div style={success}>{notification}</div>
}

export default Notification
