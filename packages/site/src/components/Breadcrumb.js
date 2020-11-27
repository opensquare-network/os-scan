import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from "styled-components"

const Nav = styled.nav`
  font-weight: bold;
  
  & > ul {
    display: flex;
    
    & > li {
      & > a {
        color: #959595;
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
        
      }
      
      & > span.separator {
        color: #b5b5b5;
        margin: 0 12px;
      }
    
      &:last-of-type {
        a {
          color: #3f3f3f;
          opacity: 1;
          cursor: default;
          pointer-events: none;
        }
      }
    }
  }
`

export default function Breadcrumb(props) {
  const { dataSource = [] } = props

  return (
    <Nav>
      <ul>
        {dataSource.map((item, index) => {
          if (index !== dataSource.length - 1) {
            return (
              <li key={index}>
                <NavLink to={item.to}>{item.label}</NavLink>
                <span className="separator">/</span>
              </li>
            )
          }
          return (
            <li key={index}>
              <span>{item.label}</span>
            </li>
          )
        })}
      </ul>
    </Nav>
  )
}
