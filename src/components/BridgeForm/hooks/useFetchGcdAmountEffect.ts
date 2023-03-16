import { fetchGcdAmount } from '@src/state/features/bridge'
import { useDispatch } from '@src/state/store'
import { useEffect } from 'react'
import { BridgeFormState } from '../types'

export function useFetchGcdAmountEffect(
  contracts: BridgeFormState['contracts'],
  ownerAddress: string,
  chainId: number
) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      fetchGcdAmount({
        contracts,
        ownerAddress,
      })
    )
    const interval = setInterval(() => {
      dispatch(
        fetchGcdAmount({
          contracts,
          ownerAddress,
        })
      )

      return () => clearInterval(interval)
    }, 3000)
  }, [
    ownerAddress,
    chainId,
    contracts.gcdContractAddress,
    contracts.layer1BridgeContractAddress,
  ])
}
