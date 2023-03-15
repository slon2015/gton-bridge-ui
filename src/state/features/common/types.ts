import type { NetworkContracts } from '@src/config/networks'
import { ColateralAsset } from '@src/state/features/connectWallet'

export type InitialCollateralAsset = {
  address: string
  riskRatio: number
}

export type InitialNetworkMintConfig = {
  ownerAddress: string
  chainId: number
  colateralAssets: Array<InitialCollateralAsset>
  contracts: NetworkContracts
}

export type NetworkSpecificState = {
  gcdAsset: {
    amount: string
    bridgeAllowedAmount: string
  }
  colateralAssets: Array<ColateralAsset & { allowances: { vault: string } }>
}

export type AllowanceFetchResult<A extends Record<string, string>> = {
  allowances: { [P in keyof A]: string }
}

export type FetchedAssetInfo<A extends Record<string, string>> =
  AllowanceFetchResult<A> &
    Omit<
      ColateralAsset,
      'operation' | 'riskRatio' | 'conversionRate' | 'approvedAmmount'
    >
