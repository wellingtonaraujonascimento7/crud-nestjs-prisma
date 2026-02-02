import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createUserSchema } from './dto/create-user.schema';
import { updateUserSchema } from './dto/update-user.schema';
import type { CreateUserDto } from './dto/create-user.schema';
import type { UpdateUserDto } from './dto/update-user.schema';
import { UserId } from 'src/auth/decorators/user-id.decorator';
import { ResponseUserDto } from './dto/reponse-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    create(
        @Body(new ZodValidationPipe(createUserSchema))
        createUserDto: CreateUserDto,
    ): Promise<ResponseUserDto> {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<ResponseUserDto[]> {
        return this.userService.findAll();
    }

    @Get('me')
    findOne(@UserId() userId: number): Promise<ResponseUserDto> {
        return this.userService.findOne(userId);
    }

    @Patch()
    update(
        @UserId() userId: number,
        @Body(new ZodValidationPipe(updateUserSchema))
        updateUserDto: UpdateUserDto,
    ): Promise<ResponseUserDto> {
        return this.userService.update(userId, updateUserDto);
    }

    @Delete()
    remove(@UserId() userId: number): Promise<ResponseUserDto> {
        return this.userService.remove(userId);
    }
}
