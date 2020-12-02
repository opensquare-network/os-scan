import { useSelector } from "react-redux";
import { bountyDetailSelector, bountyContentSelector } from "@store/reducers/bountyDetailSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBountyContent } from "@store/reducers/bountyDetailSlice";
import PanelList from "@components/PanelList";
import { AddressLink } from "@components/index";
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";

const Content = styled.div`
  padding: 1em;
  background-color: #eee;
  height: auto;
  max-height: 30vh;
  overflow: auto;
`;

export default function BountyDetailPanel() {
  const dispatch = useDispatch()
  const bounty = useSelector(bountyDetailSelector)
  const content = useSelector(bountyContentSelector)
  const {
    bountyId,
    creator,
    meta: {
      V1: {
        currency_id: currency,
        payment: amount,
        title,
        digest,
      }
    },
    state: {
      state
    }
  } = bounty || {
    meta: { V1: {} },
    state: {}
  }

  useEffect(() => {
    if (digest) {
      dispatch(fetchBountyContent(digest))
    }
  }, [dispatch, digest])

  const dataSource = [
    {
      label: 'Bounty Id',
      data: bountyId
    },
    {
      label: 'Bounty State',
      data: state
    },
    {
      label: 'Bounty Owner',
      data: <AddressLink addr={creator} truncate={false} />,
    },
    {
      label: 'Currency',
      data: currency
    },
    {
      label: 'Currency',
      data: currency
    },
    {
      label: 'Amount',
      data: amount
    },
    {
      label: 'Title',
      data: title
    },
    {
      label: 'Content Digest',
      data: digest
    },
    {
      label: 'Content Detail',
      data: <Content><ReactMarkdown>{content?.content || 'No data'}</ReactMarkdown></Content>,
    }
  ]

  return (
    <PanelList dataSource={dataSource} />
  )
}
