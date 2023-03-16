import { approveAssetForBridge } from '@src/state/features/bridge'
import { AppDispatch } from '@src/state/store'
import { BigNumberish } from 'ethers'
import { BridgeFormState } from '../types'

export function approve(
  dispatch: AppDispatch,
  contracts: BridgeFormState['contracts'],
  ownerAddress: string,
  amount: BigNumberish
) {
  dispatch(
    approveAssetForBridge({
      amount,
      contracts: {
        gcdContractAddress: contracts.gcdContractAddress,
        layer1BridgeContractAddress: contracts.layer1BridgeContractAddress,
      },
      ownerAddress,
    })
  )
}
