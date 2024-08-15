import { QdrantClient, QdrantClientParams } from '@qdrant/js-client-rest';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { QDRANT_MODULE_OPTIONS } from './qdrant.constants';

@Injectable()
export class QdrantService extends QdrantClient {
  constructor(
    @Optional() @Inject(QDRANT_MODULE_OPTIONS) options: QdrantClientParams
  ) {
    super(options);
  }
}
