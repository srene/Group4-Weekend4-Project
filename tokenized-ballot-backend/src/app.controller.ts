import { Controller, Get,Post, Param, Body, Query, ForbiddenException } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokenDto } from './dtos/requestToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("last-block")
  getLastBlock() {
    return this.appService.getLastBlock();
  }
  @Get('contract-address')
  getContractAddress(){
    return this.appService.getContractAddress();
  }

  @Get('total-supply')
  getTotalSupply(){
    return this.appService.getTotalSupply();
  }

  @Get('balance/:address')
  getBalance(@Param('address') address: string){
    return this.appService.getBalance(address);
  }

  @Get('receipt')
  async getReceipt(@Query('hash') hash: string){
    return await this.appService.getReceipt(hash);
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokenDto){

    return this.appService.requestTokens(body.address);
  }
}

