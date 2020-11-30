import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const bountySlice = createSlice({
  name: 'bounties',
  initialState: {
    bounties: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loading: false
  },
  reducers: {
    setBounties(state, { payload }) {
      state.bounties = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

const {
  setBounties,
  setLoading,
} = bountySlice.actions

export const fetchBounties = (page = 0, pageSize = 20) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch('/bounties', { page, pageSize })
    dispatch(setBounties(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const bountyListSelector = state => state.bounties.bounties
export const fetchBountiesLoadingSelector = state => state.bounties.loading
export default bountySlice.reducer
