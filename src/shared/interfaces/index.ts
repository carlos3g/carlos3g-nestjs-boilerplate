import { AtLeastOne } from '@app/shared/types';

export type Paginate = {
  page: string | number | undefined;
  perPage: string | number | undefined;
};

export type DbWhereItem<T> =
  | T
  | AtLeastOne<{
      equals?: T;
      in?: T[];
      not?: T;
      notIn?: T[];
    }>;
