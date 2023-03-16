import type { WalletState } from '@src/state/features/connectWallet/types'
import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { joinGcdAction } from '@src/state/features/gcd/thunks'

export const extraReducers: ExtraReducersApply<WalletState> = (builder) => {
  return builder.addCase(joinGcdAction.fulfilled, (state, action) => {
    if (state.data.status === 'initialised') {
      const assetIndex = state.data.colateralAssets.findIndex(
        (asset) => asset.address === action.meta.arg.assetAddress
      )
      if (assetIndex === -1) {
        throw new Error('Asset not found')
      }

      state.data.colateralAssets[assetIndex].amount =
        action.payload.updatedAsset.amount
    } else {
      throw new Error('State still not received')
    }
  })
}
