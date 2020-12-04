import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountListSelector, fetchAccounts, fetchAccountsLoading } from "@store/reducers/accountSlice";
import Table from "antd/lib/table";
import { columns } from "@pages/AccountList/const";
import { AddressLink, Balance } from "@components/index";

export default function Accounts() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const loading = useSelector(fetchAccountsLoading)

  const dispatch = useDispatch()
  const { items: accounts, page, pageSize, total } = useSelector(accountListSelector)

  const dataSource = accounts.map(account => {
    const { address, type, balance } = account

    return {
      address: <AddressLink addr={address} truncate={false} />,
      type,
      balance: <Balance value={balance?.free} align="right"/>,
      key: address
    }
  })

  useEffect(() => {
    dispatch(fetchAccounts(tablePage - 1, tablePageSize))
  }, [dispatch, tablePage, tablePageSize])

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
