import styled from "styled-components";
import React, { useEffect } from "react";
import Breadcrumb from "@components/Breadcrumb";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  extrinsicDetailLoadingSelector,
  extrinsicDetailSelector,
  fetchExtrinsic
} from "@store/reducers/extrinsicDetailSlice";
import Panel from "@pages/ExtrinsicDetail/Panel";
import Events from "@pages/ExtrinsicDetail/Events";
import Box from "@components/Box";
import Nav from "@pages/ExtrinsicDetail/Nav";
import ObjectMissing from "@components/ObjectMissing";
import CommonDetailLoading from "@components/CommonDetailLoading";

const Wrapper = styled.div`
  nav {
    margin-bottom: 24px;
  }

  & > div {
    margin-top: 24px;
  }
`

const EmptyDetailWrapper = styled(Wrapper)`
  display: flex;
  flex-flow: column;
  flex: 1;
`

export default function ExtrinsicDetail() {
  const { hash } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (hash) {
      dispatch(fetchExtrinsic(hash))
    }
  }, [dispatch, hash])

  const extrinsic = useSelector(extrinsicDetailSelector)
  const loading = useSelector(extrinsicDetailLoadingSelector)

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/extrinsics', label: 'Extrinsics' },
        { label: 'Extrinsic Details' }
      ]}
    />
  )

  if (loading) {
    return <CommonDetailLoading breadcrumb={breadcrumb} />
  }

  if (!extrinsic) {
    return (
      <EmptyDetailWrapper>
        {breadcrumb}
        <ObjectMissing>No Data</ObjectMissing>
      </EmptyDetailWrapper>
    )
  }

  return (
    <Wrapper>
      {breadcrumb}
      <Panel />
      <Box>
        <Nav />
        <Events />
      </Box>
    </Wrapper>
  )
}
