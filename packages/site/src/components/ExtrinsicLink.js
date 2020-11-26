import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from "styled-components";
import { isHex, shortHash } from "../utils";

const Wrapper = styled(NavLink)`
  
`

export default function ExtrinsicLink({ value, truncate = false }) {
  let text = value

  if (isHex(value) && truncate) {
    text = shortHash(value, 6)
  }

  return (
    <Wrapper
      to={`/extrinsics/${value}`}
    >
      {text}
    </Wrapper>
  )
}
