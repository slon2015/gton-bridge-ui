import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import {
  AssetApproveRequest,
  AssetApproveResponse,
} from '@src/state/features/gcd/types'
import { fetchAssetAllowance } from '@src/state/features/common/fetchTokenAllowance'

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
