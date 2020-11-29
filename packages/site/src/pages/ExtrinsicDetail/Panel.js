import { useSelector } from "react-redux";
import React from "react";
import PanelList from "@components/PanelList";
import { extrinsicDetailSelector } from "@store/reducers/extrinsicDetailSlice";
import DateShow from "@components/DateShow";
import PanelJson from "@components/PanelJson";

export default function Panel() {
  const extrinsic = useSelector(extrinsicDetailSelector)

  const dataSource = [
    {
      label: 'Height',
      data: extrinsic?.indexer?.blockHeight
    },
    {
      label: 'Block Time',
      data: (
        <DateShow value={extrinsic?.indexer?.blockTime} format="YYYY-MM-DD HH:mm:ss" />
      )
    },
    {
      label: 'Index',
      data: extrinsic?.indexer?.index
    },
    {
      label: 'Index',
      data: extrinsic?.indexer?.index
    },
    {
      label: 'Sender',
      data: extrinsic.signer,
    },
    {
      label: 'Section',
      data: extrinsic.section,
    },
    {
      label: 'Name',
      data: extrinsic.name,
    },
    {
      label: 'Args',
      data: <PanelJson json={extrinsic.args} />,
    },
    {
      label: 'Version',
      data: extrinsic.version,
    },
    {
      label: 'Data',
      data: extrinsic.data,
    },
  ]

  return (
    <PanelList dataSource={dataSource} />
  )
}
