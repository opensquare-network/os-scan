import React from "react";
import LatestBlocks from "@pages/Home/LatestBlocks";
import styled from "styled-components"
import LatestImportantExtrinsics from "@pages/Home/LatestImportantExtrinsics";

const Wrapper = styled.div`
  margin: 24px 0;
  
  & > div {
    &:not(:first-of-type) {
      margin-top: 12px;
    }
  }
`

export default function Home() {
  return (
    <Wrapper>
      <LatestBlocks />
      <LatestImportantExtrinsics />
    </Wrapper>
  )
}
