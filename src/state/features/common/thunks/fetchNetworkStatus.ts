import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import { fetchAssetState } from '@src/state/features/common/fetchAssetState'
import type {
  AllowanceFetchResult,
  InitialNetworkMintConfig,
  NetworkSpecificState,
} from '@src/state/features/common/types'
import { BigNumber } from 'ethers'
import { fetchAssetAllowance } from '../fetchTokenAllowance'

export const fetchNetworkMintStateAction = createAsyncThunk<
  NetworkSpecificState,
  InitialNetworkMintConfig
>('common/fetchNetworkState', async (action) => {
  const bep20 = Bep20Service.getInstance()

  const colateralAssets = await Promise.all(
    action.colateralAssets.map(async (asset) => {
      const blockchainData = await fetchAssetState(
        bep20,
        action.ownerAddress,
        { vault: action.contracts.vaultContractAddress },
        asset
      )

      return {
        ...blockchainData,
        riskRatio: asset.riskRatio,
      }
    })
  )

  const gcdRequests: [
    Promise<BigNumber>,
    Promise<AllowanceFetchResult<{ bridge: string }>>
  ] = [
    bep20.getBalance(action.contracts.gcdContractAddress, action.ownerAddress),
    fetchAssetAllowance(
      bep20,
      action.contracts.gcdContractAddress,
      action.ownerAddress,
      {
        bridge: action.contracts.layer1BridgeContractAddress,
      }
    ),
  ]

  const [gcdAmount, gcdAllowances] = await Promise.all(gcdRequests)

  return {
    colateralAssets: colateralAssets.map((asset) => ({
      ...asset,
    })),
    gcdAsset: {
      amount: gcdAmount.toString(),
      bridgeAllowedAmount: gcdAllowances.allowances.bridge,
    },
  }
})
