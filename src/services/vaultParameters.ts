import { IVaultParameters } from '@contracts/IVaultParameters'
import { utils, Signer, providers } from 'ethers'
import { IVaultParameters__factory as VaultParametersFactory } from '@contracts/factories/IVaultParameters__factory'

export default class VaultParametersService {
  private static _instance: VaultParametersService | null = null

  private signer: Signer

  constructor() {
    this.signer = new providers.Web3Provider(window.ethereum).getSigner()
  }

  static getInstance(): VaultParametersService {
    if (!this._instance) {
      this._instance = new VaultParametersService()
    }
    return this._instance
  }

  private provideContract(address: string): IVaultParameters {
    if (!utils.isAddress(address)) {
      throw new Error('Invalid vault parameters address')
    }
    return VaultParametersFactory.connect(address, this.signer)
  }

  async getColateralRatio(
    vpAddress: string,
    assetAddress: string
  ): Promise<number> {
    if (!utils.isAddress(assetAddress)) {
      throw new Error('Invalid asset address')
    }

    const parameters = this.provideContract(vpAddress)
    const ratio = await parameters.initialCollateralRatio(assetAddress)

    return ratio.toNumber()
  }
}
