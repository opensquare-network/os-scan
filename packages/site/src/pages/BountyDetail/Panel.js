import { useSelector } from "react-redux";
import { bountyDetailSelector } from "@store/reducers/bountyDetailSlice";
import React from "react";
import PanelList from "@components/PanelList";
import { AddressLink } from "@components/index";

export default function BountyDetailPanel() {
  const bounty = useSelector(bountyDetailSelector)
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
  } = bounty

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
  ]

  return (
    <PanelList dataSource={dataSource} />
  )
}
