import { createSlice } from '@reduxjs/toolkit'
import api from '@services/api'

const extrinsicSlice = createSlice({
  name: 'extrinsics',
  initialState: {
    extrinsics: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loading: false
  },
  reducers: {
    setExtrinsics(state, { payload }) {
      state.extrinsics = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

const {
  setExtrinsics,
  setLoading,
} = extrinsicSlice.actions

export const fetchExtrinsicsLoading = state => state.extrinsics.loading
export const extrinsicListSelector = state => state.extrinsics.extrinsics
export const fetchExtrinsics = (page = 0, pageSize = 20) => async dispatch => {
  dispatch(setLoading(true))

  try {
    const { result } = await api.fetch('/extrinsics', { page, pageSize })
    dispatch(setExtrinsics(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export default extrinsicSlice.reducer
