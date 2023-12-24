import { Transformer } from '@app/shared/transformer/transformer';
import { User } from '@prisma/client';
import { PaginatedResult } from 'prisma-pagination';

export class MeTransformer extends Transformer<User> {
  constructor(data?: User | User[] | PaginatedResult<User>) {
    super(data, undefined);
  }

  protected transform(data: User) {
    return {
      uuid: data.uuid,
      name: data.name,
      phone: data.phone,
      email: data.email,
      status: data.status,
      documentNumber: data.documentNumber,
      role: data.role,
    };
  }
}
