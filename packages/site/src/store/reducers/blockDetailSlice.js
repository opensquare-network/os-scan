import { createSlice } from "@reduxjs/toolkit";
import api from '@services/api'

const blockDetailSlice = createSlice({
  name: 'blockDetail',
  initialState: {
    block: null,
    loading: false
  },
  reducers: {
    setBlock(state, { payload }) {
      state.block = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

export const {
  setBlock,
  setLoading,
} = blockDetailSlice.actions

export const fetchBlock = (heightOrHash) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch(`/blocks/${heightOrHash}`)
    dispatch(setBlock(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const blockDetailSelector = state => state.blockDetail.block
export const fetchBlockLoadingSelector = state => state.blockDetail.loading
export default blockDetailSlice.reducer
