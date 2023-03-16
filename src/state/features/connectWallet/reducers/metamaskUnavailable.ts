import { WalletState } from '@src/state/features/connectWallet/types'

export const metamaskUnavaliable = (state: WalletState) => {
  state.data = { status: 'unavailable' }
}
