import React, {useEffect, Fragment } from "react"
import { useMintFormState } from "./hooks/useMintFormState"
import { MintFormProps } from './types'
import { useDispatch } from "@src/state/store"
import { approveAssetForMintAction, joinGcdAction, updateUsdRateAction } from "@src/state/features/gcd"
import { BigNumber } from "ethers"
import { formatCurrency } from "@src/utils/currency"

const MintForm = ({
    amount,
    ownerAddress,
    assetAddress,
  }: MintFormProps) => {
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
            amount: state.shouldBeApproved.mul(10),
            ownerAddress,
            contracts: state.contracts,
          })
        )
      }
    }
  
    const joinDefaultCount = 10
  
    const mint = async () => {
      if (state.status === 'readyToMint' && state.asset.conversionRate) {
        dispatch(
          joinGcdAction({
            assetAddress: state.asset.address,
            assetAmount: BigNumber.from(10)
              .pow(state.asset.decimals)
              .mul(joinDefaultCount)
              .toString(),
            gcdAmount: BigNumber.from(state.asset.conversionRate)
              .mul(joinDefaultCount)
              .toString(),
            ownerAddress: state.ownerAddress,
            contracts: state.contracts,
          })
        )
      }
    }
  
    let form: JSX.Element = <Fragment></Fragment>
  
    const buttonAvailable = state.asset.operation === 'none'
  
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

export default MintForm;
  