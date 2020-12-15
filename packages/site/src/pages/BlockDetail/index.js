import React, { useEffect } from "react";
import Spinner from "@components/Spinner";
import Breadcrumb from "@components/Breadcrumb";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlock, fetchBlockLoadingSelector, blockDetailSelector } from "@store/reducers/blockDetailSlice";
import Panel from "@pages/BlockDetail/Panel";
import ExtrinsicsAndEvents from "@pages/BlockDetail/ExtrinsicsAndEvents";
import DetailWrapper from "@components/DetailWrapper";
import ObjectMissing from "@components/ObjectMissing";

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
    return (
      <>
        {breadcrumb}
        <div style={{ padding: '10%' }}>
          <Spinner />
        </div>
      </>
    )
  }

  if (!block) {
    return <ObjectMissing>No Data</ObjectMissing>
  }

  return (
    <DetailWrapper>
      {breadcrumb}
      <Panel />
      <ExtrinsicsAndEvents />
    </DetailWrapper>
  )
}
