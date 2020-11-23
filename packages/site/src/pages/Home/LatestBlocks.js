import React from "react";
import TitleCard from "@components/TitleCard";
import Title from "@components/Title";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { latestBlocksSelector } from "@store/reducers/latestBlockSlice";
import Spinner from "@components/Spinner";
import BlockLink from "@components/BlockLink";
import TimeGap from "@components/TimeGap";

const header = <Title>Latest Blocks</Title>

const Table = styled.table`
  width: 100%;
  thead {
    tr {
      th {
        line-height: 1.5;
        padding: 10px;
        text-align: left;
        
        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
  
  tbody {
    tr {
      td {
        text-align: left;
        padding: 10px;
        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
`

export default function LatestBlocks() {
  const blocks = useSelector(latestBlocksSelector)

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
