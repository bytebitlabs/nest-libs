import { Groq, ClientOptions } from 'groq-sdk';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { GROQ_MODULE_OPTIONS } from './groq.constants';

@Injectable()
export class GroqService extends Groq {
  constructor(
    @Optional() @Inject(GROQ_MODULE_OPTIONS) options: ClientOptions
  ) {
    super(options);
  }
}
