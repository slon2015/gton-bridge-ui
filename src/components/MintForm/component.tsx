import React, { useEffect, Fragment } from 'react'
import { useMintFormState } from './hooks/useMintFormState'
import { MintFormProps } from './types'
import { useDispatch } from '@src/state/store'
import {
  approveAssetForMintAction,
  joinGcdAction,
  updateUsdRateAction,
} from '@src/state/features/gcd'
import { formatCurrency } from '@src/utils/currency'

const MintForm = ({ amount, ownerAddress, assetAddress }: MintFormProps) => {
  const state = useMintFormState(assetAddress, amount)
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.status === 'readyToMint') {
        dispatch(
          updateUsdRateAction({
            assetAddress: state.asset.address,
            assetDecimals: state.asset.decimals,
            riskRatio: state.asset.riskRatio,
            contracts: state.contracts,
          })
        )
      }
    }, 3000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.asset.address, state.chainId, state.status])

  const approve = async () => {
    if (state.status === 'needApprove') {
      dispatch(
        approveAssetForMintAction({
          address: state.asset.address,
          amount: state.shouldBeApproved,
          ownerAddress,
          contracts: state.contracts,
        })
      )
    }
  }

  const mint = async () => {
    if (state.status === 'readyToMint' && amount && state.amountToFulfill) {
      dispatch(
        joinGcdAction({
          assetAddress: state.asset.address,
          mintInputAmount: state.amountToFulfill,
          asset: state.asset,
          gcdAmount: amount.toString(),
          ownerAddress: state.ownerAddress,
          contracts: state.contracts,
        })
      )
    }
  }

  let form: JSX.Element = <Fragment></Fragment>

  const buttonAvailable =
    state.asset.operation === 'none' && amount && amount.gt(0)

  if (state.status === 'emptyAmount') {
    form = <span>No asset found. Please top-up it and refresh page</span>
  }
  if (state.status === 'needApprove') {
    form = (
      <div>
        <span key="balance">
          Your balance{' '}
          {formatCurrency(state.asset.amount, state.asset.decimals)}{' '}
          {state.asset.name}
        </span>
        <br />
        <span key="approve">
          Approve for{' '}
          {formatCurrency(state.shouldBeApproved, state.asset.decimals)}{' '}
          {state.asset.name}
        </span>
        <br />
        {buttonAvailable && <button onClick={approve}>Approve</button>}
      </div>
    )
  }
  if (state.status === 'readyToMint') {
    const conversionRate = state.asset.conversionRate
      ? formatCurrency(state.asset.conversionRate, 18)
      : null
    form = (
      <div>
        <span key="balance">
          Your balance{' '}
          {formatCurrency(state.asset.amount, state.asset.decimals)} coins
        </span>
        <br />
        {conversionRate && (
          <Fragment>
            <span key="mint">
              You able to mint {conversionRate} GCD for 1 {state.asset.name}
            </span>
            <br />
            {state.amountToFulfill && amount && (
              <Fragment>
                <span>
                  {' '}
                  You need{' '}
                  {formatCurrency(
                    state.amountToFulfill,
                    state.asset.decimals
                  )}{' '}
                  {state.asset.name} to mint {formatCurrency(amount, 18)} GCD
                </span>
                <br />
              </Fragment>
            )}
            {buttonAvailable && <button onClick={mint}>Mint</button>}
          </Fragment>
        )}
      </div>
    )
  }

  return (
    <div>
      <h3>{state.asset.name}</h3>

      {form}
    </div>
  )
}

export default MintForm
