import DetailWrapper from "@components/DetailWrapper";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchBounty } from "@store/reducers/bountyDetailSlice";
import Breadcrumb from "@components/Breadcrumb";
import BountyDetailPanel from "@pages/BountyDetail/Panel";
import Box from "@components/Box";
import Nav from "@pages/BountyDetail/Nav";
import Hunters from "@pages/BountyDetail/Hunters";

export default function BountyDetail() {
  const { bountyId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (bountyId) {
      dispatch(fetchBounty(bountyId))
    }
  }, [dispatch, bountyId])

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/bounties', label: 'Bounties' },
        { label: 'Bounty Details' }
      ]}
    />
  )

  return (
    <DetailWrapper>
      {breadcrumb}
      <BountyDetailPanel />
      <Box>
        <Nav />
        <Hunters />
      </Box>
    </DetailWrapper>
  )
}
