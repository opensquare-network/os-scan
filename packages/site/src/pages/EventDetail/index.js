import { useParams } from "react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent, eventDetailSelector } from "@store/reducers/eventDetailSlice";
import Breadcrumb from "@components/Breadcrumb";
import styled from "styled-components";
import Panel from "@pages/EventDetail/Panel";
import ObjectMissing from "@components/ObjectMissing";

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


export default function EventDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  console.log('id', id)

  useEffect(() => {
    if (id) {
      dispatch(fetchEvent(id))
    }
  }, [dispatch, id])

  const event = useSelector(eventDetailSelector)

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/events', label: 'Events' },
        { label: 'Event Details' }
      ]}
    />
  )

  if (!event) {
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
    </Wrapper>
  )
}
