import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import {
  FetchGcdAmountRequest,
  FetchGcdAmountResponse,
} from '@src/state/features/bridge/types'
import { fetchAssetAllowance } from '@src/state/features/common/fetchTokenAllowance'

export const fetchGcdAmount = createAsyncThunk<
  FetchGcdAmountResponse,
  FetchGcdAmountRequest
>('bridge/fetchGcdAmount', async (action) => {
  const { ownerAddress, contracts } = action
  const bep20 = Bep20Service.getInstance()

  const amount = await bep20.getBalance(
    contracts.gcdContractAddress,
    ownerAddress
  )

  const { allowances } = await fetchAssetAllowance(
    bep20,
    contracts.gcdContractAddress,
    ownerAddress,
    { bridge: contracts.layer1BridgeContractAddress }
  )

  return {
    amount: amount.toString(),
    approvedAmount: allowances.bridge,
  }
})
