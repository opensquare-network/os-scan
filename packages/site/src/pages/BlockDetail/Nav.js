import React from "react";
import styled from "styled-components";
import { useLocation, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
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

export default function Nav() {
  let { url } = useRouteMatch();
  const { pathname } = useLocation()
  const isExtrinsic = (pathname || '').endsWith('/extrinsics')

  return (
    <Wrapper>
      <ul>
        <li className={isExtrinsic ? 'is-active' : ''}>
          <NavLink exact activeClassName="active" to={`${url}/extrinsics`}>
            Extrinsics
          </NavLink>
        </li>
        <li className={!isExtrinsic ? 'is-active' : ''}>
          <NavLink exact activeClassName="active" to={`${url}/events`}>
            Events
          </NavLink>
        </li>
      </ul>
    </Wrapper>
  )
}
