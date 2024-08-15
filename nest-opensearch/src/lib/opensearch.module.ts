/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OPENSEARCH_MODULE_OPTIONS } from './opensearch.constants';
import { OpenSearchService } from './opensearch.service';
import {
  OpenSearchModuleAsyncOptions,
  OpenSearchModuleOptions,
  OpenSearchOptionsFactory
} from './interfaces/opensearch-module-options.interface';

@Module({
  providers: [OpenSearchService],
  exports: [OpenSearchService]
})
export class OpenSearchModule {
  static register(options: OpenSearchModuleOptions): DynamicModule {
    return {
      module: OpenSearchModule,
      providers: [{ provide: OPENSEARCH_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(
    options: OpenSearchModuleAsyncOptions
  ): DynamicModule {
    return {
      module: OpenSearchModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: OpenSearchModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass!,
        useClass: options.useClass!
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: OpenSearchModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OPENSEARCH_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: OPENSEARCH_MODULE_OPTIONS,
      useFactory: async (optionsFactory: OpenSearchOptionsFactory) =>
        await optionsFactory.createOpenSearchOptions(),
      inject: [options.useExisting! || options.useClass!]
    };
  }
}
