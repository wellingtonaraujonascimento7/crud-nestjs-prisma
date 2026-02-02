import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number => {
        const request = ctx.switchToHttp().getRequest<{ userId?: number }>();
        const userId = request.userId;

        if (!userId) {
            throw new UnauthorizedException('User ID not found in request');
        }

        return userId;
    },
);
