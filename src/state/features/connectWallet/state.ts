import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChangeNetworkRequest, NetworkConnected, WalletState } from './types'
import { thunksApply } from '@src/state/features/connectWallet/thunks'

const initialState: WalletState = {
  data: {
    status: 'notConnected',
  },
}

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    metamaskUnavaliable: (state) => {
      state.data = { status: 'unavailable' }
    },

    metamaskDisconnected: (state) => {
      state.data = {
        status: 'notConnected',
      }
    },

    metamaskConnected: (
      state: WalletState,
      action: PayloadAction<NetworkConnected>
    ) => {
      state.data = {
        status: 'connected',
        address: action.payload.address,
        chainId: action.payload.chainId,
      }
    },

    metamaskChangeChainRequested: (
      state: WalletState,
      action: PayloadAction<ChangeNetworkRequest>
    ) => {
      state.data = {
        status: 'inappropriateNetwork',
        changeRequested: {
          toChainId: action.payload.chainId,
          toChainName: action.payload.chainName,
        },
      }
    },
  },

  extraReducers(builder) {
    thunksApply.forEach((thunkApply) => thunkApply(builder))
  },
})

export default slice.reducer

export const {
  metamaskUnavaliable,
  metamaskDisconnected,
  metamaskConnected,
  metamaskChangeChainRequested,
} = slice.actions
