import React from "react";
import TitleCard from "@components/TitleCard";
import Title from "@components/Title";
import { useSelector } from "react-redux";
import { latestBlocksSelector } from "@store/reducers/latestBlockSlice";
import Spinner from "@components/Spinner";
import BlockLink from "@components/BlockLink";
import TimeGap from "@components/TimeGap";
import Table from "@pages/Home/Table";
import { Icon } from "semantic-ui-react";
import HeaderWrapper from "@pages/Home/HeaderWrapper";
import { useHistory } from "react-router";

export default function LatestBlocks() {
  const blocks = useSelector(latestBlocksSelector)
  const history = useHistory()

  const header =
    <HeaderWrapper>
      <Title>Latest Blocks</Title>
      <Icon name="angle double right" onClick={() => {
        history.push('/blocks')
      }} />
    </HeaderWrapper>

  let body = (
    <tr style={{ height: 222, background: '#fff' }}>
      <td colSpan="3" style={{ verticalAlign: 'middle' }}>
        <Spinner />
      </td>
    </tr>
  )

  if (blocks && blocks.length) {
    body = blocks.slice(0, 6).map(({ extrinsicsCnt, timestamp, number }) => {
      return (
        <tr key={number}>
          <td>
            <BlockLink value={number} />
          </td>
          <td>
            {extrinsicsCnt}
          </td>
          <td>
            <TimeGap timestamp={timestamp} />
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
          <th>Block</th>
          <th>Extrinsics</th>
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
