import { WalletState } from '@src/state/features/connectWallet/types'

export const metamaskDisconnected = (state: WalletState) => {
  state.data = {
    status: 'notConnected',
  }
}
