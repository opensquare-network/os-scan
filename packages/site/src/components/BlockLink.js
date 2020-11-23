import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BlockLink(props) {
  const { value, hexValue, style } = props

  return (
    <NavLink
      to={`/blocks/${hexValue || value}`}
      style={style}
    >
      {value}
    </NavLink>
  )
}
