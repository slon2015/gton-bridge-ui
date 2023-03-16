import { createAsyncThunk } from '@reduxjs/toolkit'
import Bep20Service from '@src/services/bep20'
import Layer1BridgeService from '@src/services/layer1Bridge'
import {
  BridgeGcdRequest,
  BridgeGcdResponse,
} from '@src/state/features/bridge/types'
import { fetchAssetAllowance } from '@src/state/features/common/fetchTokenAllowance'

export const bridgeGcd = createAsyncThunk<BridgeGcdResponse, BridgeGcdRequest>(
  'bridge/bridgeGcd',
  async (action) => {
    const { ownerAddress, contracts, amount } = action
    const bep20 = Bep20Service.getInstance()
    const bridge = Layer1BridgeService.getInstance()

    await bridge.depositGcd(contracts.layer1BridgeContractAddress, amount)

    const newAmount = await bep20.getBalance(
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
      amount: newAmount.toString(),
      approvedAmount: allowances.bridge,
    }
  }
)
