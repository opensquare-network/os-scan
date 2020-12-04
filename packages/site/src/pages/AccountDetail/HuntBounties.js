import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { huntBountiesSelector, fetchHuntBounties, fetchHuntBountiesLoadingSelector } from "@store/reducers/accountDetailSlice";
import Table from "antd/lib/table";
import { AddressLink, BountyLink } from "@components/index";
import DateShow from "@components/DateShow";

export const columns = [
  { title: 'Bounty Id', dataIndex: 'bountyId' },
  { title: 'Owner', dataIndex: 'owner' },
  { title: 'Currency', dataIndex: 'currency' },
  { title: 'Title', dataIndex: 'title', },
  { title: 'State', dataIndex: 'state', },
  { title: 'Hunt Time', dataIndex: 'timestamp', },
]

export default function HuntBounties() {
  const { address } = useParams()
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const dispatch = useDispatch()

  useEffect(() => {
    if (address) {
      dispatch(fetchHuntBounties(address, tablePage - 1, tablePageSize))
    }
  }, [dispatch, address, tablePage, tablePageSize])

  const { items: bounties, page, pageSize, total } = useSelector(huntBountiesSelector)
  const loading = useSelector(fetchHuntBountiesLoadingSelector)

  const dataSource = (bounties || []).map(bounty => {
    const {
      bountyId,
      meta: { V1: { owner, currency_id: currencyId, title }, },
      state: { state },
      hunter: { indexer: { blockTime } },
    } = bounty
    return {
      bountyId: <BountyLink value={bountyId} truncate={true} />,
      owner: <AddressLink addr={owner} truncate={true} allowLinkToSelf={false} />,
      currency: currencyId,
      title,
      state,
      timestamp: <DateShow value={blockTime} />,
      key: bountyId
    }
  })

  return (
    <Table
      loading={loading}
      onChange={({ current, pageSize: size }) => {
        setTablePage(current)
        setTablePageSize(size)
      }}
      pagination={{ current: page + 1, pageSize, total }}
      size="small"
      columns={columns}
      dataSource={dataSource}
    />
  )
}
