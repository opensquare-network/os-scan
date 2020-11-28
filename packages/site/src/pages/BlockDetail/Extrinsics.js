import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  blockExtrinsicSelector,
  blockExtrinsicsLoadingSelector,
  fetchBlockExtrinsics
} from "@store/reducers/blockDetailSlice";
import Table from "antd/lib/table";
import ExtrinsicLink from "@components/ExtrinsicLink";
import DateShow from "@components/DateShow";
import BlockLink from "@components/BlockLink";
import { AddressLink, ExtrinsicAction } from "@components/index";

const columns = [
  { title: 'Index', dataIndex: 'index', },
  { title: 'Hash', dataIndex: 'hash' },
  { title: 'Signer', dataIndex: 'signer' },
  { title: 'Action', dataIndex: 'action' },
]

export default function Extrinsics() {
  const { heightOrHash } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (heightOrHash) {
      dispatch(fetchBlockExtrinsics(heightOrHash))
    }
  }, [dispatch, heightOrHash])

  const extrinsics = useSelector(blockExtrinsicSelector)
  console.log('extrinsics', extrinsics)
  const loading = useSelector(blockExtrinsicsLoadingSelector)

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
      size="small"
      columns={columns}
      dataSource={dataSource}
    />
  )
}
