import React, { memo } from 'react'
import dayjs from 'dayjs'

export default memo(function DateShow(props) {
  const { value, style, format = 'YYYY-MM-DD HH:mm:ss' } = props

  return (
    <div style={style}>
      {value ? dayjs(value).format(format) : value}
    </div>
  )
})
