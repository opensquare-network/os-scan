import BN from 'bignumber.js';
import React from "react";
import styled from "styled-components"

export default function Balance({ value, align = 'left' }) {
  if (value === null || typeof value === 'undefined') {
    return <div />
  }

  const Wrapper = styled.div`
    min-width: 100%;
    text-align: ${align};
  `

  return (
    <Wrapper>
      {new BN(value.toString()).div(1000000000).toFixed(4).toString()} OSN
    </Wrapper>
  )
}
