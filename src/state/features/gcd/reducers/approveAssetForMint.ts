import { MintState } from '@src/state/features/gcd/types'
import setCollateralAssetOperationType from '@src/state/features/gcd/setColatteralAssetOperationStatus'
import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { approveAssetForMintAction } from '@src/state/features/gcd/thunks'

export const extraReducers: ExtraReducersApply<MintState> = (builder) => {
  return builder
    .addCase(approveAssetForMintAction.rejected, (state, action) =>
      setCollateralAssetOperationType(state, action.meta.arg.address, 'none')
    )
    .addCase(approveAssetForMintAction.pending, (state, action) =>
      setCollateralAssetOperationType(state, action.meta.arg.address, 'none')
    )
    .addCase(approveAssetForMintAction.fulfilled, (state, action) => {
      if (state.data.status === 'received') {
        const assetIndex = state.data.colateralAssets.findIndex(
          (asset) => asset.address === action.meta.arg.address
        )
        if (assetIndex === -1) {
          throw new Error('Asset not found')
        }

        state.data.colateralAssets[assetIndex].approvedAmmount =
          action.payload.approvedAmount
        setCollateralAssetOperationType(state, assetIndex, 'none')
      } else {
        throw new Error('State still not received')
      }
    })
}
