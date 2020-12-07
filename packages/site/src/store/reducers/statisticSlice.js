import { createSlice } from '@reduxjs/toolkit'

const statisticSlice = createSlice({
  name: 'statistics',
  initialState: {
    totalAccounts: 0,
    totalExtrinsics: 0,
    totalBounties: 0,
    totalBountiesApplying: 0,
    totalBountiesResolved: 0,
  },
  reducers: {
    setTotalAccounts(state, { payload }) {
      state.totalAccounts = payload
    },
    setTotalExtrinsics(state, { payload }) {
      state.totalExtrinsics = payload
    },
    setTotalBounties(state, { payload }) {
      state.totalBounties = payload
    },
    setTotalBountiesWaitingForApprove(state, { payload }) {
      state.totalBountiesApplying = payload
    },
    setTotalBountiesResolved(state, { payload }) {
      state.totalBountiesResolved = payload
    },
    setLatestStatistics(state, { payload }) {
      for (let k of Object.keys(payload)) {
        state[k] = payload[k]
      }
    },
  }
})

export const totalAccountsSelector = state => state.statistics.totalAccounts
export const totalExtrinsicsSelector = state => state.statistics.totalExtrinsics
export const totalBountiesSelector = state => state.statistics.totalBounties
export const totalBountiesApplyingSelector = state => state.statistics.totalBountiesApplying
export const totalBountiesResolvedSelector = state => state.statistics.totalBountiesResolved
export const latestStatisticsSelector = state => state.statistics
export const {
  setTotalAccounts,
  setTotalExtrinsics,
  setTotalBounties,
  setTotalBountiesWaitingForApprove,
  setTotalBountiesResolved,
  setLatestStatistics,
} = statisticSlice.actions
export default statisticSlice.reducer
