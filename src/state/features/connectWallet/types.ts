import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

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

export type InitializedWalletState = Omit<ConnectedWalletState, 'status'> & {
  status: 'initialized'
  colateralAssets: Array<ColateralAsset>
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
    | InitializedWalletState
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

export type ThunkApply<S> = (
  builder: ActionReducerMapBuilder<S>
) => ActionReducerMapBuilder<S>
