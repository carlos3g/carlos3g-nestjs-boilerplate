import { EnvService } from '@app/env/env.service';
import { PrismaService } from '@app/prisma/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

export const PRISMA_CLIENT_KEY = 'prisma';

@Injectable()
export class PrismaManager {
  private prisma: PrismaClient;

  public constructor(
    readonly envService: EnvService,
    private readonly cls: ClsService
  ) {
    this.prisma = new PrismaService(envService);
  }

  private getTransaction(): PrismaClient | null {
    return this.cls.get(PRISMA_CLIENT_KEY);
  }

  public getClient(): PrismaClient {
    return this.getTransaction() || this.prisma;
  }

  public getNativeClient(): PrismaClient {
    return this.prisma;
  }
}
