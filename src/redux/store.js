import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";

import eventsReducer from "./events/events-slice";
//--------------------------------------------------------------------------//

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfigAuth = {
  key: "events",
  storage,
  // whitelist: ["accessToken", "refreshToken", "sid", "userData"],
};

const store = configureStore({
  reducer: {
    date: persistReducer(persistConfigAuth, eventsReducer),
  },

  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
