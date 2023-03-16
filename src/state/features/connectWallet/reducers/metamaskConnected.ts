import { PayloadAction } from '@reduxjs/toolkit'
import {
  NetworkConnected,
  WalletState,
} from '@src/state/features/connectWallet/types'

export const metamaskConnected = (
  state: WalletState,
  action: PayloadAction<NetworkConnected>
) => {
  state.data = {
    status: 'connected',
    address: action.payload.address,
    chainId: action.payload.chainId,
  }
}
