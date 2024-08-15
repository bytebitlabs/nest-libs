import { ClientOptions } from '@opensearch-project/opensearch';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type OpenSearchModuleOptions = ClientOptions;

export interface OpenSearchOptionsFactory {
  createOpenSearchOptions():
    | Promise<OpenSearchModuleOptions>
    | OpenSearchModuleOptions;
}

export interface OpenSearchModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OpenSearchOptionsFactory>;
  useClass?: Type<OpenSearchOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<OpenSearchModuleOptions> | OpenSearchModuleOptions;
  inject?: any[];
}
