import styled from "styled-components"
import React from "react";
import { useHistory } from "react-router";
import Logo from './logo.png'

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  padding: 0 24px;
  background: #4a4a4a;
  
  img {
    height: 30px;
    cursor: pointer;
  }
`;

export default function Header() {
  const history = useHistory()

  return <Wrapper>
    <img src={Logo} alt="" onClick={() => {
      history.push(`/`)
    }} />
  </Wrapper>
}

