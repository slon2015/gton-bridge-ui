import React, { Fragment, useEffect, useState } from 'react'
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
import BridgeFrom from './components/BridgeForm/component'
import { BigNumber } from 'ethers'
import { toWei } from './utils/currency'

function App() {
  const { status, connect, account, chainId, switchChain, ethereum } =
    useMetaMask()

  const [mintAmount, setMintAmount] = useState(BigNumber.from(0))

  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => ({
    ...state.wallet,
    isInitialized:
      state.gcd.data.status === 'received' &&
      state.wallet.data.status === 'initialised' &&
      state.bridge.data.status === 'initialised',
    assets:
      state.gcd.data.status === 'received'
        ? state.gcd.data.colateralAssets
        : null,
    vaultAddress:
      state.wallet.data.status === 'initialised'
        ? state.wallet.data.contracts.vaultContractAddress
        : null,
  }))

  const numericChainId = Number(chainId)

  useEffect(() => {
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
  }, [account, status, numericChainId, switchChain, dispatch, ethereum])

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
        <h2>Mint</h2>
        <span>How many GCD you want to mint?</span>
        <br />
        <input
          type="number"
          onChange={(e) => setMintAmount(toWei(e.target.value, 18))}
        />
        <br />
        <h3>Assets</h3>
        {state.assets.map((asset, i) => (
          <MintForm
            assetAddress={asset.address}
            ownerAddress={account}
            amount={mintAmount}
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
        {account && !Number.isNaN(numericChainId) && state.isInitialized && (
          <BridgeFrom account={account} chainId={numericChainId} />
        )}
        {assets}
      </header>
    </div>
  )
}

export default App
