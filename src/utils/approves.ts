import { BigNumber } from 'ethers'

export type Approves = {
  minimalApproveAmount: BigNumber
  requestApproveAmount: BigNumber
}

type ApproveOptions = {
  mintAmount: BigNumber
  minApproveTokensCount: number
  targetApproveMultiplyer: number
}

export function approveAmmounts(
  decimals: number,
  options?: Partial<ApproveOptions>
): Approves {
  const minimalApproveAmount = BigNumber.from(10)
    .pow(decimals)
    .mul(options?.minApproveTokensCount || 100)

  const requestApproveAmount = minimalApproveAmount.mul(
    options?.targetApproveMultiplyer || 10
  )
  if (!options?.mintAmount || requestApproveAmount.gt(options.mintAmount)) {
    return {
      minimalApproveAmount,
      requestApproveAmount,
    }
  }

  return {
    minimalApproveAmount,
    requestApproveAmount: options.mintAmount,
  }
}
