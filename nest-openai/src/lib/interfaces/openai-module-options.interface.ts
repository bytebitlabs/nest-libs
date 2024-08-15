import { ClientOptions } from 'openai';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type OpenAiModuleOptions = ClientOptions;

export interface OpenAiOptionsFactory {
  createOpenaiOptions():
    | Promise<OpenAiModuleOptions>
    | OpenAiModuleOptions;
}

export interface OpenAiModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OpenAiOptionsFactory>;
  useClass?: Type<OpenAiOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<OpenAiOptionsFactory> | OpenAiOptionsFactory;
  inject?: any[];
}
