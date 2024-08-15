# nest-opensearch

<p align="center">
  <a href="https://bytebitlabs.com/" target="_blank"><img src="https://gravatar.com/avatar/61c80d73dfe4c4231e77940cf80fd410?size=256" width="256" alt="ByteBitLabs logo" /></a>
</p>

<p align="center">OpenSearch module for nestjs</p>
    <p align="center">
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-opensearch"><img src="https://img.shields.io/npm/v/@bytebitlabs/nest-opensearch" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-opensearch"><img src="https://img.shields.io/npm/l/@bytebitlabs/nest-opensearch" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@bytebitlabs/nest-opensearch"><img src="https://img.shields.io/npm/dm/@bytebitlabs/nest-opensearch" alt="NPM Downloads" /></a>
</p>

## Description

OpenSearch module for [Nest](https://github.com/nestjs/nest) based on the official [@opensearch-project/opensearch](https://www.npmjs.com/package/@opensearch-project/opensearch) package.

## Installation

```bash
$ npm i --save @bytebitlabs/nest-opensearch @opensearch-project/opensearch
```

## Usage

Import `OpenSearchModule`:

```typescript
@Module({
  imports: [OpenSearchModule.register({
    node: 'http://localhost:9200',
  })],
  providers: [...],
})
export class SearchModule {}
```

Inject `OpenSearchService`:

```typescript
@Injectable()
export class SearchService {
  constructor(private readonly openSearchService: OpenSearchService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use `registerAsync()` method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
OpenSearchModule.registerAsync({
  useFactory: () => ({
    node: 'http://localhost:9200'
  })
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
OpenSearchModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    node: configService.get('OPENSEARCH_NODE'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
OpenSearchModule.registerAsync({
  useClass: OpenSearchConfigService
});
```

Above construction will instantiate `OpenSearchConfigService` inside `OpenSearchModule` and will leverage it to create options object.

```typescript
class OpenSearchConfigService implements OpensearchOptionsFactory {
  createOpensearchOptions(): OpenSearchModuleOptions {
    return {
      node: 'http://localhost:9200'
    };
  }
}
```

**3. Use existing**

```typescript
OpenSearchModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `OpenSearchModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## API Spec

The `OpenSearchService` wraps the `Client` from the official [@opensearch-project/opensearch](https://www.npmjs.com/package/@opensearch-project/opensearch) methods. The `OpenSearchModule.register()` takes `options` object as an argument, [read more](https://opensearch.org/docs/latest/clients/javascript/index).
