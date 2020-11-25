import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from "styled-components"
import { useLocation } from "react-router";

const Wrapper = styled.div`
  margin-bottom: 1rem;
  ul {
    display: flex;
    border-bottom: 1px solid #dbdbdb;
    li {
      a {
        margin: 8px 16px 0;
        display: inline-flex;
        padding-bottom: 10px;
        color: #959595;
        border-bottom-width: 3px;
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
      }
      
      &.is-active {
        a {
          border-bottom-style: solid;
          border-bottom-color: #3f3f3f;
          color: #3f3f3f;
          opacity: 1;
        }
      }
    }
  }
`

export default function BlockChainNav() {
  const { pathname } = useLocation() || {}
  console.log('pathname', pathname)

  return (
    <Wrapper>
      <ul>
        <li className={pathname === '/blocks' ? 'is-active' : ''}>
          <NavLink to="/blocks">Blocks</NavLink>
        </li>
        <li className={pathname === '/extrinsics' ? 'is-active' : ''}>
          <NavLink to="/extrinsics">Extrinsics</NavLink>
        </li>
        <li className={pathname === '/events' ? 'is-active' : ''}>
          <NavLink to="/events">Events</NavLink>
        </li>
      </ul>
    </Wrapper>
  )
}
