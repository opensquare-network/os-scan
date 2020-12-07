import { combineReducers } from '@reduxjs/toolkit'
import testReducer from './testSlice'
import latestBlocksReducer from './latestBlockSlice'
import latestExtrinsicsReducer from './latestExtrinsicSlice'
import blocksReducer from './blockSlice'
import extrinsicsReducer from './extrinsicSlice'
import eventsReducer from './eventSlice'
import blockDetailReducer from './blockDetailSlice'
import extrinsicDetailReducer from './extrinsicDetailSlice'
import eventDetailReducer from './eventDetailSlice'
import bountiesReducer from './bountySlice'
import bountyDetailReducer from './bountyDetailSlice'
import accountDetailReducer from './accountDetailSlice'
import accountsReducer from './accountSlice'
import statisticReducer from './statisticSlice'

export default combineReducers({
  test: testReducer,
  latestBlocks: latestBlocksReducer,
  latestExtrinsics: latestExtrinsicsReducer,
  blocks: blocksReducer,
  extrinsics: extrinsicsReducer,
  events: eventsReducer,
  blockDetail: blockDetailReducer,
  extrinsicDetail: extrinsicDetailReducer,
  eventDetail: eventDetailReducer,
  bounties: bountiesReducer,
  bountyDetail: bountyDetailReducer,
  accountDetail: accountDetailReducer,
  accounts: accountsReducer,
  statistics: statisticReducer,
})
