import React from "react";
import LatestBlocks from "@pages/Home/LatestBlocks";
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 24px 0;
`

export default function Home() {
  return (
    <Wrapper>
      <LatestBlocks />
    </Wrapper>
  )
}
