import io from 'socket.io-client'
import store from '@store'
import { setLatestBlocks } from "@store/reducers/latestBlockSlice";
import { setLatestExtrinsics } from "@store/reducers/latestExtrinsicSlice";
import { setLatestStatistics } from "@store/reducers/statisticSlice";

const socket = io(process.env.REACT_APP_SERVER)
socket.connect()
socket.on('connect', () => {
  socket.emit('subscribe', 'LATEST_BLOCKS_ROOM')
  socket.emit('subscribe', 'LATEST_EXTRINSICS_ROOM')
  socket.emit('subscribe', 'LATEST_STATISTIC_ROOM')
  socket.on('latestBlocks', data => {
    store.dispatch(setLatestBlocks(data))
  })
  socket.on('latestExtrinsics', data => {
    store.dispatch(setLatestExtrinsics(data))
  })
  socket.on('latestStatistics', data => {
    store.dispatch(setLatestStatistics(data))
  })
})
