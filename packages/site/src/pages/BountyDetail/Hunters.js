import { useSelector } from "react-redux";
import React from "react";
import {
  bountyDetailSelector,
  fetchBountyDetailLoadingSelector,
} from "@store/reducers/bountyDetailSlice";
import Table from "antd/lib/table";
import { AddressLink } from "@components/index";
import DateShow from "@components/DateShow";

export const columns = [
  { title: 'Address', dataIndex: 'hunter' },
  { title: 'Hunt Time', dataIndex: 'huntAt' },
  { title: 'Assignee', dataIndex: 'assignee' },
]

export default function Hunters() {
  const bounty = useSelector(bountyDetailSelector)
  const loading = useSelector(fetchBountyDetailLoadingSelector)

  const dataSource = (bounty?.hunters?.hunters || []).map(hunter => ({
    hunter: <AddressLink addr={hunter.accountId} truncate={false} />,
    huntAt: <DateShow value={hunter.indexer.blockTime} />,
    assignee: (hunter.accountId === bounty?.hunters?.assignee?.accountId ? 'Yes' : 'No'),
    key: hunter.accountId
  }))

  return (
    <Table
      loading={loading}
      size="small"
      columns={columns}
      dataSource={dataSource}
    />
  )
}
