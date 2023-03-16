import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { BridgeState } from '../types'
import { approveAssetForBridge } from '../thunks/approveAssetForBridge'

export const extraReducers: ExtraReducersApply<BridgeState> = (builder) => {
  return builder
    .addCase(approveAssetForBridge.fulfilled, (state, action) => {
      if (state.data.status !== 'initialised') {
        throw new Error('Not initialised bridge state')
      }
      state.data.gcd.approvedAmount = action.payload.approvedAmount
      state.data.gcd.operation = 'none'
    })
    .addCase(approveAssetForBridge.pending, (state) => {
      if (state.data.status !== 'initialised') {
        throw new Error('Not initialised bridge state')
      }
      state.data.gcd.operation = 'approveInProgress'
    })
    .addCase(approveAssetForBridge.rejected, (state) => {
      if (state.data.status !== 'initialised') {
        throw new Error('Not initialised bridge state')
      }
      state.data.gcd.operation = 'none'
    })
}
