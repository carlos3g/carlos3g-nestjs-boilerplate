import { Transformer } from '@app/shared/transformer/transformer';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();
    response.header('Content-Type', 'application/json');

    return next.handle().pipe(
      map((data) => {
        if (data instanceof Transformer) {
          return JSON.stringify(data);
        }

        return data as unknown;
      })
    );
  }
}
