import { configureStore, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { useDispatch as useDispatchHook } from 'react-redux'
import { reducer as connectWallet } from '@src/state/features/connectWallet'
import { reducer as gcdReducer } from '@src/state/features/gcd'

export const store = configureStore({
  reducer: {
    wallet: connectWallet,
    gcd: gcdReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>

export const useDispatch = () => useDispatchHook<AppDispatch>()
