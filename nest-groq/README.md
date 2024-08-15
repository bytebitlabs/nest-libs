# nest-groq

<p align="center">
  <a href="https://bytebitlabs.com/" target="_blank"><img src="https://gravatar.com/avatar/61c80d73dfe4c4231e77940cf80fd410?size=256" width="256" alt="ByteBitLabs logo" /></a>
</p>

<p align="center">Groq module for nestjs</p>
    <p align="center">
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-groq"><img src="https://img.shields.io/npm/v/@bytebitlabs/nest-groq" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-groq"><img src="https://img.shields.io/npm/l/@bytebitlabs/nest-groq" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-groq"><img src="https://img.shields.io/npm/dm/@bytebitlabs/nest-groq" alt="NPM Downloads" /></a>
</p>

## Description

Groq module for [Nest](https://github.com/nestjs/nest) based on the official [groq-sdk](https://www.npmjs.com/package/groq-sdk) package.

## Installation

```bash
$ npm i --save @bytebitlabs/nest-groq groq-sdk
```

## Usage

Import `GroqModule`:

```typescript
@Module({
  imports: [GroqModule.register({
    apiKey: 'Abc...',
  })],
  providers: [...],
})
export class AiModule {}
```

Inject `GroqService`:

```typescript
@Injectable()
export class AiService {
  constructor(private readonly groqService: GroqService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
GroqModule.registerAsync({
  useFactory: () => ({
    apiKey: 'Abc...'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
GroqModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    apiKey: configService.get('GROQ_API_KEY'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
GroqModule.registerAsync({
  useClass: GroqConfigService
});
```

Above construction will instantiate `GroqConfigService` inside `GroqModule` and will leverage it to create options object.

```typescript
class GroqConfigService implements GroqOptionsFactory {
  createGroqOptions(): GroqModuleOptions {
    return {
      apiKey: 'Abc...'
    };
  }
}
```

**3. Use existing**

```typescript
GroqModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `GroqModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `GroqService` wraps the `Client` from the official [groq-sdk](https://www.npmjs.com/package/groq-sdk) methods. The `GroqModule.register()` takes `options` object as an argument, [read more](https://console.groq.com/docs/quickstart).
