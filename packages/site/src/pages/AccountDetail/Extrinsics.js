import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  accountExtrinsicSelector,
  fetchAccountExtrinsicsLoadingSelector,
  fetchAccountExtrinsics,
} from "@store/reducers/accountDetailSlice";
import Table from "antd/lib/table";
import ExtrinsicLink from "@components/ExtrinsicLink";
import DateShow from "@components/DateShow";
import BlockLink from "@components/BlockLink";
import { AddressLink, ExtrinsicAction } from "@components/index";

const columns = [
  { title: 'Block Height', dataIndex: 'height', },
  { title: 'Extrinsic Hash', dataIndex: 'hash' },
  { title: 'Signer', dataIndex: 'signer' },
  { title: 'Action', dataIndex: 'action' },
]

export default function Extrinsics() {
  const { address } = useParams()
  const dispatch = useDispatch()
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)

  useEffect(() => {
    if (address) {
      dispatch(fetchAccountExtrinsics(address, tablePage - 1, tablePageSize))
    }
  }, [dispatch, address, tablePage, tablePageSize])

  const { items: extrinsics, page, pageSize, total } = useSelector(accountExtrinsicSelector)
  const loading = useSelector(fetchAccountExtrinsicsLoadingSelector)

  const dataSource = (extrinsics || []).map(extrinsic => {
    const { hash, indexer, section, signer, name, args } = extrinsic

    return {
      hash: <ExtrinsicLink value={hash} truncate={true} />,
      index: extrinsic.indexer.index,
      timestamp: <DateShow value={indexer.blockTime} />,
      height: <BlockLink value={indexer.blockHeight} />,
      signer: <AddressLink addr={signer} truncate={true} />,
      action: <ExtrinsicAction section={section} name={name} />,
      args,
      key: hash
    }
  })

  return (
    <Table
      loading={loading}
      onChange={({ current, pageSize: size }) => {
        setTablePage(current)
        setTablePageSize(size)
      }}
      expandedRowRender={data => {
        return (
          <div>
            <h3 style={{ fontSize: '13px', paddingLeft: '2px' }}>args:</h3>
            <pre style={{ textAlign: 'left', margin: 0 }}>
              {JSON.stringify(data.args, null, 2)}
            </pre>
          </div>
        )
      }}
      pagination={{ current: page + 1, pageSize, total }}
      size="small"
      columns={columns}
      dataSource={dataSource}
    />
  )
}
