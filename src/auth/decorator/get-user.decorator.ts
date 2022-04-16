import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJWT } from '../types';

// -------------------------------------------------------------
// @GetUser() user: User
// @GetUser("email") email: string
// -------------------------------------------------------------

export const GetUser = createParamDecorator((data: keyof IJWT, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!data) return request.user;

  return request.user[data];
});
