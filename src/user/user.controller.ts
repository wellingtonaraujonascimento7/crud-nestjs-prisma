import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createUserSchema } from './dto/create-user.schema';
import { updateUserSchema } from './dto/update-user.schema';
import type { CreateUserDto } from './dto/create-user.schema';
import type { UpdateUserDto } from './dto/update-user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    @UsePipes(new ZodValidationPipe(createUserSchema))
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(new ZodValidationPipe(updateUserSchema))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
