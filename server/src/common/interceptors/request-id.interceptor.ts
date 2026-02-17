import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  // @ts-ignore - RxJS version conflict between root and server node_modules
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Generate or use existing request ID
    const requestId = (request.headers['x-request-id'] as string) || uuidv4();

    // Set request ID in headers
    request.headers['x-request-id'] = requestId;
    response.setHeader('X-Request-ID', requestId);

    // @ts-ignore - RxJS version conflict between root and server node_modules
    return next.handle();
  }
}
