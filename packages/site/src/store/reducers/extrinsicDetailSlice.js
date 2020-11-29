import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const extrinsicDetailSlice = createSlice({
  name: 'extrinsicDetail',
  initialState: {
    extrinsic: null,
    loading: false,
  },
  reducers: {
    setExtrinsic(state, { payload }) {
      state.extrinsic = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    },
  }
})

export const {
  setExtrinsic,
  setLoading,
} = extrinsicDetailSlice.actions

export const fetchExtrinsic = (hash) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch(`/extrinsics/${hash}`)
    dispatch(setExtrinsic(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const extrinsicDetailSelector = state => state.extrinsicDetail.extrinsic
export default extrinsicDetailSlice.reducer
