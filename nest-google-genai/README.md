# nest-google-genai

<p align="center">
  <a href="https://bytebitlabs.com/" target="_blank"><img src="https://gravatar.com/avatar/61c80d73dfe4c4231e77940cf80fd410?size=256" width="256" alt="ByteBitLabs logo" /></a>
</p>

<p align="center">Google Generative AI module for nestjs</p>
    <p align="center">
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-google-genai"><img src="https://img.shields.io/npm/v/@bytebitlabs/nest-google-genai" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-google-genai"><img src="https://img.shields.io/npm/l/@bytebitlabs/nest-google-genai" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-google-genai"><img src="https://img.shields.io/npm/dm/@bytebitlabs/nest-google-genai" alt="NPM Downloads" /></a>
</p>

## Description

Google Generative AI module for [Nest](https://github.com/nestjs/nest) based on the official [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) package.

## Installation

```bash
$ npm i --save @bytebitlabs/nest-google-genai @google/generative-ai
```

## Usage

Import `GoogleGenAiModule`:

```typescript
@Module({
  imports: [GoogleGenAiModule.register({
    apiKey: 'Abc...',
  })],
  providers: [...],
})
export class AiModule {}
```

Inject `GoogleGenAiService`:

```typescript
@Injectable()
export class AiService {
  constructor(private readonly googleGenAiService: GoogleGenAiService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
GoogleGenAiModule.registerAsync({
  useFactory: () => ({
    apiKey: 'Abc...'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
GoogleGenAiModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    apiKey: configService.get('GOOGLE_GEN_AI_API_KEY'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
GoogleGenAiModule.registerAsync({
  useClass: GoogleGenAiConfigService
});
```

Above construction will instantiate `GoogleGenAiConfigService` inside `GoogleGenAiModule` and will leverage it to create options object.

```typescript
class GoogleGenAiConfigService implements OpenaiOptionsFactory {
  createOpenaiOptions(): GoogleGenAiModuleOptions {
    return {
      apiKey: 'Abc...'
    };
  }
}
```

**3. Use existing**

```typescript
GoogleGenAiModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `GoogleGenAiModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `GoogleGenAiService` wraps the `GoogleGenerativeAI` from the official [@google/generative-ai
](https://www.npmjs.com/package/@google/generative-ai) methods. The `GoogleGenAiModule.register()` takes `options` object as an argument, [read more](https://ai.google.dev/gemini-api/docs/quickstart?lang=node).
