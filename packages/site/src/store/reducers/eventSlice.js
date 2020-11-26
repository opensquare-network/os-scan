import { createSlice } from "@reduxjs/toolkit";
import api from "@services/api";

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    loading: false
  },
  reducers: {
    setEvents(state, { payload }) {
      state.events = payload
    },
    setLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

export const {
  setEvents,
  setLoading
} = eventSlice.actions

export const fetchEvents = (page = 0, pageSize = 20) => async dispatch => {
  dispatch(setLoading(true))
  try {
    const { result } = await api.fetch('/events', { page, pageSize })
    dispatch(setEvents(result))
  } finally {
    dispatch(setLoading(false))
  }
}

export const fetchEventsLoading = state => state.events.loading
export const eventListSelector = state => state.events.events
export default eventSlice.reducer
