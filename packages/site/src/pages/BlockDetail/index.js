import React, { useEffect } from "react";
import Spinner from "@components/Spinner";
import Breadcrumb from "@components/Breadcrumb";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { blockDetailSelector, fetchBlock, fetchBlockLoadingSelector } from "@store/reducers/blockDetailSlice";
import Panel from "@pages/BlockDetail/Panel";
import styled from "styled-components"

const Wrapper = styled.div`
  nav {
    margin-bottom: 24px;
  }
`

export default function BlockDetail() {
  const { heightOrHash } = useParams()
  const dispatch = useDispatch()
  console.log('heightOrHash', heightOrHash)

  useEffect(() => {
    if (heightOrHash) {
      console.log('fetch')
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
    <Wrapper>
      {breadcrumb}
      <Panel />
    </Wrapper>
  )
}
