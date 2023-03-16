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
    const { assetAddress, assetAmount, gcdAmount, ownerAddress, contracts } =
      action
    const { cdpManagerContractAddress, vaultContractAddress } = contracts

    await manager.join(
      cdpManagerContractAddress,
      BigNumber.from(gcdAmount),
      assetAddress,
      BigNumber.from(assetAmount)
    )

    const bep20 = Bep20Service.getInstance()

    const asset = await fetchAssetState(
      bep20,
      ownerAddress,
      { vault: vaultContractAddress },
      {
        address: assetAddress,
      }
    )

    const { amount, allowances } = asset
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
