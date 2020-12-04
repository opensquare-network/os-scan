import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";
import contentApi from "@services/contentServer";

const bountyDetailSlice = createSlice({
  name: 'bountyDetail',
  initialState: {
    bounty: null,
    loading: false,
    hunters: [],
    loadingHunters: false,
    content: null,
    loadingBountyContent: false,
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
    setBountyContent(state, { payload }) {
      state.content = payload
    },
    setLoadingBountyContent(state, { payload }) {
      state.loadingBountyContent = payload
    },
  }
})

export const {
  setBounty,
  setLoading,
  setHunters,
  setLoadingHunters,
  setBountyContent,
  setLoadingBountyContent,
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

export const fetchBountyContent = contentHash => async dispatch => {
  dispatch(setLoadingBountyContent(true))
  try {
    const { result } = await contentApi.fetch(`/content/${contentHash}`)
    dispatch(setBountyContent(result))
  } finally {
    dispatch(setLoadingBountyContent(false))
  }
}

export const bountyDetailSelector = state => state.bountyDetail.bounty
export const fetchBountyDetailLoadingSelector = state => state.bountyDetail.loading
export const bountyHunterSelector = state => state.bountyDetail.hunters
export const fetchHuntersLoadingSelector = state => state.bountyDetail.loadingHunters
export const bountyContentSelector = state => state.bountyDetail.content
export const fetchBountyContentLoadingSelector = state => state.bountyDetail.loadingBountyContent
export default bountyDetailSlice.reducer
