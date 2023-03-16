import Bep20Service from '@src/services/bep20'
import { AllowanceFetchResult } from './types'

export async function fetchAssetAllowance<A extends Record<string, string>>(
  bep20: Bep20Service,
  assetAddress: string,
  ownerAddress: string,
  allowee: A
): Promise<AllowanceFetchResult<A>> {
  const requests = Object.entries(allowee).map(async ([name, address]) => {
    const allowance = await bep20.getAllowance(
      assetAddress,
      ownerAddress,
      address
    )

    return [name, allowance.toString()]
  })

  return {
    allowances: Object.fromEntries(await Promise.all(requests)),
  } as AllowanceFetchResult<A>
}
