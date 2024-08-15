/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { OPENAI_MODULE_OPTIONS } from './openai.constants';
import { OpenAiService } from './openai.service';
import {
  OpenAiModuleAsyncOptions,
  OpenAiModuleOptions,
  OpenAiOptionsFactory
} from './interfaces/openai-module-options.interface';

@Module({
  providers: [OpenAiService],
  exports: [OpenAiService]
})
export class OpenAiModule {
  static register(options: OpenAiModuleOptions): DynamicModule {
    return {
      module: OpenAiModule,
      providers: [{ provide: OPENAI_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(
    options: OpenAiModuleAsyncOptions
  ): DynamicModule {
    return {
      module: OpenAiModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: OpenAiModuleAsyncOptions
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
    options: OpenAiModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OPENAI_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: OPENAI_MODULE_OPTIONS,
      useFactory: async (optionsFactory: OpenAiOptionsFactory) =>
        await optionsFactory.createOpenaiOptions(),
      inject: [options.useExisting! || options.useClass!]
    };
  }
}
