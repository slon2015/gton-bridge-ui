import { createAsyncThunk } from '@reduxjs/toolkit'
import OracleService from '@src/services/oracle'
import VaultParametersService from '@src/services/vaultParameters'
import { BigNumber } from 'ethers'
import type { UpdateUsdRateRequest } from '@src/state/features/gcd/types'

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
