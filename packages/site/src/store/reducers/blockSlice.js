import { createSlice } from '@reduxjs/toolkit'
import api from '@services/api'

const blockSlice = createSlice({
  name: 'blocks',
  initialState: {
    blocks: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loading: false
  },
  reducers: {
    setBlocks(state, { payload }) {
      state.blocks = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

export const {
  setBlocks,
  setLoading
} = blockSlice.actions

export const fetchBlocks = (page = 0, pageSize = 20) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch('/blocks', { page, pageSize })
    dispatch(setBlocks({
      ...result
    }))
  } finally {
    dispatch(setLoading(false))
  }
}

export const fetchBlocksLoading = state => state.blocks.loading
export const blockListSelector = state => state.blocks.blocks
export default blockSlice.reducer
