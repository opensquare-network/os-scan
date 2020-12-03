import BlockChainWrapper from "@components/BlockChainWrapper";
import React from "react";
import BlockChainNav from "@components/BlockChainNav";
import Accounts from "@pages/AccountList/Accounts";

export default function AccountList() {
  return (
    <BlockChainWrapper>
      <BlockChainNav />
      <Accounts />
    </BlockChainWrapper>
  )
}
