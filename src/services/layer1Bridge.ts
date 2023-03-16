import { ILayer1Bridge as Layer1Bridge } from '@contracts/ILayer1Bridge'
import { utils, Signer, providers, BigNumberish } from 'ethers'
import { ILayer1Bridge__factory as Layer1BridgeFactory } from '@contracts/factories/ILayer1Bridge__factory'

export default class Layer1BridgeService {
  private static _instance: Layer1BridgeService | null = null

  private signer: Signer

  constructor() {
    this.signer = new providers.Web3Provider(window.ethereum).getSigner()
  }

  static getInstance(): Layer1BridgeService {
    if (!this._instance) {
      this._instance = new Layer1BridgeService()
    }
    return this._instance
  }

  private provideContract(address: string): Layer1Bridge {
    if (!utils.isAddress(address)) {
      throw new Error('Invalid manager address')
    }
    return Layer1BridgeFactory.connect(address, this.signer)
  }

  async depositGcd(bridgeAddress: string, amount: BigNumberish): Promise<void> {
    const bridge = this.provideContract(bridgeAddress)

    const tx = await bridge.depositGCD(amount, '200000', '0x00')

    await tx.wait()
  }
}
