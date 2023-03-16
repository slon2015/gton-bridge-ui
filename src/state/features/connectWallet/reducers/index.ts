import { extraReducers as fetchNetworkStateThunlApply } from '@src/state/features/connectWallet/reducers/fetchNetworkStatus'

export const extraReducers = [fetchNetworkStateThunlApply]

export { metamaskUnavaliable } from '@src/state/features/connectWallet/reducers/metamaskUnavailable'
export { metamaskDisconnected } from '@src/state/features/connectWallet/reducers/metamaskDisconnected'
export { metamaskConnected } from '@src/state/features/connectWallet/reducers/metamaskConnected'
export { metamaskChangeChainRequested } from '@src/state/features/connectWallet/reducers/metamaskChangeChainRequested'
