import { Injectable, Logger } from '@nestjs/common';
import { PRISMA_CLIENT_KEY, PrismaManager } from '@app/prisma/prisma.manager';
import { ClsService } from 'nestjs-cls';
import { TransactionScope } from '@app/prisma/types/transaction-scope.interface';

@Injectable()
export class PrismaTransactionScope implements TransactionScope {
  private readonly logger = new Logger(PrismaTransactionScope.name);

  constructor(
    private readonly prisma: PrismaManager,
    private readonly cls: ClsService
  ) {}

  async run<T = unknown>(fn: () => Promise<T>): Promise<T> {
    return this.prisma.getNativeClient().$transaction(async (prisma) => {
      const callback = async () => {
        this.cls.set(PRISMA_CLIENT_KEY, prisma);

        try {
          return await fn();
        } catch (err) {
          this.logger.error(err);
          throw err;
        } finally {
          this.cls.set(PRISMA_CLIENT_KEY, undefined);
        }
      };

      return this.cls.run(callback);
    });
  }
}
