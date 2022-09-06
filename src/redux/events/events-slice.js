import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [
    {
      createdAt: '6.9.2022 17:04',
      date: '09/09/2022',
      description:
        'Привіт! Мене звати Волидимир. Дякую за можливість виконати тестове завдання. Гарного і мирного дня ♥ ',
      id: '92VqtsNLTyNlvTd402rcM',
      time: '06:30',
      title: 'Привіт! 👋 ',
    },
  ],
  selectedDate: null,
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editEvent: (state, { payload }) => {
      state.events = state.events.map(item => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        } else {
          return item;
        }
      });
    },
    deleteEvent: (state, { payload }) => {
      console.log(payload);
      state.events = state.events.filter(item => item.id !== payload);
    },
    updateDate: (state, { payload }) => {
      console.log(payload);
      //'MM/DD/YYYY'
      state.selectedDate = payload;
    },
  },
});

export const { addEvent, editEvent, deleteEvent, updateDate } =
  eventsSlice.actions;

export default eventsSlice.reducer;
