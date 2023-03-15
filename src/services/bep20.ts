import { IBEP20 as BEP20 } from '@contracts/IBEP20'
import { utils, Signer, providers, BigNumber, BigNumberish } from 'ethers'
import { IBEP20__factory as BEP20Factory } from '@contracts/factories/IBEP20__factory'

export default class Bep20Service {
  private static _instance: Bep20Service | null = null

  private signer: Signer

  constructor() {
    this.signer = new providers.Web3Provider(window.ethereum).getSigner()
  }

  static getInstance(): Bep20Service {
    if (!this._instance) {
      this._instance = new Bep20Service()
    }
    return this._instance
  }

  private provideContract(address: string): BEP20 {
    if (!utils.isAddress(address)) {
      throw new Error('Invalid asset address')
    }
    return BEP20Factory.connect(address, this.signer)
  }

  async getBalance(
    assetAddress: string,
    eoaAddress: string
  ): Promise<BigNumber> {
    if (!utils.isAddress(eoaAddress)) {
      throw new Error('Invalid eoa address')
    }
    const asset = this.provideContract(assetAddress)

    return asset.balanceOf(eoaAddress)
  }

  async getAllowance(
    assetAddress: string,
    ownerAddress: string,
    spenderAddress: string
  ): Promise<BigNumber> {
    if (!utils.isAddress(ownerAddress)) {
      throw new Error('Invalid owner address')
    }
    if (!utils.isAddress(spenderAddress)) {
      throw new Error('Invalid spender address')
    }
    const asset = this.provideContract(assetAddress)

    return asset.allowance(ownerAddress, spenderAddress)
  }

  async approve(
    assetAddress: string,
    spender: string,
    amount: BigNumberish
  ): Promise<void> {
    if (!utils.isAddress(spender)) {
      throw new Error('Invalid spender address')
    }
    const numericAmount = BigNumber.from(amount)

    const tx = await this.provideContract(assetAddress).approve(
      spender,
      numericAmount
    )
    await tx.wait()
  }

  async getDecimals(assetAddress: string): Promise<number> {
    return this.provideContract(assetAddress).decimals()
  }

  async getName(assetAddress: string): Promise<string> {
    return this.provideContract(assetAddress).symbol()
  }
}
