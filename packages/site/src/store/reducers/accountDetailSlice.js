import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const accountDetailSlice = createSlice({
  name: 'accountDetail',
  initialState: {
    account: null,
    loading: false,
    extrinsics: {},
    loadingExtrinsics: false,
    fundBounties: {},
    huntBounties: {},
    loadingFundBounties: false,
    loadingHundBounties: false,
  },
  reducers: {
    setAccount(state, { payload }) {
      state.account = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    },
    setExtrinsics(state, { payload }) {
      state.extrinsics = payload
    },
    setLoadingExtrinsics(state, { payload }) {
      state.loadingExtrinsics = payload
    },
    setFundBounties(state, { payload }) {
      state.fundBounties = payload
    },
    setLoadingFundBounties(state, { payload }) {
      state.loadingFundBounties = payload
    },
    setHuntBounties(state, { payload }) {
      state.huntBounties = payload
    },
    setLoadingHuntBounties(state, { payload }) {
      state.loadingHundBounties = payload
    },
  }
})

export const {
  setAccount,
  setLoading,
  setExtrinsics,
  setLoadingExtrinsics,
  setFundBounties,
  setLoadingFundBounties,
  setHuntBounties,
  setLoadingHuntBounties,
} = accountDetailSlice.actions

export const fetchAccount = address => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}`)
    dispatch(setAccount(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const fetchAccountExtrinsics = (address, page=0, pageSize=20) => async dispatch => {
  dispatch(setLoadingExtrinsics(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/extrinsics`, { page, pageSize })
    dispatch(setExtrinsics(result || {}))
  } finally {
    dispatch(setLoadingExtrinsics(false))
  }
}

export const fetchFundBounties = (address, page=0, pageSize=20) => async dispatch => {
  dispatch(setLoadingFundBounties(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/fundbounties`, { page, pageSize })
    dispatch(setFundBounties(result || {}))
  } finally {
    dispatch(setLoadingFundBounties(false))
  }
}

export const fetchHuntBounties = (address, page=0, pageSize=20) => async dispatch => {
  dispatch(setLoadingHuntBounties(true))
  try {
    const { result } = await api.fetch(`/accounts/${address}/huntbounties`, { page, pageSize })
    dispatch(setHuntBounties(result || {}))
  } finally {
    dispatch(setLoadingHuntBounties(false))
  }
}

export const accountDetailLoadingSelector = state => state.accountDetail.loading
export const accountDetailSelector = state => state.accountDetail.account
export const accountExtrinsicSelector = state => state.accountDetail.extrinsics
export const fetchAccountExtrinsicsLoadingSelector = state => state.accountDetail.loadingExtrinsics
export const fundBountiesSelector = state => state.accountDetail.fundBounties
export const fetchFundBountiesLoadingSelector = state => state.accountDetail.loadingFundBounties
export const huntBountiesSelector = state => state.accountDetail.huntBounties
export const fetchHuntBountiesLoadingSelector = state => state.accountDetail.loadingHuntBounties
export default accountDetailSlice.reducer
