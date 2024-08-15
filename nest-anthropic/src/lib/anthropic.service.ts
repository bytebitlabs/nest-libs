import { Anthropic, ClientOptions } from '@anthropic-ai/sdk';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { ANTHROPIC_MODULE_OPTIONS } from './anthropic.constants';

@Injectable()
export class AnthropicService extends Anthropic {
  constructor(
    @Optional() @Inject(ANTHROPIC_MODULE_OPTIONS) options: ClientOptions
  ) {
    super(options);
  }
}
