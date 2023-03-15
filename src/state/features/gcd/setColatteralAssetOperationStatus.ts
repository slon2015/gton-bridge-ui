import { ColateralAsset, MintState } from '@src/state/features/gcd/types'

export default function setOperationStatus(
  state: MintState,
  addressOrIndex: string | number,
  operation: ColateralAsset['operation']
) {
  if (state.data.status === 'received') {
    if (typeof addressOrIndex === 'string') {
      const assetIndex = state.data.colateralAssets.findIndex(
        (asset) => asset.address === addressOrIndex
      )
      if (assetIndex === -1) {
        throw new Error('Asset not found')
      }

      state.data.colateralAssets[assetIndex].operation = operation
    } else {
      state.data.colateralAssets[addressOrIndex].operation = operation
    }
  } else {
    throw new Error('State still not received')
  }
}
