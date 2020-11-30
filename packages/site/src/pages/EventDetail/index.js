import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchEvent } from "@store/reducers/eventDetailSlice";
import Breadcrumb from "@components/Breadcrumb";
import styled from "styled-components";
import Panel from "@pages/EventDetail/Panel";

const Wrapper = styled.div`
  nav {
    margin-bottom: 24px;
  }
  
  & > div {
    margin-top: 24px;
  }
`

export default function EventDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  console.log('id', id)

  useEffect(() => {
    if (id) {
      dispatch(fetchEvent(id))
    }
  }, [dispatch, id])

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/events', label: 'Events' },
        { label: 'Event Details' }
      ]}
    />
  )

  return (
    <Wrapper>
      {breadcrumb}
      <Panel />
    </Wrapper>
  )
}
