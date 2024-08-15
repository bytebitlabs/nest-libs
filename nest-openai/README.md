# nest-openai

<p align="center">
  <a href="https://bytebitlabs.com/" target="_blank"><img src="https://gravatar.com/avatar/61c80d73dfe4c4231e77940cf80fd410?size=256" width="256" alt="ByteBitLabs logo" /></a>
</p>

<p align="center">OpenAI module for nestjs</p>
    <p align="center">
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-openai"><img src="https://img.shields.io/npm/v/@bytebitlabs/nest-openai" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-openai"><img src="https://img.shields.io/npm/l/@bytebitlabs/nest-openai" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-openai"><img src="https://img.shields.io/npm/dm/@bytebitlabs/nest-openai" alt="NPM Downloads" /></a>
</p>

## Description

OpenAI module for [Nest](https://github.com/nestjs/nest) based on the official [openai](https://www.npmjs.com/package/openai) package.

## Installation

```bash
$ npm i --save @bytebitlabs/nest-openai openai
```

## Usage

Import `OpenAiModule`:

```typescript
@Module({
  imports: [OpenAiModule.register({
    apiKey: 'Abc...',
  })],
  providers: [...],
})
export class AiModule {}
```

Inject `OpenAiService`:

```typescript
@Injectable()
export class AiService {
  constructor(private readonly openAiService: OpenAiService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
OpenAiModule.registerAsync({
  useFactory: () => ({
    apiKey: 'Abc...'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
OpenAiModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    apiKey: configService.get('OPENAI_API_KEY'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
OpenAiModule.registerAsync({
  useClass: OpenAiConfigService
});
```

Above construction will instantiate `OpenAiConfigService` inside `OpenAiModule` and will leverage it to create options object.

```typescript
class OpenAiConfigService implements OpenaiOptionsFactory {
  createOpenAiOptions(): OpenAiModuleOptions {
    return {
      apiKey: 'Abc...'
    };
  }
}
```

**3. Use existing**

```typescript
OpenAiModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `OpenAiModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `OpenAiService` wraps the `Client` from the official [openai](https://www.npmjs.com/package/openai) methods. The `OpenAiModule.register()` takes `options` object as an argument, [read more](https://platform.openai.com/docs/overview).
