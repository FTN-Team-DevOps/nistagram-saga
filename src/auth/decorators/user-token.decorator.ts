import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserToken = createParamDecorator((ctx: ExecutionContext) =>
  ctx.switchToHttp().getRequest().headers.authorization
    ? ctx
        .switchToHttp()
        .getRequest()
        .headers.authorization.replace('Bearer ', '')
    : undefined,
);
