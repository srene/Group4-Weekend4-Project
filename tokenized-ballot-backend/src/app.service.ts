import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyERC20Votes.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  provider: ethers.providers.Provider;
  contract: ethers.Contract;

  constructor(private configService: ConfigService){
    const apiKey = this.configService.get<string>('INFURA_API_KEY');
    this.provider = new ethers.providers.InfuraProvider("goerli",apiKey);
    this.contract = new ethers.Contract(
      this.getContractAddress(),
      tokenJson.abi,
      this.provider);
  }
  getContractAddress() {
    const contractAddress = this.configService.get<string>('TOKEN_ADDRESS');
    return contractAddress;
  }

  getLastBlock(): Promise<ethers.providers.Block>{
    return this.provider.getBlock("latest");
  }
  getTotalSupply(){
    return this.contract.totalSupply();
  }
  getBalance(address: string){
    return this.contract.balanceOf(address);
  }

  async getReceipt(hash: string){
    const tx = await this.provider.getTransaction(hash);
    const receipt = await this.awaitTx(tx);
    return receipt;
  }

  async awaitTx(tx: ethers.providers.TransactionResponse){
    return await tx.wait();
  }

  requestTokens(address: string){

    const pKey = this.configService.get<string>('PRIVATE_KEY');
    const wallet = new ethers.Wallet(pKey);
    const signer = wallet.connect(this.provider);
    return this.contract.connect(signer).mint(address, ethers.utils.parseUnits("1"));
  }

}

