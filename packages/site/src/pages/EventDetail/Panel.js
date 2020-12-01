import { useSelector } from "react-redux";
import React from "react";
import PanelList from "@components/PanelList";
import DateShow from "@components/DateShow";
import PanelJson from "@components/PanelJson";
import { eventDetailSelector } from "@store/reducers/eventDetailSlice";

export default function Panel() {
  const event = useSelector(eventDetailSelector)
  console.log('event', event)

  const dataSource = [
    {
      label: 'Height',
      data: event?.indexer?.blockHeight
    },
    {
      label: 'Block Time',
      data: (
        <DateShow value={event?.indexer?.blockTime} format="YYYY-MM-DD HH:mm:ss" />
      )
    },
    {
      label: 'Extrinsic Hash',
      data: event?.extrinsicHash
    },
    {
      label: 'Index',
      data: event?.index
    },
    {
      label: 'Section',
      data: event?.section,
    },
    {
      label: 'Method',
      data: event?.method,
    },
    {
      label: 'Meta',
      data: <PanelJson json={event?.meta} />,
    },
    {
      label: 'Data',
      data: <PanelJson json={event?.data} />,
    },
    {
      label: 'Topics',
      data: <PanelJson json={event?.topics} />,
    },
  ]

  return (
    <PanelList dataSource={dataSource} />
  )
}
