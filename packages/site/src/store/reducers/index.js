import { combineReducers } from '@reduxjs/toolkit'
import testReducer from './testSlice'
import latestBlocksReducer from './latestBlockSlice'
import latestExtrinsicsReducer from './latestExtrinsicSlice'

export default combineReducers({
  test: testReducer,
  latestBlocks: latestBlocksReducer,
  latestExtrinsics: latestExtrinsicsReducer,
})
