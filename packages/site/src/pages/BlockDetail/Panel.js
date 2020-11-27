import { useSelector } from "react-redux";
import { blockDetailSelector } from "@store/reducers/blockDetailSlice";
import BlockLink from "@components/BlockLink";
import React from "react";
import PanelList from "@components/PanelList";
import DateShow from "@components/DateShow";

export default function Panel() {
  const block = useSelector(blockDetailSelector)

  const dataSource = [
    {
      label: 'Height',
      data: block?.header?.number
    },
    {
      label: 'Block Hash',
      data: block?.hash
    },
    {
      label: 'Parent Hash',
      data: <BlockLink value={block?.header?.parentHash} />
    },
    {
      label: 'State Root',
      data: block?.header?.stateRoot
    },
    {
      label: 'Extrinsic Root',
      data: block?.header?.extrinsicsRoot
    },
    {
      label: 'Block Time',
      data: (
        <DateShow value={block?.blockTime} format="YYYY-MM-DD HH:mm:ss" />
      )
    },
    {
      label: 'Block Digest',
      data: (
        <pre style={{
          textAlign: 'left',
          margin: 0,
          padding: 0,
          background: '#FFF',
          color: 'rgb(149, 149, 149)',
          overflowX: 'overlay',
        }}>
          {JSON.stringify(block?.header?.digest, null, 2)}
        </pre>
      )
    }

  ]

  return (
    <PanelList dataSource={dataSource} />
  )
}
