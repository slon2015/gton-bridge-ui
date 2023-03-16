import { ExtraReducersApply } from '@src/state/features/connectWallet'
import { fetchNetworkMintStateAction } from '@src/state/features/common/thunks/fetchNetworkStatus'
import { WalletState } from '../types'

export const extraReducers: ExtraReducersApply<WalletState> = (builder) => {
  return builder
    .addCase(fetchNetworkMintStateAction.fulfilled, (state, action) => {
      state.data = {
        status: 'initialised',
        chainId: action.meta.arg.chainId,
        address: action.meta.arg.ownerAddress,
        contracts: action.meta.arg.contracts,
        colateralAssets: action.payload.colateralAssets.map((asset) => ({
          name: asset.name,
          decimals: asset.decimals,
          address: asset.address,
          amount: asset.amount,
          riskRatio: asset.riskRatio,
        })),
      }
    })
    .addCase(fetchNetworkMintStateAction.pending, (state, action) => {
      state.data = {
        status: 'initialisation',
        chainId: action.meta.arg.chainId,
        address: action.meta.arg.ownerAddress,
      }
    })
    .addCase(fetchNetworkMintStateAction.rejected, (state, action) => {
      state.data = {
        status: 'init-error',
        chainId: action.meta.arg.chainId,
        address: action.meta.arg.ownerAddress,
      }
    })
}
