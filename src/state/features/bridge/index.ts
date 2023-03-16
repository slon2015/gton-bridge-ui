export { default as reducer } from '@src/state/features/bridge/state'

export type {
  BridgeState,
  InitialisedBridgeData,
} from '@src/state/features/bridge/types'

export {
  approveAssetForBridge,
  fetchGcdAmount,
  bridgeGcd,
} from '@src/state/features/bridge/thunks'
