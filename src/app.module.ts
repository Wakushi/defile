import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HyperliquidModule } from './hyperliquid/hyperliquid.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
    HyperliquidModule.forRoot({
      privateKey: process.env.PRIVATE_KEY!,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
