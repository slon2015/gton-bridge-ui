import type { MintState } from '@src/state/features/gcd/types'
import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { updateUsdRateAction } from '@src/state/features/gcd/thunks'

export const extraReducers: ExtraReducersApply<MintState> = (builder) => {
  return builder.addCase(updateUsdRateAction.fulfilled, (state, action) => {
    if (state.data.status === 'received') {
      const assetIndex = state.data.colateralAssets.findIndex(
        (asset) => asset.address === action.meta.arg.assetAddress
      )
      if (assetIndex === -1) {
        throw new Error('Asset not found')
      }

      state.data.colateralAssets[assetIndex].conversionRate = action.payload
    } else {
      throw new Error('State still not received')
    }
  })
}
