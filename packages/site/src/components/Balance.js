import React from "react";
import styled from "styled-components"
import toPrecision from "../utils/toPrecision";
import { osnPrecision } from "../utils/constants";

const Wrapper = styled.div`
  min-width: 100%;
  text-align: ${p => p.align};
`

export default function Balance({ value, align = 'left' }) {
  if (value === null || typeof value === 'undefined') {
    return <div />
  }

  return (
    <Wrapper align={align}>
      {toPrecision(value, osnPrecision, osnPrecision)} OSN
    </Wrapper>
  )
}
