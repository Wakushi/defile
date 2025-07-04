import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HyperliquidModule } from './hyperliquid/hyperliquid.module';

@Module({
  imports: [HyperliquidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
