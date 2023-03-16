import { extraReducers as fetchNetworkState } from '@src/state/features/bridge/reducers/fetchNetworkStatus'
import { extraReducers as approveAssetForBridge } from '@src/state/features/bridge/reducers/approveAssetForBridge'
import { extraReducers as fetchGcdAmount } from '@src/state/features/bridge/reducers/fetchGcdAmount'
import { extraReducers as bridgeGcd } from '@src/state/features/bridge/reducers/bridgeGcd'

export const extraReducers = [
  fetchNetworkState,
  approveAssetForBridge,
  fetchGcdAmount,
  bridgeGcd,
]
