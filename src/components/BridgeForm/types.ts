import { NetworkContracts } from '@src/config/networks'

export type BridgeFormState = {
  contracts: Pick<
    NetworkContracts,
    'gcdContractAddress' | 'layer1BridgeContractAddress'
  >
  gcdAmount: string
  gcdApprovedAmmount: string
}
