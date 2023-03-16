import React, { Fragment, useState } from 'react'
import { formatCurrency, toWei } from '@src/utils/currency'
import { useBridgeFormState } from './hooks/useBridgeFormState'
import { useFetchGcdAmountEffect } from './hooks/useFetchGcdAmountEffect'
import { BridgeFormProps } from './types'
import methods from './methods'
import { useDispatch } from '@src/state/store'
import { BigNumber } from 'ethers'

const BridgeFrom = ({ account, chainId }: BridgeFormProps) => {
  const state = useBridgeFormState()
  const dispatch = useDispatch()

  const [amountToBridge, setAmountToBridge] = useState(BigNumber.from('0'))

  useFetchGcdAmountEffect(state.contracts, account, chainId)

  if (state.status === 'needApprove') {
    const approve = methods.approve.bind(
      null,
      dispatch,
      state.contracts,
      account,
      state.shouldBeApproved
    )
    return (
      <div>
        <h2>Bridge</h2>
        <br />
        <span>You have {formatCurrency(state.gcd.amount, 18)} GCD</span>
        <br />
        <span>
          You need to approve {formatCurrency(state.shouldBeApproved, 18)} GCD
        </span>
        <br />
        <button onClick={approve.bind(null, state.shouldBeApproved)}>
          Approve
        </button>
      </div>
    )
  }

  if (state.status === 'readyToBridge') {
    const bridge = methods.bridge.bind(
      null,
      dispatch,
      state.contracts,
      account,
      amountToBridge
    )
    return (
      <div>
        <h2>Bridge</h2>
        <br />
        <span>You have {formatCurrency(state.gcd.amount, 18)} GCD</span>
        <br />
        <span>How many GCD you want to bridge?</span>
        <br />
        <input
          type={'number'}
          onChange={(e) => setAmountToBridge(toWei(e.target.value, 18))}
        />
        <br />
        <button onClick={bridge}>Bridge</button>
      </div>
    )
  }

  return <Fragment />
}

export default BridgeFrom
