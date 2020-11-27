import React from 'react'
import styled from "styled-components"

const Wrapper = styled.section`
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  font-size: 1rem;
  background-color: #fff;
  
  ul {
    li {
      display: flex;
      border-bottom: 1px solid #ededed;
      padding: 0.85em 1em;
      
      & > label {
        width: 25%;
        font-size: 12px;
        color: #3f3f3f;
        display: inline-flex;
        align-items: center;
      }
      
      & > div {
        word-break: break-all;
        width: 75%;
        font-size: 12px;
        color: #959595;
      }
    }
  }
`

export default function PanelList(props) {
  const { dataSource = [] } = props
  return (
    <Wrapper>
      <ul>
        {dataSource.map((item, index) => (
          <li key={index}>
            <label>{item.label}</label>
            <div>{item.data}</div>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}
