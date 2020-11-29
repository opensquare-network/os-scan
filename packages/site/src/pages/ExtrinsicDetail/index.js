import styled from "styled-components";
import React, { useEffect } from "react";
import Breadcrumb from "@components/Breadcrumb";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchExtrinsic } from "@store/reducers/extrinsicDetailSlice";
import Panel from "@pages/ExtrinsicDetail/Panel";
import Events from "@pages/ExtrinsicDetail/Events";
import Box from "@components/Box";
import Nav from "@pages/ExtrinsicDetail/Nav";

const Wrapper = styled.div`
  nav {
    margin-bottom: 24px;
  }
  
  & > div {
    margin-top: 24px;
  }
`

export default function ExtrinsicDetail() {
  const { hash } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (hash) {
      dispatch(fetchExtrinsic(hash))
    }
  }, [dispatch, hash])

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/extrinsics', label: 'Extrinsics' },
        { label: 'Extrinsic Details' }
      ]}
    />
  )

  return (
    <Wrapper>
      {breadcrumb}
      <Panel />
      <Box>
        <Nav/>
        <Events />
      </Box>
    </Wrapper>
  )
}
