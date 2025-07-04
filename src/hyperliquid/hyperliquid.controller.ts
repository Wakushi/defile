import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { HyperliquidService } from './hyperliquid.service';
import { Address } from 'viem';

@Controller('hyperliquid')
export class HyperliquidController {
  constructor(private readonly hyperliquidService: HyperliquidService) {}

  @Get('price/:asset')
  async getAssetPrice(@Param('asset') asset: string) {
    return this.hyperliquidService.getAssetPrice(asset);
  }

  // 0x4206730E2C2281F4dF24c0e588F6C8f5dBAd03BA
  @Get('open-orders/:user')
  async getUserOpenOrders(@Param('user') user: Address) {
    return this.hyperliquidService.getUserOpenOrders(user);
  }

  @Get('fills/:user')
  async getUserFills(@Param('user') user: Address) {
    return this.hyperliquidService.getUserFills(user);
  }

  @Post('open-market-position')
  async openMarketPosition(
    @Body()
    body: {
      asset: string;
      size: number;
      side: 'buy' | 'sell';
      price?: number;
    },
  ) {
    if (!body) {
      throw new BadRequestException('Body is required');
    }

    const { asset, size, side, price } = body;

    if (!asset || !size || !side) {
      throw new BadRequestException('Invalid body');
    }

    return this.hyperliquidService.openMarketPosition({
      asset,
      size,
      side,
      price,
    });
  }
}
