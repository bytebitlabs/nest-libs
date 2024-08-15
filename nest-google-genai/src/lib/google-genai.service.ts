import { GoogleGenerativeAI } from '@google/generative-ai';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { GOOGLE_GENAI_MODULE_OPTIONS } from './google-genai.constants';

@Injectable()
export class GoogleGenAiService extends GoogleGenerativeAI {
  constructor(
    @Optional() @Inject(GOOGLE_GENAI_MODULE_OPTIONS) options: { apiKey: string }
  ) {
    super(options.apiKey);
  }
}
