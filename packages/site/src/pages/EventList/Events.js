import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventListSelector, fetchEvents, fetchEventsLoading } from "@store/reducers/eventSlice";
import Table from "antd/lib/table";
import { columns } from "@pages/EventList/const";
import ExtrinsicLink from "@components/ExtrinsicLink";
import DateShow from "@components/DateShow";
import BlockLink from "@components/BlockLink";
import { ExtrinsicAction } from "@components/index";
import EventLink from "@components/EventLink";

export default function Events() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const loading = useSelector(fetchEventsLoading)

  const dispatch = useDispatch()
  const { items: events, page, pageSize, total } = useSelector(eventListSelector)

  const dataSource = events.map(event => {
    const { indexer, extrinsicHash, sort, section, method, meta, data } = event
    const id = `${indexer.blockHeight}-${sort}`

    return {
      id: <EventLink id={id} />,
      extrinsicHash: <ExtrinsicLink value={extrinsicHash} truncate={true} />,
      index: event.indexer.index,
      timestamp: <DateShow value={indexer.blockTime} />,
      height: <BlockLink value={indexer.blockHeight} />,
      action: <ExtrinsicAction section={section} name={method} />,
      meta,
      data,
      key: id
    }
  })


  useEffect(() => {
    dispatch(fetchEvents(tablePage - 1, tablePageSize))
  }, [dispatch, tablePage, tablePageSize])

  return (
    <Table
      loading={loading}
      onChange={({ current, pageSize: size }) => {
        setTablePage(current)
        setTablePageSize(size)
      }}
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
      pagination={{ current: page + 1, pageSize, total }}
      size="small"
      columns={columns}
      dataSource={dataSource}
    />
  )
}
