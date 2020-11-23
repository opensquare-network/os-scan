import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Wrapper = styled(Card)`
  & > header {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 16px;
    border-bottom: 1px solid #dedede;
  }
`

export default function TitleCard({ className, header, children }) {
  return (
    <Wrapper className={className}>
      <header>
        {header}
      </header>
      <main>
        {children}
      </main>
    </Wrapper>
  )
}
