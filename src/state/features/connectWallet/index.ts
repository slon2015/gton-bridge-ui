import { actions } from '@src/state/features/connectWallet/state'

export const {
  metamaskChangeChainRequested,
  metamaskConnected,
  metamaskDisconnected,
  metamaskUnavaliable,
} = actions
export { default as reducer } from '@src/state/features/connectWallet/state'

export type {
  ColateralAsset,
  ExtraReducersApply,
  InitializedWalletState,
} from '@src/state/features/connectWallet/types'
