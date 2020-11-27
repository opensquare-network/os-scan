import { combineReducers } from '@reduxjs/toolkit'
import testReducer from './testSlice'
import latestBlocksReducer from './latestBlockSlice'
import latestExtrinsicsReducer from './latestExtrinsicSlice'
import blocksReducer from './blockSlice'
import extrinsicsReducer from './extrinsicSlice'
import eventsReducer from './eventSlice'
import blockDetailReducer from './blockDetailSlice'

export default combineReducers({
  test: testReducer,
  latestBlocks: latestBlocksReducer,
  latestExtrinsics: latestExtrinsicsReducer,
  blocks: blocksReducer,
  extrinsics: extrinsicsReducer,
  events: eventsReducer,
  blockDetail: blockDetailReducer,
})
