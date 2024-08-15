/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GROQ_MODULE_OPTIONS } from './groq.constants';
import { GroqService } from './groq.service';
import {
  GroqModuleAsyncOptions,
  GroqModuleOptions,
  GroqOptionsFactory
} from './interfaces/groq-module-options.interface';

@Module({
  providers: [GroqService],
  exports: [GroqService]
})
export class GroqModule {
  static register(options: GroqModuleOptions): DynamicModule {
    return {
      module: GroqModule,
      providers: [{ provide: GROQ_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(
    options: GroqModuleAsyncOptions
  ): DynamicModule {
    return {
      module: GroqModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: GroqModuleAsyncOptions
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
    options: GroqModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: GROQ_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: GROQ_MODULE_OPTIONS,
      useFactory: async (optionsFactory: GroqOptionsFactory) =>
        await optionsFactory.createGroqOptions(),
      inject: [options.useExisting! || options.useClass!]
    };
  }
}
