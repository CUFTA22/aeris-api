import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// -------------------------------------------------------------
// @GetUser() user: User
// @GetUser("email") email: string
// -------------------------------------------------------------

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
