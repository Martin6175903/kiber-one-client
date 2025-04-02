import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { cardSlice } from '@/src/store/card/card.slice'
import { configureStore } from '@reduxjs/toolkit'
import { REHYDRATE, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'Kiber-one Shop',
  storage,
  whitelist: ['card']
}

const isClient = typeof window !== undefined

const combinedReducers = combineReducers({
  card: cardSlice.reducer
})

let mainReducer = combinedReducers

if (isClient) {
  const {persistReducer} = require('redux-persist')
  const storage = require('redux-persist/lib/storage')

  mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ]
      }
    })
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>