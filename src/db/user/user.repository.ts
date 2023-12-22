import { PrismaManager } from '@app/prisma/prisma.manager';
import { Paginate } from '@app/shared/interfaces';
import { AtLeastOne } from '@app/shared/types';
import { Injectable } from '@nestjs/common';
import { Prisma, Roles, User, UserStatus } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  public constructor(private readonly prismaManager: PrismaManager) {}

  public async findUniqueOrFail(args: {
    where: AtLeastOne<{
      id?: number | bigint;
      uuid?: string;
    }>;
  }): Promise<User> {
    return this.prismaManager.getClient().user.findUniqueOrThrow({
      where: args.where,
    });
  }

  public async findOneOrFail(args: {
    where: AtLeastOne<{
      id?: number | bigint;
      uuid?: string;
    }>;
  }): Promise<User> {
    return this.prismaManager.getClient().user.findFirstOrThrow({
      where: args.where,
    });
  }

  public async findUnique(args: {
    where: AtLeastOne<{
      id?: number | bigint;
      uuid?: string;
    }>;
  }): Promise<User> {
    return this.prismaManager.getClient().user.findUnique({
      where: args.where,
    });
  }

  public async findManyPaginated(args: {
    where: {
      status?: UserStatus;
    };
    options?: Paginate;
  }): Promise<PaginatedResult<User>> {
    const { options = { perPage: 20, page: 1 } } = args;

    const paginate = createPaginator({ perPage: options.perPage });

    return paginate<User, Prisma.UserFindManyArgs>(
      this.prismaManager.getClient().user,
      {
        where: {
          ...args.where,
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
      },
      { page: options.page }
    );
  }

  public async create(args: {
    status: UserStatus;
    email: string;
    name: string;
    password: string;
    phone: string;
    role: Roles;
    documentNumber: string;
  }): Promise<User> {
    const { ...input } = args;

    return this.prismaManager.getClient().user.create({
      data: {
        ...input,
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  public async update(args: {
    where: AtLeastOne<{
      id?: number | bigint;
      uuid?: string;
    }>;
    data: {
      status?: UserStatus;
    };
  }) {
    const { ...input } = args.data;

    return this.prismaManager.getClient().user.update({
      data: {
        ...input,
        updatedAt: new Date(),
      },
      where: args.where,
    });
  }

  public async delete(
    where: AtLeastOne<{
      id?: number;
      uuid?: string;
    }>
  ) {
    return this.prismaManager.getClient().user.updateMany({
      data: { deletedAt: new Date() },
      where: {
        ...where,
        deletedAt: null,
      },
    });
  }
}
