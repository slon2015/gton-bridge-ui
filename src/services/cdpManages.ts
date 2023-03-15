import { ICDPManager as CDPManager } from '@contracts/ICDPManager'
import { utils, Signer, providers, BigNumberish } from 'ethers'
import { ICDPManager__factory as CDPManagerFactory } from '@contracts/factories/ICDPManager__factory'

export default class CDPManagerService {
  private static _instance: CDPManagerService | null = null

  private signer: Signer

  constructor() {
    this.signer = new providers.Web3Provider(window.ethereum).getSigner()
  }

  static getInstance(): CDPManagerService {
    if (!this._instance) {
      this._instance = new CDPManagerService()
    }
    return this._instance
  }

  private provideContract(address: string): CDPManager {
    if (!utils.isAddress(address)) {
      throw new Error('Invalid manager address')
    }
    return CDPManagerFactory.connect(address, this.signer)
  }

  async join(
    managerAddress: string,
    gcdAmount: BigNumberish,
    assetAddress: string,
    assetAmount: BigNumberish
  ): Promise<void> {
    const manager = this.provideContract(managerAddress)

    if (!utils.isAddress(assetAddress)) {
      throw new Error('Invalid asset address')
    }

    const tx = await manager.join(assetAddress, assetAmount, gcdAmount)
    await tx.wait()
  }
}
