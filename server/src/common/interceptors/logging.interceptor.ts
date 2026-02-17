import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  // @ts-expect-error - RxJS version conflict between root and server node_modules
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const requestId = (request.headers['x-request-id'] as string) || 'unknown';
    const startTime = Date.now();

    this.logger.log(`${method} ${url} [${requestId}] - Started`);

    // @ts-expect-error - RxJS version conflict between root and server node_modules
    return next.handle().pipe(
      // @ts-expect-error - RxJS version conflict
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode || 200;
          this.logger.log(`${method} ${url} [${requestId}] ${statusCode} - ${duration}ms`);
        },
        error: (error: Error) => {
          const duration = Date.now() - startTime;
          this.logger.error(`${method} ${url} [${requestId}] - ${duration}ms - ${error.message}`);
        },
      })
    );
  }
}
