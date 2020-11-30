import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const eventDetailSlice = createSlice({
  name: 'eventDetail',
  initialState: {
    event: null,
    loading: false,
  },
  reducers: {
    setEvent(state, { payload }) {
      state.event = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    },
  }
})

export const {
  setEvent,
  setLoading,
} = eventDetailSlice.actions

export const fetchEvent = eventId => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch(`/events/${eventId}/`)
    dispatch(setEvent(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const eventDetailSelector = state => state.eventDetail.event
export const eventDetailLoadingSelector = state => state.eventDetail.loading
export default eventDetailSlice.reducer
