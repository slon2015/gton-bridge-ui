type InitializedBridgeData = {
  status: 'initialized'
  gcd: {
    amount: string
    approvedAmount: string
  }
}

export type BridgeState = {
  data:
    | InitializedBridgeData
    | {
        status: 'initialisation' | 'init-error'
      }
}
