import { InitialisedWalletState } from '@src/state/features/connectWallet'
import { InitialisedMintState } from '@src/state/features/gcd/types'
import { RootState } from '@src/state/store'
import { BigNumber, BigNumberish } from 'ethers'
import { useSelector } from 'react-redux'
import { approveAmmounts } from '@src/utils/approves'
import { FullMintCollateralAsset, MintFormState } from '../types'

function resolveFullAssetInfo(
  state: RootState,
  assetAddress: string
): FullMintCollateralAsset {
  const mint = (state.gcd.data as InitialisedMintState).colateralAssets.filter(
    (asset) => asset.address === assetAddress
  )[0]

  const common = (
    state.wallet.data as InitialisedWalletState
  ).colateralAssets.filter((asset) => asset.address === assetAddress)[0]

  return {
    ...mint,
    ...common,
  }
}

export function useMintFormState(
  assetAddress: string,
  mintAmount?: BigNumberish
): MintFormState {
  return useSelector<RootState, MintFormState>((state) => {
    if (
      state.gcd.data.status !== 'received' ||
      state.wallet.data.status !== 'initialised'
    ) {
      throw new Error('Mint not received')
    }

    const asset = resolveFullAssetInfo(state, assetAddress)
    const chainId = state.wallet.data.chainId

    const amountToFulfill =
      mintAmount && asset.conversionRate
        ? BigNumber.from(mintAmount)
            .div(asset.conversionRate)
            .mul(BigNumber.from(10).pow(asset.decimals))
        : undefined

    if (BigNumber.from(asset.amount).eq(0)) {
      return {
        status: 'emptyAmount',
        asset,
        chainId,
        contracts: state.wallet.data.contracts,
        amountToFulfill,
      }
    }

    const approves = approveAmmounts(asset.decimals, {
      mintAmount: mintAmount ? BigNumber.from(mintAmount) : undefined,
    })

    if (
      BigNumber.from(asset.approvedAmmount).lt(approves.minimalApproveAmount)
    ) {
      return {
        status: 'needApprove',
        asset,
        shouldBeApproved: approves.requestApproveAmount,
        minimalApproveAmount: approves.minimalApproveAmount,
        chainId,
        contracts: state.wallet.data.contracts,
        amountToFulfill,
      }
    }

    return {
      status: 'readyToMint',
      asset,
      chainId,
      ownerAddress: state.wallet.data.address,
      contracts: state.wallet.data.contracts,
      amountToFulfill,
    }
  })
}
