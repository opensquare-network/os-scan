import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const bountyDetailSlice = createSlice({
  name: 'bountyDetail',
  initialState: {
    bounty: null,
    loading: false,
  },
  reducers: {
    setBounty(state, { payload }) {
      state.bounty = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    },
  }
})

export const {
  setBounty,
  setLoading,
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

export const bountyDetailSelector = state => state.bountyDetail.bounty
export default bountyDetailSlice.reducer
