import { PaginatedResult } from 'prisma-pagination';

export abstract class Transformer<T, K = unknown, Output = unknown> {
  public constructor(
    protected readonly data?: T | T[] | PaginatedResult<T>,
    protected readonly includes?: K
  ) {}

  public toJSON() {
    if (this.data === undefined || this.data === null) {
      return null;
    }

    if (this.data instanceof Array) {
      return this.data.map((item) => this.transform(item));
    }

    // eslint-disable-next-line no-prototype-builtins
    if (this.data.hasOwnProperty('data')) {
      return this.collection(this.data as PaginatedResult<T>);
    }

    return this.transform(this.data as T);
  }

  protected collection(data: PaginatedResult<T>): PaginatedResult<Output> {
    return {
      ...data,
      data: data.data.map((item) => this.transform(item)),
    };
  }

  protected abstract transform(data: T): Output;
}
