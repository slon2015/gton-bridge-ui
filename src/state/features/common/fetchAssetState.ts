import Bep20Service from '@src/services/bep20'
import type { InitialCollateralAsset } from '@src/state/features/gcd/types'
import { BigNumber } from 'ethers'
import { fetchAssetAllowance } from './fetchTokenAllowance'
import { AllowanceFetchResult, FetchedAssetInfo } from './types'

export async function fetchAssetState<A extends Record<string, string>>(
  bep20: Bep20Service,
  ownerAddress: string,
  allowee: A,
  init: Omit<InitialCollateralAsset, 'riskRatio'> &
    Partial<{ name: string; decimals: number }>
): Promise<FetchedAssetInfo<A>> {
  const requests: [
    Promise<BigNumber>,
    Promise<number>,
    Promise<AllowanceFetchResult<A>>,
    Promise<string>
  ] = [
    bep20.getBalance(init.address, ownerAddress),
    init.decimals
      ? Promise.resolve(init.decimals)
      : bep20.getDecimals(init.address),
    fetchAssetAllowance(bep20, init.address, ownerAddress, allowee),
    init.name ? Promise.resolve(init.name) : bep20.getName(init.address),
  ]

  const [amount, decimals, { allowances }, name] = await Promise.all(requests)

  return {
    name,
    address: init.address,
    amount: amount.toString(),
    decimals,
    allowances,
  }
}
