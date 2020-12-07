import React from "react";
import styled from "styled-components"
import toPrecision from "../utils/toPrecision";
import { osnPrecision } from "../utils/constants";

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
      {toPrecision(value, osnPrecision, osnPrecision)} OSN
    </Wrapper>
  )
}
