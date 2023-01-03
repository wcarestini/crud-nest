import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {

  constructor(private errorMessage: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((data) => {
          if (!data) {
            throw new NotFoundException(this.errorMessage)
          }
        }),
      );
  }
}
