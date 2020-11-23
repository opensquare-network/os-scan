import React from 'react'
import Loading from '../assets/loading.gif'
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export default function Spinner() {
  return (
    <Wrapper>
      <img src={Loading} alt="loading" />
    </Wrapper>
  )
}
