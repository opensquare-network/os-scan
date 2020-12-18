import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const extrinsicDetailSlice = createSlice({
  name: 'extrinsicDetail',
  initialState: {
    extrinsic: null,
    loading: false,
    events: [],
    loadingEvents: false
  },
  reducers: {
    setExtrinsic(state, { payload }) {
      state.extrinsic = payload
    },
    setLoading(state, { payload }) {

      state.loading = payload
    },
    setEvents(state, { payload }) {
      state.events = payload
    },
    setLoadingEvents(state, { payload }) {
      state.loadingEvents = payload
    },
  }
})

export const {
  setExtrinsic,
  setLoading,
  setEvents,
  setLoadingEvents,
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

export const fetchExtrinsicEvents = hash => async dispatch => {
  dispatch(setLoadingEvents(true))
  try {
    const { result } = await api.fetch(`/extrinsics/${hash}/events`)
    dispatch(setEvents(result))
  } finally {
    dispatch(setLoadingEvents(false))
  }
}

export const extrinsicDetailLoadingSelector = state => state.extrinsicDetail.loading
export const extrinsicEventSelector = state => state.extrinsicDetail.events
export const extrinsicEventsLoadingSelector = state => state.extrinsicDetail.loadingEvents
export const extrinsicDetailSelector = state => state.extrinsicDetail.extrinsic
export default extrinsicDetailSlice.reducer
