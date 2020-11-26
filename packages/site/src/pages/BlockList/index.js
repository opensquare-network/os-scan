import React from "react";
import BlockChainWrapper from "@components/BlockChainWrapper";
import BlockChainNav from "@components/BlockChainNav";
import Blocks from "@pages/BlockList/Blocks";

export default function BlockList() {
  return (
    <BlockChainWrapper>
      <BlockChainNav />
      <Blocks />
    </BlockChainWrapper>
  )
}
