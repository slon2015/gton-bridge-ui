import { FullMintCollateralAsset } from '@src/components/MintForm/types'
import { NetworkContracts } from '@src/config/networks'
import type { BigNumberish } from 'ethers'

export type ColateralAsset = {
  address: string
  approvedAmmount: string
  operation: 'none' | 'approveInProgress' | 'mintInProgress'
  conversionRate?: string
}

export type InitialisedMintState = {
  status: 'received'
  colateralAssets: Array<ColateralAsset>
}

export type MintState = {
  data:
    | InitialisedMintState
    | {
        status: 'initialisation'
      }
    | {
        status: 'init-error'
      }
}

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

export type NetworkSpecificMintState = Required<
  Pick<InitialisedMintState, 'colateralAssets'>
>

export type AssetApproveRequest = {
  address: string
  ownerAddress: string
  contracts: Pick<NetworkContracts, 'vaultContractAddress'>
  amount: BigNumberish
}

export type AssetApproveResponse = {
  approvedAmount: string
}

export type JoinGcdRequest = {
  assetAddress: string
  gcdAmount: string
  asset: FullMintCollateralAsset
  mintInputAmount: BigNumberish
  ownerAddress: string
  contracts: Pick<
    NetworkContracts,
    'cdpManagerContractAddress' | 'vaultContractAddress' | 'gcdContractAddress'
  >
}

export type JoinGcdResponse = {
  updatedAsset: {
    amount: string
    approvedAmmount: string
  }
  gcdAmount: string
}

export type UpdateUsdRateRequest = {
  assetAddress: string
  assetDecimals: number
  riskRatio: number
  contracts: Pick<
    NetworkContracts,
    'oracleAddress' | 'vaultParametersContractAddress'
  >
}
