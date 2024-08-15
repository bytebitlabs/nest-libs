import { OpenAI, ClientOptions } from 'openai';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { OPENAI_MODULE_OPTIONS } from './openai.constants';

@Injectable()
export class OpenAiService extends OpenAI {
  constructor(
    @Optional() @Inject(OPENAI_MODULE_OPTIONS) options: ClientOptions
  ) {
    super(options);
  }
}
