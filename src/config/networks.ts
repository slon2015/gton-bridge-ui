import {
  InitialCollateralAsset,
  InitialNetworkMintConfig,
} from '@src/state/features/gcd'

export type NetworkContracts = {
  vaultContractAddress: string
  vaultParametersContractAddress: string
  gcdContractAddress: string
  cdpManagerContractAddress: string
  oracleAddress: string
  layer1BridgeContractAddress: string
}

export type SupportedNetwork = {
  defaultChain?: boolean
  chainId: number
  chainName: string
  assets: Array<InitialCollateralAsset>
  contracts: NetworkContracts
}

export const supportedNetworks: Array<SupportedNetwork> = [
  {
    defaultChain: true,
    chainId: 97,
    chainName: 'bsc-testnet',
    contracts: {
      vaultContractAddress: '0xAAbBB7471bCA1C152C690f10A1A9e006FE17BD7e',
      vaultParametersContractAddress:
        '0x3888C25AcDaB370dc2B85550E0943B4253346174',
      gcdContractAddress: '0x213ecAe6b3CbC0AD976f7d82626546d5b63A71cB',
      layer1BridgeContractAddress: '0xbcAf2aCCc02034AAd3444c434270491A97e7BE2A',
      cdpManagerContractAddress: '0x6aA3cDc7a0Ab05C58105AA4C85568583f2b7e02f',
      oracleAddress: '0x67717ea6376F18F217b733eE18abaAD480dAC928',
    },
    assets: [
      {
        address: '0x39833193a76F41f457082F48aDc33cB0A631C8F6',
        riskRatio: 80,
      },
    ],
  },
]

export const defaultChain: SupportedNetwork =
  supportedNetworks.find((network) => network.defaultChain) ||
  supportedNetworks[0]

export const supportedChainIds = supportedNetworks.map((net) => net.chainId)

export function mintInitNetworkInfo(
  network: SupportedNetwork,
  address: string
): InitialNetworkMintConfig {
  const { chainId, contracts, assets } = network
  return {
    chainId,
    ownerAddress: address,
    colateralAssets: assets,
    contracts,
  }
}
