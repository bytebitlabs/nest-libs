/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GOOGLE_GENAI_MODULE_OPTIONS } from './google-genai.constants';
import { GoogleGenAiService } from './google-genai.service';
import {
  GoogleGenAiModuleAsyncOptions,
  GoogleGenAiModuleOptions,
  GoogleGenAiOptionsFactory
} from './interfaces/google-genai-module-options.interface';

@Module({
  providers: [GoogleGenAiService],
  exports: [GoogleGenAiService]
})
export class GoogleGenAiModule {
  static register(options: GoogleGenAiModuleOptions): DynamicModule {
    return {
      module: GoogleGenAiModule,
      providers: [{ provide: GOOGLE_GENAI_MODULE_OPTIONS, useValue: options }]
    };
  }

  static registerAsync(
    options: GoogleGenAiModuleAsyncOptions
  ): DynamicModule {
    return {
      module: GoogleGenAiModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)]
    };
  }

  private static createAsyncProviders(
    options: GoogleGenAiModuleAsyncOptions
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
    options: GoogleGenAiModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: GOOGLE_GENAI_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: GOOGLE_GENAI_MODULE_OPTIONS,
      useFactory: async (optionsFactory: GoogleGenAiOptionsFactory) =>
        await optionsFactory.createGoogleGenAiOptions(),
      inject: [options.useExisting! || options.useClass!]
    };
  }
}
