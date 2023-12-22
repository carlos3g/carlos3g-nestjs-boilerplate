import { EnvModule } from '@app/env/env.module';
import { EnvService } from '@app/env/env.service';
import { PrismaModule } from '@app/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    {
      ...JwtModule.registerAsync({
        inject: [EnvService],
        useFactory: (envService: EnvService) => ({ secret: envService.JWT_SECRET }),
      }),
      global: true,
    },
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    EnvModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
