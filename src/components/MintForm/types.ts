import { NetworkContracts } from '@src/config/networks'
import { ColateralAsset as MintCollateralAsset } from '@src/state/features/gcd'
import { ColateralAsset as CommonCollateralAsset } from '@src/state/features/connectWallet'
import { BigNumber } from 'ethers'

export type MintFormProps = {
  assetAddress: string
  ownerAddress: string
  amount?: string
}

export type Approves = {
  minimalApproveAmount: BigNumber
  requestApproveAmount: BigNumber
}

export type FullMintCollateralAsset = MintCollateralAsset &
  CommonCollateralAsset

export type MintFormState = (
  | {
      status: 'emptyAmount'
    }
  | {
      status: 'needApprove'
      minimalApproveAmount: BigNumber
      shouldBeApproved: BigNumber
    }
  | {
      status: 'readyToMint'
      ownerAddress: string
    }
) & {
  asset: FullMintCollateralAsset
  chainId: number
  contracts: NetworkContracts
}
