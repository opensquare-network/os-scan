import React from "react";
import toPrecision from "../utils/toPrecision";

export default function TimeGap({ timestamp }) {
  const now = Date.now()
  const gapSeconds = (now - timestamp) / 1000

  if (gapSeconds < 120) {
    return <span>{gapSeconds} secs ago</span>
  }

  const gapMins = gapSeconds / 60
  if (gapMins < 60) {
    return <span>{toPrecision(gapMins, 0)} min{gapMins > 1 ? 's' : ''} ago</span>
  }

  const gapHours = gapMins / 60
  if (gapHours < 72) {
    return <span>{toPrecision(gapHours, 0)} hour{gapHours > 1 ? 's' : ''} ago</span>
  }

  const gapDays = gapHours / 24
  return <span>{toPrecision(gapDays, 0)} day{gapDays > 1 ? 's' : ''} ago</span>
}
