import { ClientOptions } from 'groq-sdk';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type GroqModuleOptions = ClientOptions;

export interface GroqOptionsFactory {
  createGroqOptions():
    | Promise<GroqModuleOptions>
    | GroqModuleOptions;
}

export interface GroqModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GroqOptionsFactory>;
  useClass?: Type<GroqOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<GroqOptionsFactory> | GroqOptionsFactory;
  inject?: any[];
}
