export {
  default as reducer,
  metamaskChangeChainRequested,
  metamaskConnected,
  metamaskDisconnected,
  metamaskUnavaliable,
} from '@src/state/features/connectWallet/state'

export type {
  ColateralAsset,
  ThunkApply,
  InitializedWalletState,
} from '@src/state/features/connectWallet/types'
