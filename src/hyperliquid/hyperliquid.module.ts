import { Module } from '@nestjs/common';
import { HyperliquidService } from './hyperliquid.service';
import { HyperliquidController } from './hyperliquid.controller';

@Module({
  controllers: [HyperliquidController],
  providers: [HyperliquidService],
})
export class HyperliquidModule {}
