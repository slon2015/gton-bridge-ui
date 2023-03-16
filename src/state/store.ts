import { configureStore, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { useDispatch as useDispatchHook } from 'react-redux'
import { reducer as wallet } from '@src/state/features/connectWallet'
import { reducer as gcd } from '@src/state/features/gcd'
import { reducer as bridge } from '@src/state/features/bridge'

export const store = configureStore({
  reducer: {
    wallet,
    gcd,
    bridge,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>

export const useDispatch = () => useDispatchHook<AppDispatch>()
