import React from 'react';
import styled from "styled-components"
import { Icon } from "semantic-ui-react";

export const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  height: 48px;
  background: #FFFFFF;
  
  align-items: center;
  padding: 0 24px;
  
  & > span {
    font-size: 14px;
    color: rgba(29, 37, 60, 0.24);
  }
  
  & > div.contacts {
    & > a {
      &:not(:first-of-type) {
        margin-left: 18px;
      }
    }
  
    i {
      font-size: 18px;
      color: rgba(29, 37, 60, 0.24);
      
      &:hover {
        color: rgba(29, 37, 60, 0.64);
      }
    }
  }
`

export default function Footer() {
  return (
    <Wrapper>
      <span>© 2020 OpenSquare. All Rights Reserved.</span>
      <div className="contacts">
        <a
          href="mailto:yongfeng@opensquare.network"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name='mail' />
        </a>
        <a
          href="https://github.com/opensquare-network"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name='github' />
        </a>
        <a
          href="https://t.me/opensquare"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name='telegram plane' />
        </a>
      </div>
    </Wrapper>
  )
}
