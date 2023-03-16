import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import {
  AssetApproveRequest,
  AssetApproveResponse,
} from '@src/state/features/bridge/types'
import { fetchAssetAllowance } from '@src/state/features/common/fetchTokenAllowance'

export const approveAssetForBridge = createAsyncThunk<
  AssetApproveResponse,
  AssetApproveRequest
>('bridge/approveAssetForBridge', async (action) => {
  const { ownerAddress, contracts, amount } = action
  const bep20 = Bep20Service.getInstance()

  await bep20.approve(
    contracts.gcdContractAddress,
    contracts.layer1BridgeContractAddress,
    amount
  )

  const { allowances } = await fetchAssetAllowance(
    bep20,
    contracts.gcdContractAddress,
    ownerAddress,
    { bridge: contracts.layer1BridgeContractAddress }
  )

  return {
    approvedAmount: allowances.bridge,
  }
})
