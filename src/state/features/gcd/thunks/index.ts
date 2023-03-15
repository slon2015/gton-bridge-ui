import {
  thunkApply as approveThunkApply,
  approveAssetForMintAction,
} from '@src/state/features/gcd/thunks/approveAssetForMint'
import { thunkApply as fetchNetworkStateThunlApply } from '@src/state/features/gcd/thunks/fetchNetworkStatus'
import {
  thunkApply as joinGcdThunkApply,
  joinGcdAction,
} from '@src/state/features/gcd/thunks/joinGcd'
import {
  thunkApply as updateUsdRatesThunkApply,
  updateUsdRateAction,
} from '@src/state/features/gcd/thunks/updateUsdRates'

export const thunksApply = [
  approveThunkApply,
  fetchNetworkStateThunlApply,
  joinGcdThunkApply,
  updateUsdRatesThunkApply,
]

export { approveAssetForMintAction, joinGcdAction, updateUsdRateAction }
