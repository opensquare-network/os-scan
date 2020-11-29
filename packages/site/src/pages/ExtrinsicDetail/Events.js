import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  extrinsicEventSelector,
  extrinsicEventsLoadingSelector,
  fetchExtrinsicEvents
} from "@store/reducers/extrinsicDetailSlice";
import Table from "antd/lib/table";
import EventLink from "@components/EventLink";
import ExtrinsicLink from "@components/ExtrinsicLink";
import { ExtrinsicAction } from "@components/index";

export const columns = [
  { title: 'Event ID', dataIndex: 'id' },
  { title: 'Extrinsics Hash', dataIndex: 'extrinsicHash', },
  { title: 'Action', dataIndex: 'action' },
]

export default function Events() {
  const { hash } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (hash) {
      dispatch(fetchExtrinsicEvents(hash))
    }
  }, [dispatch, hash])

  const events = useSelector(extrinsicEventSelector)
  const loading = useSelector(extrinsicEventsLoadingSelector)

  const dataSource = events.map(event => {
    const { indexer, extrinsicHash, sort, section, method, meta, data } = event
    const id = `${indexer.blockHeight}-${sort}`

    return {
      id: <EventLink id={id} />,
      extrinsicHash: <ExtrinsicLink value={extrinsicHash} truncate={true} />,
      index: event.indexer.index,
      action: <ExtrinsicAction section={section} name={method} />,
      meta,
      data,
      key: id
    }
  })

  return (
    <Table
      loading={loading}
      size="small"
      expandedRowRender={({ meta, data }) => {
        return (
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '13px', paddingLeft: '2px' }}>meta:</h3>
            <pre>{JSON.stringify(meta, null, 2)}</pre>
            <h3 style={{ fontSize: '13px', paddingLeft: '2px' }}>data:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )
      }}
      columns={columns}
      dataSource={dataSource}
    />
  )
}
