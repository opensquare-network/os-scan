import { useSelector } from "react-redux";
import { latestExtrinsicsSelector } from "@store/reducers/latestExtrinsicSlice";
import Spinner from "@components/Spinner";
import React from "react";
import Title from "@components/Title";
import TitleCard from "@components/TitleCard";
import Table from "@pages/Home/Table";
import TimeGap from "@components/TimeGap";
import { TxLink } from "@components/index";

const header = <Title>Important Extrinsics</Title>

export default function LatestImportantExtrinsics() {
  const extrinsics = useSelector(latestExtrinsicsSelector)

  let body = (
    <tr style={{ height: 222, background: '#fff' }}>
      <td colSpan="3" style={{ verticalAlign: 'middle' }}>
        <Spinner />
      </td>
    </tr>
  )

  if (extrinsics && extrinsics.length) {
    body = extrinsics.slice(0, 6).map(({ indexer: { blockHeight, index, blockTime }, section, name }, idx) => {
      return (
        <tr key={idx}>
          <td>
            <TxLink value={`${blockHeight}-${index}`} />
          </td>
          <td>
            {`${section}(${name})`}
          </td>
          <td>
            <TimeGap timestamp={blockTime} />
          </td>
        </tr>
      )
    })
  }

  return (
    <TitleCard header={header}>
      <Table>
        <thead>
        <tr>
          <th>Extrinsic Index</th>
          <th>Operation</th>
          <th>Time</th>
        </tr>
        </thead>
        <tbody>
        {body}
        </tbody>
      </Table>
    </TitleCard>
  )
}
