import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loading: false
  },
  reducers: {
    setAccounts(state, { payload }) {
      state.accounts = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

export const {
  setAccounts,
  setLoading
} = accountSlice.actions

export const fetchAccounts = (page = 0, pageSize = 20) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch('/accounts', { page, pageSize })
    dispatch(setAccounts(result || {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    }))
  } finally {
    dispatch(setLoading(false))
  }
}

export const fetchAccountsLoading = state => state.accounts.loading
export const accountListSelector = state => state.accounts.accounts
export default accountSlice.reducer
