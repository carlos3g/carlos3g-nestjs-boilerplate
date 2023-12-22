import { UserRepository } from '@app/db/user/user.repository';
import { PrismaModule } from '@app/prisma/prisma.module';
import { Module } from '@nestjs/common';

const repositories = [UserRepository];

@Module({
  imports: [PrismaModule],
  providers: repositories,
  exports: [...repositories, PrismaModule],
})
export class DbModule {}
