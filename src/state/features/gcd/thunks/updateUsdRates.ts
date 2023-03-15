import { createAsyncThunk } from '@reduxjs/toolkit'
import OracleService from '@src/services/oracle'
import VaultParametersService from '@src/services/vaultParameters'
import { BigNumber } from 'ethers'
import type {
  MintState,
  UpdateUsdRateRequest,
} from '@src/state/features/gcd/types'
import { ThunkApply } from '@src/state/features/connectWallet'

export const updateUsdRateAction = createAsyncThunk<
  string,
  UpdateUsdRateRequest
>(
  'gcd/updateUsdRate',
  async ({ assetAddress, assetDecimals, riskRatio, contracts }) => {
    const { oracleAddress, vaultParametersContractAddress } = contracts
    const oracle = OracleService.getInstance()
    const parameters = VaultParametersService.getInstance()

    const [rate, collateralCoef] = await Promise.all([
      oracle.usdRate(
        oracleAddress,
        assetAddress,
        BigNumber.from(10).pow(assetDecimals)
      ),
      parameters.getColateralRatio(
        vaultParametersContractAddress,
        assetAddress
      ),
    ])

    return rate.mul(collateralCoef).div(100).mul(riskRatio).div(100).toString()
  }
)

export const thunkApply: ThunkApply<MintState> = (builder) => {
  return builder.addCase(updateUsdRateAction.fulfilled, (state, action) => {
    if (state.data.status === 'received') {
      const assetIndex = state.data.colateralAssets.findIndex(
        (asset) => asset.address === action.meta.arg.assetAddress
      )
      if (assetIndex === -1) {
        throw new Error('Asset not found')
      }

      state.data.colateralAssets[assetIndex].conversionRate = action.payload
    } else {
      throw new Error('State still not received')
    }
  })
}
