import { Inject, Injectable } from '@nestjs/common';
import { Hyperliquid, UserFills, UserOpenOrders } from 'hyperliquid';
import { Address } from 'viem';

// Notation
// -> https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/notation

// About $100 size value -> 0.00092 BTC

// Mainnet bridge -> 0x2df1c51e09aecf9cacb7bc98cb1742757f163df7
// Testnet bridge -> 0x08cfc1B6b2dCF36A1480b99353A354AA8AC56f89

interface OpenMarketPositionResponse {
  status: 'ok' | 'error';
  response: {
    type: 'order';
    data: { statuses: any[] };
  };
}

const MAX_PERP_DECIMALS = 6;

@Injectable()
export class HyperliquidService {
  private readonly hyperliquid: Hyperliquid;

  constructor(
    @Inject('HYPERLIQUID_CONFIG')
    private readonly config: { privateKey: string },
  ) {
    try {
      this.hyperliquid = new Hyperliquid({
        testnet: true,
        privateKey: this.config.privateKey,
      });
    } catch (error) {
      console.error('Error initializing Hyperliquid:', error);
      throw error;
    }
  }

  async getUserOpenOrders(user: Address): Promise<UserOpenOrders> {
    const orders = await this.hyperliquid.info.getUserOpenOrders(user);
    return orders;
  }

  async getUserFills(user: Address): Promise<UserFills> {
    const fills = await this.hyperliquid.info.getUserFills(user);
    return fills;
  }

  async openMarketPosition({
    asset,
    size,
    side,
    price,
  }: {
    asset: string;
    size: number;
    side: 'buy' | 'sell';
    price?: number;
  }) {
    const marketPrice = await this.getAssetPrice(asset); // 107733.5
    const limit_px = (price ?? marketPrice).toFixed();

    const response: OpenMarketPositionResponse =
      await this.hyperliquid.exchange.placeOrder({
        coin: asset,
        is_buy: side === 'buy',
        sz: size,
        limit_px,
        order_type: { limit: { tif: 'Gtc' } },
        reduce_only: false,
      });

    if (response.status !== 'ok') {
      throw new Error(response.response.data.statuses[0].error);
    }

    return 'ok';
  }

  async getAssetPrice(asset: string): Promise<number> {
    if (!asset) {
      throw new Error('Asset is required');
    }

    const mids = await this.hyperliquid.info.getAllMids();
    const price = mids[asset];

    if (!price) {
      throw new Error('Asset not found');
    }

    return Number(price);
  }
}
