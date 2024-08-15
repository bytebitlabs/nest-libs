# nest-anthropic

<p align="center">
  <a href="https://bytebitlabs.com/" target="_blank"><img src="https://gravatar.com/avatar/61c80d73dfe4c4231e77940cf80fd410?size=256" width="256" alt="ByteBitLabs logo" /></a>
</p>

<p align="center">Anthropic module for nestjs</p>
    <p align="center">
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-anthropic"><img src="https://img.shields.io/npm/v/@bytebitlabs/nest-anthropic" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-anthropic"><img src="https://img.shields.io/npm/l/@bytebitlabs/nest-anthropic" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-anthropic"><img src="https://img.shields.io/npm/dm/@bytebitlabs/nest-anthropic" alt="NPM Downloads" /></a>
</p>

## Description

Anthropic module for [Nest](https://github.com/nestjs/nest) based on the official [@anthropic-ai/sdk](https://www.npmjs.com/package/@anthropic-ai/sdk) package.

## Installation

```bash
$ npm i --save @bytebitlabs/nest-anthropic @anthropic-ai/sdk
```

## Usage

Import `AnthropicModule`:

```typescript
@Module({
  imports: [AnthropicModule.register({
    apiKey: 'Abc...',
  })],
  providers: [...],
})
export class AiModule {}
```

Inject `AnthropicService`:

```typescript
@Injectable()
export class AiService {
  constructor(private readonly anthropicService: AnthropicService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
AnthropicModule.registerAsync({
  useFactory: () => ({
    apiKey: 'Abc...'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
AnthropicModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    apiKey: configService.get('ANTHROPIC_API_KEY'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
AnthropicModule.registerAsync({
  useClass: AnthropicConfigService
});
```

Above construction will instantiate `AnthropicConfigService` inside `AnthropicModule` and will leverage it to create options object.

```typescript
class AnthropicConfigService implements AnthropicOptionsFactory {
  createAnthropicOptions(): AnthropicModuleOptions {
    return {
      apiKey: 'Abc...'
    };
  }
}
```

**3. Use existing**

```typescript
AnthropicModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `AnthropicModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `AnthropicService` wraps the `Client` from the official [@anthropic-ai/sdk](https://www.npmjs.com/package/@anthropic-ai/sdk) methods. The `AnthropicModule.register()` takes `options` object as an argument, [read more](https://docs.anthropic.com/en/api/getting-started).
