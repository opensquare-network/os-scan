import React, { useEffect } from "react";
import Spinner from "@components/Spinner";
import Breadcrumb from "@components/Breadcrumb";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { blockDetailSelector, fetchBlock, fetchBlockLoadingSelector } from "@store/reducers/blockDetailSlice";

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
  console.log('block', block)

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

  return (
    <div>
      {breadcrumb}
    </div>
  )
}
