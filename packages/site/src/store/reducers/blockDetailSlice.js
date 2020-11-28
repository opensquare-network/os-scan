import { createSlice } from "@reduxjs/toolkit";
import api from '@services/api'

const blockDetailSlice = createSlice({
  name: 'blockDetail',
  initialState: {
    block: null,
    loading: false,
    extrinsics: [],
    events: [],
    loadingExtrinsics: false,
    loadingEvents: false
  },
  reducers: {
    setBlock(state, { payload }) {
      state.block = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    },
    setExtrinsics(state, { payload }) {
      state.extrinsics = payload
    },
    setEvents(state, { payload }) {
      state.events = payload
    },
    setLoadingExtrinsics(state, { payload }) {
      state.loadingExtrinsics = payload
    },
    setLoadingEvents(state, { payload }) {
      state.loadingEvents = payload
    },
  }
})

export const {
  setBlock,
  setLoading,
  setExtrinsics,
  setEvents,
  setLoadingExtrinsics,
  setLoadingEvents,
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

export const fetchBlockExtrinsics = (heightOrHash) => async dispatch => {
  dispatch(setLoadingExtrinsics(true))

  try {
    const { result } = await api.fetch(`/blocks/${heightOrHash}/extrinsics`)
    dispatch(setExtrinsics(result))
  } finally {
    dispatch(setLoadingExtrinsics(false))
  }
}

export const blockExtrinsicSelector = state => state.blockDetail.extrinsics
export const blockEventSelector = state => state.blockDetail.events
export const blockExtrinsicsLoadingSelector = state => state.blockDetail.loadingExtrinsics
export const blockEventsLoadingSelector = state => state.blockDetail.loadingEvents
export const blockDetailSelector = state => state.blockDetail.block
export const fetchBlockLoadingSelector = state => state.blockDetail.loading
export default blockDetailSlice.reducer
