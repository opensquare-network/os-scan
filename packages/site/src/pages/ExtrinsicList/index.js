import BlockChainWrapper from "@components/BlockChainWrapper";
import React from "react";
import BlockChainNav from "@components/BlockChainNav";
import Extrinsics from "@pages/ExtrinsicList/Extrinsics";

export default function ExtrinsicList() {
  return (
    <BlockChainWrapper>
      <BlockChainNav />
      <Extrinsics />
    </BlockChainWrapper>
  )
}
