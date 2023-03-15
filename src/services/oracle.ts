import { IOracleUsd as IOracle } from '@contracts/IOracleUsd'
import { utils, Signer, providers, BigNumberish, BigNumber } from 'ethers'
import { IOracleUsd__factory as IOracleFactory } from '@contracts/factories/IOracleUsd__factory'

export default class OracleService {
  private static _instance: OracleService | null = null

  private signer: Signer

  constructor() {
    this.signer = new providers.Web3Provider(window.ethereum).getSigner()
  }

  static getInstance(): OracleService {
    if (!this._instance) {
      this._instance = new OracleService()
    }
    return this._instance
  }

  private provideContract(address: string): IOracle {
    if (!utils.isAddress(address)) {
      throw new Error('Invalid oracle address')
    }
    return IOracleFactory.connect(address, this.signer)
  }

  async usdRate(
    oracleAddress: string,
    assetAddress: string,
    amount: BigNumberish
  ): Promise<BigNumber> {
    const Q112 = '5192296858534827628530496329220096'

    if (!utils.isAddress(assetAddress)) {
      throw new Error('Invalid asset address')
    }

    const oracle = this.provideContract(oracleAddress)

    const result = await oracle.assetToUsd(assetAddress, amount)

    return result.div(Q112)
  }
}
