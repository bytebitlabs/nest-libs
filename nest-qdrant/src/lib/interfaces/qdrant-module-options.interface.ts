import { QdrantClientParams } from '@qdrant/js-client-rest';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type QdrantModuleOptions = QdrantClientParams;

export interface QdrantOptionsFactory {
  createQdrantOptions():
    | Promise<QdrantModuleOptions>
    | QdrantModuleOptions;
}

export interface QdrantModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<QdrantOptionsFactory>;
  useClass?: Type<QdrantOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<QdrantOptionsFactory> | QdrantOptionsFactory;
  inject?: any[];
}
