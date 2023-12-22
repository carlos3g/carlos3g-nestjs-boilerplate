import { PrismaManager } from '@app/prisma/prisma.manager';
import { PrismaService } from '@app/prisma/services/prisma.service';
import { PrismaTransactionScope } from '@app/prisma/transaction-scope';
import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        // automatically mount the
        // ClsMiddleware for all routes
        mount: true,
      },
    }),
  ],
  providers: [PrismaManager, PrismaService, PrismaTransactionScope],
  exports: [PrismaManager, PrismaService, PrismaTransactionScope],
})
export class PrismaModule {}
