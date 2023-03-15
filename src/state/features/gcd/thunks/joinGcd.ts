import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import CDPManagerService from '@src/services/cdpManages'
import setCollateralAssetOperationType from '@src/state/features/gcd/setColatteralAssetOperationStatus'
import { BigNumber } from 'ethers'
import { fetchAssetState } from '@src/state/features/common/fetchAssetState'
import type {
  JoinGcdRequest,
  JoinGcdResponse,
  MintState,
} from '@src/state/features/gcd/types'
import { ThunkApply } from '@src/state/features/connectWallet'

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

export const thunkApply: ThunkApply<MintState> = (builder) => {
  return builder
    .addCase(joinGcdAction.pending, (state, action) =>
      setCollateralAssetOperationType(
        state,
        action.meta.arg.assetAddress,
        'mintInProgress'
      )
    )
    .addCase(joinGcdAction.rejected, (state, action) =>
      setCollateralAssetOperationType(
        state,
        action.meta.arg.assetAddress,
        'none'
      )
    )
    .addCase(joinGcdAction.fulfilled, (state, action) => {
      if (state.data.status === 'received') {
        const assetIndex = state.data.colateralAssets.findIndex(
          (asset) => asset.address === action.meta.arg.assetAddress
        )
        if (assetIndex === -1) {
          throw new Error('Asset not found')
        }

        state.data.colateralAssets[assetIndex].approvedAmmount =
          action.payload.updatedAsset.approvedAmmount
        setCollateralAssetOperationType(state, assetIndex, 'none')
      } else {
        throw new Error('State still not received')
      }
    })
}
