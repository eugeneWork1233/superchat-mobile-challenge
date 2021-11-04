import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { ThunkAction } from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['conversationDetailsReducer'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store