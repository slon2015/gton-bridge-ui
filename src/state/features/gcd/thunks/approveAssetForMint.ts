import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import {
  AssetApproveRequest,
  AssetApproveResponse,
  MintState,
} from '@src/state/features/gcd/types'
import setCollateralAssetOperationType from '@src/state/features/gcd/setColatteralAssetOperationStatus'
import { fetchAssetAllowance } from '@src/state/features/common/fetchTokenAllowance'
import { ThunkApply } from '@src/state/features/connectWallet'

export const approveAssetForMintAction = createAsyncThunk<
  AssetApproveResponse,
  AssetApproveRequest
>('gcd/approveAssetForMint', async (action) => {
  const { address, ownerAddress, contracts, amount } = action
  const bep20 = Bep20Service.getInstance()

  await bep20.approve(address, contracts.vaultContractAddress, amount)

  const { allowances } = await fetchAssetAllowance(
    bep20,
    address,
    ownerAddress,
    { vault: contracts.vaultContractAddress }
  )

  return {
    approvedAmount: allowances.vault,
  }
})

export const thunkApply: ThunkApply<MintState> = (builder) => {
  return builder
    .addCase(approveAssetForMintAction.rejected, (state, action) =>
      setCollateralAssetOperationType(state, action.meta.arg.address, 'none')
    )
    .addCase(approveAssetForMintAction.pending, (state, action) =>
      setCollateralAssetOperationType(state, action.meta.arg.address, 'none')
    )
    .addCase(approveAssetForMintAction.fulfilled, (state, action) => {
      if (state.data.status === 'received') {
        const assetIndex = state.data.colateralAssets.findIndex(
          (asset) => asset.address === action.meta.arg.address
        )
        if (assetIndex === -1) {
          throw new Error('Asset not found')
        }

        state.data.colateralAssets[assetIndex].approvedAmmount =
          action.payload.approvedAmount
        setCollateralAssetOperationType(state, assetIndex, 'none')
      } else {
        throw new Error('State still not received')
      }
    })
}
