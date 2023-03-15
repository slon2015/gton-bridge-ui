import Bep20Service from '@src/services/bep20'
import type { InitialCollateralAsset } from '@src/state/features/gcd/types'
import { BigNumber } from 'ethers'
import pAll from 'p-all'
import { fetchAssetAllowance } from './fetchTokenAllowance'
import { AllowanceFetchResult, FetchedAssetInfo } from './types'

export async function fetchAssetState<A extends Record<string, string>>(
  bep20: Bep20Service,
  ownerAddress: string,
  allowee: A,
  init: Omit<InitialCollateralAsset, 'riskRatio'>
): Promise<FetchedAssetInfo<A>> {
  const requests: [
    () => Promise<BigNumber>,
    () => Promise<number>,
    () => Promise<AllowanceFetchResult<A>>,
    () => Promise<string>
  ] = [
    () => bep20.getBalance(init.address, ownerAddress),
    () => bep20.getDecimals(init.address),
    () => fetchAssetAllowance(bep20, init.address, ownerAddress, allowee),
    () => bep20.getName(init.address),
  ]

  const [amount, decimals, { allowances }, name] = await pAll(requests, {
    concurrency: 1,
  })

  return {
    name,
    address: init.address,
    amount: amount.toString(),
    decimals,
    allowances,
  }
}
