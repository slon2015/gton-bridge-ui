import setCollateralAssetOperationType from '@src/state/features/gcd/setColatteralAssetOperationStatus'
import type { MintState } from '@src/state/features/gcd/types'
import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { joinGcdAction } from '@src/state/features/gcd/thunks'

export const extraReducers: ExtraReducersApply<MintState> = (builder) => {
  return builder
    .addCase(joinGcdAction.pending, (state, action) =>
      setCollateralAssetOperationType(
        state,
        action.meta.arg.assetAddress,
        'mintInProgress'
      )
    )
    .addCase(joinGcdAction.rejected, (state, action) =>
      setCollateralAssetOperationType(
        state,
        action.meta.arg.assetAddress,
        'none'
      )
    )
    .addCase(joinGcdAction.fulfilled, (state, action) => {
      if (state.data.status === 'received') {
        const assetIndex = state.data.colateralAssets.findIndex(
          (asset) => asset.address === action.meta.arg.assetAddress
        )
        if (assetIndex === -1) {
          throw new Error('Asset not found')
        }

        state.data.colateralAssets[assetIndex].approvedAmmount =
          action.payload.updatedAsset.approvedAmmount
        setCollateralAssetOperationType(state, assetIndex, 'none')
      } else {
        throw new Error('State still not received')
      }
    })
}
