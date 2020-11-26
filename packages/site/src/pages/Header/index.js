import styled from "styled-components"
import React from "react";
import { useHistory } from "react-router";
import Logo from './logo.png'
import { NavLink } from 'react-router-dom'

export const Wrapper = styled.header`
  display: flex;
  justify-content: flex-start;
  height: 60px;
  align-items: center;
  padding: 0 24px;
  background: #4a4a4a;
  margin-bottom: 16px;
  
  img {
    height: 30px;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  margin-left: 18px;
  ol {
    display: flex;
    
    li {
      padding: 0 18px;
      
      a {
        font-weight: 600;
        color: rgba(255, 255, 255, .5);
        
        &.active {
          color: rgba(255, 255, 255, .9);
        }
      }
    }
  }
`

export default function Header() {
  const history = useHistory()

  return <Wrapper>
    <img src={Logo} alt="" onClick={() => {
      history.push(`/`)
    }} />

    <Nav>
      <ol>
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            activeClassName="active"
            to="/blocks"
            isActive={(match, location) => {
              const path = location.pathname || ''
              return path.startsWith('/blocks') || path.startsWith('/extrinsics') || path.startsWith('/events')
            }}
          >
            Blockchain
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/bounties">
            Bounties
          </NavLink>
        </li>
      </ol>
    </Nav>
  </Wrapper>
}

