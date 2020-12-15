import React from 'react'
import noneLogo from '../assets/ghost.svg'
import styled from 'styled-components'
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;

  section {
    text-align: center;
    margin-bottom: 14px;
  }

  img {
    width: 41px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: rgba(29, 37, 60, 0.24);
  }
`

export default function ObjectMissing(props) {
  return (
    <Wrapper className={props.className} style={props.style}>
      <section>
        <img src={noneLogo} alt="empty" />
      </section>
      <p>{props.children}</p>
      <p>
        <NavLink to="/">
          <Button primary>To Home</Button>
        </NavLink>
      </p>
    </Wrapper>
  )
}
