import DetailWrapper from "@components/DetailWrapper";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchBounty, bountyDetailSelector } from "@store/reducers/bountyDetailSlice";
import Breadcrumb from "@components/Breadcrumb";
import BountyDetailPanel from "@pages/BountyDetail/Panel";
import Box from "@components/Box";
import Nav from "@pages/BountyDetail/Nav";
import Hunters from "@pages/BountyDetail/Hunters";
import ObjectMissing from "@components/ObjectMissing";

export default function BountyDetail() {
  const { bountyId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (bountyId) {
      dispatch(fetchBounty(bountyId))
    }
  }, [dispatch, bountyId])

  const bounty = useSelector(bountyDetailSelector)

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/bounties', label: 'Bounties' },
        { label: 'Bounty Details' }
      ]}
    />
  )

  if (!bounty) {
    return <ObjectMissing>No Data</ObjectMissing>
  }

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
