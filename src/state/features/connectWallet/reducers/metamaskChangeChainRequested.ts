import { PayloadAction } from '@reduxjs/toolkit'
import {
  ChangeNetworkRequest,
  WalletState,
} from '@src/state/features/connectWallet/types'

export const metamaskChangeChainRequested = (
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
}
