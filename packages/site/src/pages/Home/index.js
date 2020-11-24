import React from "react";
import LatestBlocks from "@pages/Home/LatestBlocks";
import styled from "styled-components"
import LatestImportantExtrinsics from "@pages/Home/LatestImportantExtrinsics";

const Wrapper = styled.div`
  margin: 24px 0;
`

const LatestInfo = styled.div`
  & > div {
    margin-top: 12px;
  }

  @media screen and (min-width: 930px) {
    display: flex;
    
    & > div {
      flex: 1;
      
      &:not(:first-of-type) {
        margin-left: 16px;
      }
    }
  }
`

export default function Home() {
  return (
    <Wrapper>
      <LatestInfo>
        <LatestBlocks />
        <LatestImportantExtrinsics />
      </LatestInfo>
    </Wrapper>
  )
}
