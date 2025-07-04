import { DynamicModule, Module } from '@nestjs/common';
import { HyperliquidService } from './hyperliquid.service';
import { HyperliquidController } from './hyperliquid.controller';

@Module({})
export class HyperliquidModule {
  static forRoot(config: { privateKey: string }): DynamicModule {
    return {
      module: HyperliquidModule,
      providers: [
        HyperliquidService,
        {
          provide: 'HYPERLIQUID_CONFIG',
          useValue: config,
        },
      ],
      controllers: [HyperliquidController],
      exports: [HyperliquidService],
      global: true,
    };
  }
}
