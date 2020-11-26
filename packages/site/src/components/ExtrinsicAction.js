import React from 'react'

export default function ExtrinsicAction({ section, name }) {
  return (
    <span>{`${section}${name ? `(${name})` : ''}`}</span>
  )
}
