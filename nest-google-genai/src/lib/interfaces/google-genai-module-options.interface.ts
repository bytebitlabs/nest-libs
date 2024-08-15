import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type GoogleGenAiModuleOptions = { apiKey: string };

export interface GoogleGenAiOptionsFactory {
  createGoogleGenAiOptions():
    | Promise<GoogleGenAiModuleOptions>
    | GoogleGenAiModuleOptions;
}

export interface GoogleGenAiModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GoogleGenAiOptionsFactory>;
  useClass?: Type<GoogleGenAiOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<GoogleGenAiOptionsFactory> | GoogleGenAiOptionsFactory;
  inject?: any[];
}
