import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { signInSchema } from './dto/signin.schema';
import type { SignInDto } from './dto/signin.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ZodValidationPipe(signInSchema))
    signIn(@Body() { email, password }: SignInDto) {
        return this.authService.signIn(email, password);
    }
}
