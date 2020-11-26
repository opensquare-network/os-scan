import React from 'react'
import { NavLink } from 'react-router-dom'

export default function EventLink({ id }) {
  return (
    <NavLink to={`/events/${id}`}>
      {id}
    </NavLink>
  )
}
