import { createSlice } from '@reduxjs/toolkit'
import { WalletState } from './types'
import {
  extraReducers,
  metamaskUnavaliable,
  metamaskDisconnected,
  metamaskConnected,
  metamaskChangeChainRequested,
} from '@src/state/features/connectWallet/reducers'

const initialState: WalletState = {
  data: {
    status: 'notConnected',
  },
}

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    metamaskUnavaliable,
    metamaskDisconnected,
    metamaskConnected,
    metamaskChangeChainRequested,
  },
  extraReducers(builder) {
    extraReducers.forEach((extraReducer) => extraReducer(builder))
  },
})

export default slice.reducer

export const actions = slice.actions
