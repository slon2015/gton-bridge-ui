import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { NetworkContracts } from '@src/config/networks'

export type ColateralAsset = {
  name: string
  address: string
  amount: string
  decimals: number
  riskRatio: number
}

export type ConnectedWalletState = {
  status: 'connected' | 'initialisation' | 'init-error'
  chainId: number
  address: string
}

export type InitialisedWalletState = Omit<ConnectedWalletState, 'status'> & {
  status: 'initialised'
  colateralAssets: Array<ColateralAsset>
  contracts: NetworkContracts
}

export type InappropriateNetworkWalletState = {
  status: 'inappropriateNetwork'
  changeRequested: {
    toChainId: number
    toChainName: string
  }
}

export type WalletState = {
  data:
    | InitialisedWalletState
    | ConnectedWalletState
    | InappropriateNetworkWalletState
    | {
        status: 'notConnected' | 'unavailable'
      }
}

export type NetworkConnected = {
  chainId: number
  address: string
}

export type ChangeNetworkRequest = {
  currentChainId: number
  chainId: number
  chainName: string
}

export type ExtraReducersApply<S> = (
  builder: ActionReducerMapBuilder<S>
) => ActionReducerMapBuilder<S>
