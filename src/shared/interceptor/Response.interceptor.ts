import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/shared/classes/response.class';
import { Response as ExpressResponse } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();
    ResponseObj.setHeader('Server', 'Microsoft-IIS/7.5');
    ResponseObj.setHeader('X-Powered-By', 'NodeJs');
    ResponseObj.setHeader('X-Node-Version', '14');

    return next.handle().pipe(map((value) => response(value, context)));
  }
}

export function response(response: Response, context: ExecutionContext) {
  if (response instanceof StreamableFile) {
    return response;
  }

  response.statusCode == void 0
    ? (response.statusCode = context.switchToHttp().getResponse()['statusCode'])
    : (context.switchToHttp().getResponse()['statusCode'] =
        response.statusCode);

  return response;
}
