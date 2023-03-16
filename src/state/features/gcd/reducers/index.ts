import { extraReducers as approveAssetForMint } from '@src/state/features/gcd/reducers/approveAssetForMint'
import { extraReducers as fetchNetworkStateThunlApply } from '@src/state/features/gcd/reducers/fetchNetworkStatus'
import { extraReducers as joinGcd } from '@src/state/features/gcd/reducers/joinGcd'
import { extraReducers as updateUsdRates } from '@src/state/features/gcd/reducers/updateUsdRates'

export const extraReducersList = [
  approveAssetForMint,
  fetchNetworkStateThunlApply,
  joinGcd,
  updateUsdRates,
]
