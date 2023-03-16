import { extraReducers as fetchNetworkState } from '@src/state/features/connectWallet/reducers/fetchNetworkStatus'
import { extraReducers as joinGcd } from '@src/state/features/connectWallet/reducers/joinGcd'

export const extraReducers = [fetchNetworkState, joinGcd]

export { metamaskUnavaliable } from '@src/state/features/connectWallet/reducers/metamaskUnavailable'
export { metamaskDisconnected } from '@src/state/features/connectWallet/reducers/metamaskDisconnected'
export { metamaskConnected } from '@src/state/features/connectWallet/reducers/metamaskConnected'
export { metamaskChangeChainRequested } from '@src/state/features/connectWallet/reducers/metamaskChangeChainRequested'
