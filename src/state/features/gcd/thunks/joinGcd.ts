import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import CDPManagerService from '@src/services/cdpManages'
import { BigNumber } from 'ethers'
import { fetchAssetState } from '@src/state/features/common/fetchAssetState'
import type {
  JoinGcdRequest,
  JoinGcdResponse,
} from '@src/state/features/gcd/types'

export const joinGcdAction = createAsyncThunk<JoinGcdResponse, JoinGcdRequest>(
  'gcd/joinGcd',
  async (action) => {
    const manager = CDPManagerService.getInstance()
    const {
      assetAddress,
      asset,
      gcdAmount,
      ownerAddress,
      contracts,
      mintInputAmount,
    } = action
    const { cdpManagerContractAddress, vaultContractAddress } = contracts

    await manager.join(
      cdpManagerContractAddress,
      BigNumber.from(gcdAmount),
      assetAddress,
      BigNumber.from(mintInputAmount)
    )

    const bep20 = Bep20Service.getInstance()

    const fetchedAsset = await fetchAssetState(
      bep20,
      ownerAddress,
      { vault: vaultContractAddress },
      {
        address: assetAddress,
        name: asset.name,
        decimals: asset.decimals,
      }
    )

    const { amount, allowances } = fetchedAsset
    const newGcdAmount = await bep20.getBalance(
      contracts.gcdContractAddress,
      ownerAddress
    )

    return {
      updatedAsset: {
        approvedAmmount: allowances.vault,
        amount,
      },
      gcdAmount: newGcdAmount.toString(),
    }
  }
)
