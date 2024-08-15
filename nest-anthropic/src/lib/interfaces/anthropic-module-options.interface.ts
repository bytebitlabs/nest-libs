import { ClientOptions } from '@anthropic-ai/sdk';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type AnthropicModuleOptions = ClientOptions;

export interface AnthropicOptionsFactory {
  createAnthropicOptions():
    | Promise<AnthropicModuleOptions>
    | AnthropicModuleOptions;
}

export interface AnthropicModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AnthropicOptionsFactory>;
  useClass?: Type<AnthropicOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AnthropicOptionsFactory> | AnthropicOptionsFactory;
  inject?: any[];
}
