import BlockChainWrapper from "@components/BlockChainWrapper";
import React from "react";
import BlockChainNav from "@components/BlockChainNav";
import Events from "@pages/EventList/Events";

export default function EventList() {
  return (
    <BlockChainWrapper>
      <BlockChainNav />
      <Events />
    </BlockChainWrapper>
  )
}
