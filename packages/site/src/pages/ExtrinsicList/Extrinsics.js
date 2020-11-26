import React, { useEffect, useState } from "react";
import Table from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { extrinsicListSelector, fetchExtrinsics, fetchExtrinsicsLoading } from "@store/reducers/extrinsicSlice";
import { columns } from "@pages/ExtrinsicList/const";
import ExtrinsicLink from "@components/ExtrinsicLink";
import DateShow from "@components/DateShow";
import BlockLink from "@components/BlockLink";
import { AddressLink, ExtrinsicAction } from "@components/index";

export default function Extrinsics() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const loading = useSelector(fetchExtrinsicsLoading)

  const dispatch = useDispatch()
  const { items: extrinsics, page, pageSize, total } = useSelector(extrinsicListSelector)

  const dataSource = extrinsics.map(extrinsic => {
    const { hash, indexer, section, signer, name } = extrinsic

    return {
      hash: <ExtrinsicLink value={hash} truncate={true} />,
      index: extrinsic.indexer.index,
      timestamp: <DateShow value={indexer.blockTime} />,
      height: <BlockLink value={indexer.blockHeight} />,
      signer: <AddressLink addr={signer} truncate={true} />,
      action: <ExtrinsicAction section={section} name={name} />,
      key: hash
    }
  })

  useEffect(() => {
    dispatch(fetchExtrinsics(tablePage - 1, tablePageSize))
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
