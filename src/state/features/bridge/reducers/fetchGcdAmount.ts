import { fetchGcdAmount } from '@src/state/features/bridge/thunks'
import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { BridgeState } from '@src/state/features/bridge/types'

export const extraReducers: ExtraReducersApply<BridgeState> = (builder) => {
  return builder.addCase(fetchGcdAmount.fulfilled, (state, action) => {
    if (state.data.status !== 'initialised') {
      throw new Error('Not initialised bridge state')
    }
    state.data.gcd.approvedAmount = action.payload.approvedAmount
    state.data.gcd.amount = action.payload.amount
  })
}
