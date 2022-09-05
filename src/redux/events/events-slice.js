import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editEvent: (state, action) => {
      state.events = state.events.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    },
    deleteEvent: (state, payload) => {
      state.events = state.events.filter((item) => item.id === payload);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
