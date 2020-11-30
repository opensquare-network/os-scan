import BlockChainWrapper from "@components/BlockChainWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bountyListSelector, fetchBounties, fetchBountiesLoadingSelector } from "@store/reducers/bountySlice";
import Table from "antd/lib/table";
import { columns } from "@pages/BountyList/columns";
import { AddressLink, BountyLink } from "@components/index";

export default function Bounties() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBounties(tablePage - 1, tablePageSize))
  }, [dispatch, tablePage, tablePageSize])

  const { items: bounties, page, pageSize, total } = useSelector(bountyListSelector)
  const loading = useSelector(fetchBountiesLoadingSelector)

  const dataSource = bounties.map(bounty => {
    const {
      bountyId,
      meta: { V1: { owner, currency_id: currencyId, title }, },
      state: { state },
    } = bounty
    return {
      bountyId: <BountyLink value={bountyId} truncate={true} />,
      owner: <AddressLink addr={owner} truncate={true} />,
      currency: currencyId,
      title,
      state,
      key: bountyId
    }
  })

  return (
    <BlockChainWrapper>
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

    </BlockChainWrapper>
  )
}
