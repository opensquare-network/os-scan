import DetailWrapper from "@components/DetailWrapper";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchBounty, bountyDetailSelector, fetchBountyDetailLoadingSelector } from "@store/reducers/bountyDetailSlice";
import Breadcrumb from "@components/Breadcrumb";
import BountyDetailPanel from "@pages/BountyDetail/Panel";
import Box from "@components/Box";
import Nav from "@pages/BountyDetail/Nav";
import Hunters from "@pages/BountyDetail/Hunters";
import ObjectMissing from "@components/ObjectMissing";
import styled from "styled-components"
import Spinner from "@components/Spinner";

const EmptyDetailWrapper = styled(DetailWrapper)`
  display: flex;
  flex-flow: column;
  flex: 1;
`

export default function BountyDetail() {
  const { bountyId } = useParams()
  const dispatch = useDispatch()
  const loading = useSelector(fetchBountyDetailLoadingSelector)
  const bounty = useSelector(bountyDetailSelector)

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

  if (loading) {
    return (
      <>
        {breadcrumb}
        <div style={{ padding: '10%' }}>
          <Spinner />
        </div>
      </>
    )
  }

  if (!bounty) {
    return (
      <EmptyDetailWrapper>
        {breadcrumb}
        <ObjectMissing>No Data</ObjectMissing>
      </EmptyDetailWrapper>
    )
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
