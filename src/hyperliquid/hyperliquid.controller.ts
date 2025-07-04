import { Controller } from '@nestjs/common';
import { HyperliquidService } from './hyperliquid.service';

@Controller('hyperliquid')
export class HyperliquidController {
  constructor(private readonly hyperliquidService: HyperliquidService) {}
}
