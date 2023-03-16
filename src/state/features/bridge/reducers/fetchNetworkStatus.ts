import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { fetchNetworkMintStateAction } from '@src/state/features/common/thunks/fetchNetworkStatus'
import { BridgeState } from '../types'

export const extraReducers: ExtraReducersApply<BridgeState> = (builder) => {
  return builder
    .addCase(fetchNetworkMintStateAction.fulfilled, (state, action) => {
      state.data = {
        status: 'initialised',
        gcd: {
          amount: action.payload.gcdAsset.amount,
          approvedAmount: action.payload.gcdAsset.bridgeAllowedAmount,
          operation: 'none',
        },
      }
    })
    .addCase(fetchNetworkMintStateAction.pending, (state) => {
      state.data = {
        status: 'initialisation',
      }
    })
    .addCase(fetchNetworkMintStateAction.rejected, (state) => {
      state.data = {
        status: 'init-error',
      }
    })
}
