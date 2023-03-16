import type { MintState } from '@src/state/features/gcd/types'
import { fetchNetworkMintStateAction } from '@src/state/features/common/thunks/fetchNetworkStatus'
import { ExtraReducersApply } from '@src/state/features/connectWallet'

export const extraReducers: ExtraReducersApply<MintState> = (builder) => {
  return builder
    .addCase(fetchNetworkMintStateAction.fulfilled, (state, action) => {
      state.data = {
        status: 'received',
        colateralAssets: action.payload.colateralAssets.map((asset) => ({
          address: asset.address,
          approvedAmmount: asset.allowances.vault,
          operation: 'none',
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
