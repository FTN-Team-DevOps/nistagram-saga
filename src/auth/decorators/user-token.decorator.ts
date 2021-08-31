import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserToken = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request) {
      const token = request.headers.authorization
        ? request.headers.authorization.replace('Bearer ', '')
        : undefined;
      return token;
    }
    return undefined;
  },
);
