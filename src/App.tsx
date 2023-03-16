import React, { Fragment, useEffect } from 'react'
import './App.css'
import { useMetaMask } from 'metamask-react'
import { useSelector } from 'react-redux'
import {
  metamaskChangeChainRequested,
  metamaskConnected,
  metamaskUnavaliable,
} from '@src/state/features/connectWallet'
import { RootState, useDispatch } from '@src/state/store'
import {
  supportedChainIds,
  defaultChain,
  mintInitNetworkInfo,
  supportedNetworks,
} from '@src/config/networks'
import MintForm from '@src/components/MintForm'
import { fetchNetworkMintStateAction } from './state/features/common/thunks/fetchNetworkStatus'

function App() {
  const { status, connect, account, chainId, switchChain, ethereum } =
    useMetaMask()

  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => ({
    ...state.wallet,
    isInitialized:
      state.gcd.data.status === 'received' &&
      state.wallet.data.status === 'initialized',
    assets:
      state.gcd.data.status === 'received'
        ? state.gcd.data.colateralAssets
        : null,
    vaultAddress:
      state.wallet.data.status === 'initialized'
        ? state.wallet.data.contracts.vaultContractAddress
        : null,
  }))

  useEffect(() => {
    const numericChainId = Number(chainId)

    if (status === 'connected') {
      ethereum.once('chainChanged', (chainId: string) => {
        dispatch(
          metamaskConnected({
            chainId: Number(chainId),
            address: account,
          })
        )
      })

      if (!supportedChainIds.includes(numericChainId)) {
        dispatch(
          metamaskChangeChainRequested({
            currentChainId: numericChainId,
            chainId: defaultChain.chainId,
            chainName: defaultChain.chainName,
          })
        )
        switchChain('0x' + defaultChain.chainId.toString(16))
      } else {
        dispatch(
          metamaskConnected({
            chainId: numericChainId,
            address: account,
          })
        )

        const networkInfo = supportedNetworks.filter(
          (net) => net.chainId === numericChainId
        )[0]

        dispatch(
          fetchNetworkMintStateAction(mintInitNetworkInfo(networkInfo, account))
        )
      }
    }

    if (status === 'unavailable') {
      dispatch(metamaskUnavaliable())
    }
  }, [account, status, chainId, switchChain, dispatch, ethereum])

  let statusElem: JSX.Element | null = null

  if (state.data.status === 'unavailable')
    statusElem = <div>MetaMask not available :(</div>

  if (state.data.status === 'notConnected')
    statusElem = <button onClick={connect}>Connect to MetaMask</button>

  if (state.data.status === 'connected') statusElem = null

  if (state.data.status === 'inappropriateNetwork')
    statusElem = (
      <div>
        Connected to wrong network. You need to switch to{' '}
        {state.data.changeRequested.toChainName}. Check your metamask extension
      </div>
    )

  let assets: JSX.Element

  if (
    account &&
    state.vaultAddress != null &&
    state.assets != null &&
    state.isInitialized
  ) {
    assets = (
      <Fragment>
        <h2>Assets</h2>
        {state.assets.map((asset, i) => (
          <MintForm
            assetAddress={asset.address}
            ownerAddress={account}
            amount="100000000000000000000"
            key={i}
          />
        ))}
      </Fragment>
    )
  } else {
    assets = <Fragment></Fragment>
  }

  return (
    <div className="App">
      <header className="App-header">
        {statusElem}
        {assets}
      </header>
    </div>
  )
}

export default App
