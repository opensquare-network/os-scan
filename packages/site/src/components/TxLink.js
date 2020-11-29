import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TxLink(props) {
  const { value, style, hash } = props

  if (!value) return null

  return (
    <NavLink
      to={`/extrinsics/${hash}`}
      style={style}
    >
      {value}
    </NavLink>
  )
}
