import type { MintState } from '@src/state/features/gcd/types'
import { fetchNetworkMintStateAction } from '@src/state/features/common/thunks/fetchNetworkStatus'
import { ThunkApply } from '@src/state/features/connectWallet'

export const thunkApply: ThunkApply<MintState> = (builder) => {
  return builder
    .addCase(fetchNetworkMintStateAction.fulfilled, (state, action) => {
      state.data = {
        status: 'received',
        ...action.payload,
        contracts: action.meta.arg.contracts,
        colateralAssets: action.payload.colateralAssets.map((asset) => ({
          address: asset.address,
          approvedAmmount: asset.allowances.vault,
          operation: 'none',
          riskRatio: asset.riskRatio,
        })),
      }
    })
    .addCase(fetchNetworkMintStateAction.pending, (state) => {
      state.data = {
        status: 'initialisation',
      }
    })
    .addCase(fetchNetworkMintStateAction.rejected, (state) => {
      state.data = {
        status: 'init-error',
      }
    })
}
