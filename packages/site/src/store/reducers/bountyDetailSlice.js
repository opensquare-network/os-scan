import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const bountyDetailSlice = createSlice({
  name: 'bountyDetail',
  initialState: {
    bounty: null,
    loading: false,
    hunters: [],
    loadingHunters: false,
  },
  reducers: {
    setBounty(state, { payload }) {
      state.bounty = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    },
    setHunters(state, { payload }) {
      state.hunters = payload
    },
    setLoadingHunters(state, { payload }) {
      state.loadingHunters = payload
    },
  }
})

export const {
  setBounty,
  setLoading,
  setHunters,
  setLoadingHunters,
} = bountyDetailSlice.actions

export const fetchBounty = bountyId => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch(`/bounties/${bountyId}`)
    dispatch(setBounty(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const fetchBountyHunters = bountyId => async dispatch => {
  dispatch(setLoadingHunters(true))
  try {
    const { result } = await api.fetch(`/bounties/${bountyId}/hunters`)
    dispatch(setHunters(result))
  } finally {
    dispatch(setLoadingHunters(false))
  }
}

export const bountyDetailSelector = state => state.bountyDetail.bounty
export const bountyHunterSelector = state => state.bountyDetail.hunters
export const fetchHuntersLoadingSelector = state => state.bountyDetail.loadingHunters
export default bountyDetailSlice.reducer
