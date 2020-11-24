import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TxLink(props) {
  const { value, style } = props

  if (!value) return null

  return (
    <NavLink
      to={`/extrinsics/${value}`}
      style={style}
    >
      {value}
    </NavLink>
  )
}
