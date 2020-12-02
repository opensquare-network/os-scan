import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";
import contentApi from "@services/contentServer";

const bountyDetailSlice = createSlice({
  name: 'bountyDetail',
  initialState: {
    bounty: null,
    loading: false,
    hunters: [],
    content: null,
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
    setBountyContent(state, { payload }) {
      state.content = payload
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
  setBountyContent,
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

export const fetchBountyContent = contentHash => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await contentApi.fetch(`/content/${contentHash}`)
    dispatch(setBountyContent(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const bountyDetailSelector = state => state.bountyDetail.bounty
export const bountyHunterSelector = state => state.bountyDetail.hunters
export const bountyContentSelector = state => state.bountyDetail.content
export const fetchHuntersLoadingSelector = state => state.bountyDetail.loadingHunters
export default bountyDetailSlice.reducer
