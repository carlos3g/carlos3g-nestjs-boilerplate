import { PrismaClient } from '@prisma/client';
import { EnvService } from '@app/env/env.service';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public constructor(readonly envService: EnvService) {
    super({
      log: envService.DEBUG ? ['query', 'info', 'warn', 'error'] : undefined,
      datasources: {
        db: {
          url: envService.POSTGRES_API_URL,
        },
      },
    });
  }

  public onModuleInit(): void {
    // await this.$connect()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    });
  }

  public enableShutdownHooks(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
