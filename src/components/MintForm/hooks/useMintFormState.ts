import { InitializedWalletState } from '@src/state/features/connectWallet'
import { InitialisedMintState } from '@src/state/features/gcd/types'
import { RootState } from '@src/state/store'
import { BigNumber } from 'ethers'
import { useSelector } from 'react-redux'
import { approveMinimalAmmount } from '../approveAmmounts'
import { FullMintCollateralAsset, MintFormState } from '../types'

function resolveFullAssetInfo(
  state: RootState,
  assetAddress: string
): FullMintCollateralAsset {
  const mint = (state.gcd.data as InitialisedMintState).colateralAssets.filter(
    (asset) => asset.address === assetAddress
  )[0]

  const common = (
    state.wallet.data as InitializedWalletState
  ).colateralAssets.filter((asset) => asset.address === assetAddress)[0]

  return {
    ...mint,
    ...common,
  }
}

export function useMintFormState(
  assetAddress: string,
  mintAmount: string
): MintFormState {
  return useSelector<RootState, MintFormState>((state) => {
    if (
      state.gcd.data.status !== 'received' ||
      state.wallet.data.status !== 'initialized'
    ) {
      throw new Error('Mint not received')
    }

    const asset = resolveFullAssetInfo(state, assetAddress)
    const chainId = state.wallet.data.chainId

    if (BigNumber.from(asset.amount).eq(0)) {
      return {
        status: 'emptyAmount',
        asset,
        chainId,
        contracts: state.gcd.data.contracts,
      }
    }

    const shouldBeApproved = approveMinimalAmmount(
      asset.decimals,
      BigNumber.from(mintAmount)
    )

    if (BigNumber.from(asset.approvedAmmount).lt(shouldBeApproved)) {
      return {
        status: 'needApprove',
        asset,
        shouldBeApproved,
        chainId,
        contracts: state.gcd.data.contracts,
      }
    }

    return {
      status: 'readyToMint',
      asset,
      chainId,
      ownerAddress: state.wallet.data.address,
      contracts: state.gcd.data.contracts,
    }
  })
}
