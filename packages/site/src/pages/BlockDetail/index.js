import React, { useEffect } from "react";
import Breadcrumb from "@components/Breadcrumb";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { blockDetailSelector, fetchBlock, fetchBlockLoadingSelector } from "@store/reducers/blockDetailSlice";
import Panel from "@pages/BlockDetail/Panel";
import ExtrinsicsAndEvents from "@pages/BlockDetail/ExtrinsicsAndEvents";
import DetailWrapper from "@components/DetailWrapper";
import ObjectMissing from "@components/ObjectMissing";
import styled from "styled-components"
import CommonDetailLoading from "@components/CommonDetailLoading";

const EmptyDetailWrapper = styled(DetailWrapper)`
  display: flex;
  flex-flow: column;
  flex: 1;
`

export default function BlockDetail() {
  const { heightOrHash } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (heightOrHash) {
      dispatch(fetchBlock(heightOrHash))
    }
  }, [dispatch, heightOrHash])

  const loading = useSelector(fetchBlockLoadingSelector)
  const block = useSelector(blockDetailSelector)

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/blocks', label: 'Blocks' },
        { label: 'Block Details' }
      ]}
    />
  )

  if (loading) {
    return <CommonDetailLoading breadcrumb={breadcrumb} />
  }

  if (!block) {
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
      <Panel />
      <ExtrinsicsAndEvents />
    </DetailWrapper>
  )
}
