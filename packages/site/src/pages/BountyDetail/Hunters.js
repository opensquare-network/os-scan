import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  bountyHunterSelector,
  fetchBountyHunters,
  fetchHuntersLoadingSelector
} from "@store/reducers/bountyDetailSlice";
import Table from "antd/lib/table";
import { AddressLink } from "@components/index";
import DateShow from "@components/DateShow";

export const columns = [
  { title: 'Address', dataIndex: 'hunter' },
  { title: 'Hunt Time', dataIndex: 'huntAt' },
]

export default function Hunters() {
  const { bountyId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (bountyId) {
      dispatch(fetchBountyHunters(bountyId))
    }
  }, [dispatch, bountyId])

  const hunters = useSelector(bountyHunterSelector)
  const loading = useSelector(fetchHuntersLoadingSelector)

  const dataSource = hunters.map(hunter => ({
    hunter: <AddressLink addr={hunter.accountId} truncate={false} />,
    huntAt: <DateShow value={hunter.indexer.blockTime} />,
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
