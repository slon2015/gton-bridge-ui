import { NetworkContracts } from '@src/config/networks'
import { InitialisedBridgeData } from '@src/state/features/bridge'
import { BigNumber } from 'ethers'

export type BridgeFormProps = {
  account: string
  chainId: number
}

export type BridgeFormState = {
  contracts: Pick<
    NetworkContracts,
    'gcdContractAddress' | 'layer1BridgeContractAddress'
  >
  gcd: InitialisedBridgeData['gcd']
} & (
  | {
      status: 'needApprove'
      shouldBeApproved: BigNumber
    }
  | {
      status: 'readyToBridge'
    }
)
