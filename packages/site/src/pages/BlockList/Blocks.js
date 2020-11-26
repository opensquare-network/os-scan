import React, { useEffect, useState } from "react";
import Table from "antd/lib/table";
import { useDispatch, useSelector } from "react-redux";
import { blockListSelector, fetchBlocks, fetchBlocksLoading } from "@store/reducers/blockSlice";
import BlockLink from "@components/BlockLink";
import { columns } from "@pages/BlockList/const";
import DateShow from "@components/DateShow";

export default function Blocks() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const loading = useSelector(fetchBlocksLoading)

  const dispatch = useDispatch()
  const { items: blocks, page, pageSize, total } = useSelector(blockListSelector)

  const dataSource = blocks.map(block => {
    return {
      height: <BlockLink value={block.header.number} />,
      hash: (
        <BlockLink
          style={{ width: 138 }}
          truncate={true}
          value={block.hash}
        />
      ),
      timestamp: <DateShow value={block.blockTime} />,
      extrinsicNum: (block.extrinsics || []).length,
      key: block.hash
    }
  })

  useEffect(() => {
    dispatch(fetchBlocks(tablePage - 1, tablePageSize))
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
