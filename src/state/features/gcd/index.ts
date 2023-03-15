export { default as reducer } from '@src/state/features/gcd/state'
export {
  approveAssetForMintAction,
  joinGcdAction,
  updateUsdRateAction,
} from '@src/state/features/gcd/thunks'

export type {
  ColateralAsset,
  InitialCollateralAsset,
  InitialNetworkMintConfig,
} from '@src/state/features/gcd/types'
