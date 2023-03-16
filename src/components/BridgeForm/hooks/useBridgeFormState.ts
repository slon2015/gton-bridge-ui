import { RootState } from '@src/state/store'
import { BigNumber } from 'ethers'
import { useSelector } from 'react-redux'
import { BridgeFormState } from '../types'
import { approveAmmounts } from '@src/utils/approves'

export function useBridgeFormState(): BridgeFormState {
  return useSelector<RootState, BridgeFormState>((state) => {
    if (
      state.wallet.data.status !== 'initialised' ||
      state.bridge.data.status !== 'initialised'
    ) {
      throw new Error('App not initialized')
    }

    const approvedAmount = BigNumber.from(state.bridge.data.gcd.approvedAmount)
    const approves = approveAmmounts(18)

    if (approvedAmount.lt(approves.minimalApproveAmount)) {
      return {
        contracts: state.wallet.data.contracts,
        gcd: state.bridge.data.gcd,
        status: 'needApprove',
        shouldBeApproved: approves.requestApproveAmount,
      }
    }

    return {
      contracts: state.wallet.data.contracts,
      gcd: state.bridge.data.gcd,
      status: 'readyToBridge',
    }
  })
}
