import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class MyGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
      ? request.headers.authorization.replace('Bearer ', '')
      : undefined;
    Logger.log(
      `${JSON.stringify(request.body)} ======= ${JSON.stringify(
        request.params,
      )}`,
    );
    const user = request.body.user ?? request.params.userId;
    if (!token || !user) {
      return false;
    }
    return this.authService.checkIfMy(token, user);
  }
}
