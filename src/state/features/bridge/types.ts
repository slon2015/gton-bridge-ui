import { NetworkContracts } from '@src/config/networks'
import { BigNumberish } from 'ethers'

export type InitialisedBridgeData = {
  status: 'initialised'
  gcd: {
    amount: string
    approvedAmount: string
    operation: 'none' | 'approveInProgress' | 'bridgeInProgress'
  }
}

export type BridgeState = {
  data:
    | InitialisedBridgeData
    | {
        status: 'initialisation' | 'init-error'
      }
}

export type AssetApproveRequest = {
  ownerAddress: string
  contracts: Pick<
    NetworkContracts,
    'layer1BridgeContractAddress' | 'gcdContractAddress'
  >
  amount: BigNumberish
}

export type AssetApproveResponse = {
  approvedAmount: string
}

export type FetchGcdAmountRequest = {
  contracts: Pick<
    NetworkContracts,
    'layer1BridgeContractAddress' | 'gcdContractAddress'
  >
  ownerAddress: string
}

export type FetchGcdAmountResponse = Pick<
  InitialisedBridgeData['gcd'],
  'amount' | 'approvedAmount'
>

export type BridgeGcdRequest = {
  amount: BigNumberish
  contracts: Pick<
    NetworkContracts,
    'layer1BridgeContractAddress' | 'gcdContractAddress'
  >
  ownerAddress: string
}

export type BridgeGcdResponse = Pick<
  InitialisedBridgeData['gcd'],
  'amount' | 'approvedAmount'
>
