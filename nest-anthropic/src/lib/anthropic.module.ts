/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ANTHROPIC_MODULE_OPTIONS } from './anthropic.constants';
import { AnthropicService } from './anthropic.service';
import {
  AnthropicModuleAsyncOptions,
  AnthropicModuleOptions,
  AnthropicOptionsFactory
} from './interfaces/anthropic-module-options.interface';

@Module({
  providers: [AnthropicService],
  exports: [AnthropicService]
})
export class AnthropicModule {
  static register(options: AnthropicModuleOptions): DynamicModule {
    return {
      module: AnthropicModule,
      providers: [{ provide: ANTHROPIC_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(
    options: AnthropicModuleAsyncOptions
  ): DynamicModule {
    return {
      module: AnthropicModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: AnthropicModuleAsyncOptions
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
    options: AnthropicModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ANTHROPIC_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: ANTHROPIC_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AnthropicOptionsFactory) =>
        await optionsFactory.createAnthropicOptions(),
      inject: [options.useExisting! || options.useClass!]
    };
  }
}
