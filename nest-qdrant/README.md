# nest-qdrant

<p align="center">
  <a href="https://bytebitlabs.com/" target="_blank"><img src="https://gravatar.com/avatar/61c80d73dfe4c4231e77940cf80fd410?size=256" width="256" alt="ByteBitLabs logo" /></a>
</p>

<p align="center">Qdrant module for nestjs</p>
    <p align="center">
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-qdrant"><img src="https://img.shields.io/npm/v/@bytebitlabs/nest-qdrant" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-qdrant"><img src="https://img.shields.io/npm/l/@bytebitlabs/nest-qdrant" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-qdrant"><img src="https://img.shields.io/npm/dm/@bytebitlabs/nest-qdrant" alt="NPM Downloads" /></a>
</p>

## Description

Qdrant module for [Nest](https://github.com/nestjs/nest) based on the official [@qdrant/js-client-rest
](https://www.npmjs.com/package/@qdrant/js-client-rest) package.

## Installation

```bash
$ npm i --save @bytebitlabs/nest-qdrant @qdrant/js-client-rest

```

## Usage

Import `QdrantModule`:

```typescript
@Module({
  imports: [Qdrant.register({
    url: 'http://127.0.0.1:6333',
  })],
  providers: [...],
})
export class VectorStoreModule {}
```

Inject `QdrantService`:

```typescript
@Injectable()
export class VectorStoreService {
  constructor(private readonly qdrantService: QdrantService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
QdrantModule.registerAsync({
  useFactory: () => ({
    url: 'http://127.0.0.1:6333'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
QdrantModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    url: configService.get('QDRANT_URL'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
QdrantModule.registerAsync({
  useClass: QdrantConfigService
});
```

Above construction will instantiate `QdrantConfigService` inside `QdrantModule` and will leverage it to create options object.

```typescript
class QdrantConfigService implements QdrantOptionsFactory {
  createQdrantOptions(): QdrantModuleOptions {
    return {
      url: 'http://127.0.0.1:6333'
    };
  }
}
```

**3. Use existing**

```typescript
QdrantModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `QdrantModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `QdrantService` wraps the `QdrantClient` from the official [@qdrant/js-client-rest
](https://www.npmjs.com/package/@qdrant/js-client-rest) methods. The `QdrantModule.register()` takes `options` object as an argument, [read more](https://qdrant.tech/documentation/quickstart/).
