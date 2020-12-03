import React from "react";
import Box from "@components/Box";
import Nav from "@pages/AccountDetail/Nav";
import { useLocation } from "react-router";
import Extrinsics from "@pages/AccountDetail/Extrinsics";
import FundBounties from "@pages/AccountDetail/FundBounties";
import HuntBounties from "@pages/AccountDetail/HuntBounties";

export default function ExtrinsicsAndEvents() {
  const { pathname } = useLocation()
  const isFundBounties = (pathname || '').endsWith('/fundbounties')
  const isHuntBounties = (pathname || '').endsWith('/huntbounties')
  const isExtrinsics = !(isFundBounties || isHuntBounties)


  return (
    <Box>
      <Nav />
      { isExtrinsics && <Extrinsics /> }
      { isFundBounties && <FundBounties /> }
      { isHuntBounties && <HuntBounties /> }
    </Box>
  )
}
