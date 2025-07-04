import { Injectable } from '@nestjs/common';
import { Hyperliquid } from 'hyperliquid';

@Injectable()
export class HyperliquidService {
  private readonly hyperliquid: Hyperliquid;

  constructor() {
    this.hyperliquid = new Hyperliquid({
      testnet: true,
      privateKey: process.env.PRIVATE_KEY,
    });
  }
}
