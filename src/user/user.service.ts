import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.schema';
import { UpdateUserDto } from './dto/update-user.schema';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { userSelectConstant } from './constants/user-select.constant';
import { ResponseUserDto } from './dto/reponse-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
        const { password, ...rest } = createUserDto;

        const passwordHash = await bcrypt.hash(password, 10);

        return await this.prisma.user.create({
            data: { ...rest, passwordHash },
            select: userSelectConstant,
        });
    }

    async findAll(): Promise<ResponseUserDto[]> {
        return await this.prisma.user.findMany({
            select: userSelectConstant,
        });
    }

    async findOne(id: number): Promise<ResponseUserDto> {
        return await this.prisma.user.findUniqueOrThrow({
            where: { id },
            select: userSelectConstant,
        });
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<ResponseUserDto> {
        const { password, ...rest } = updateUserDto;

        return await this.prisma.user.update({
            where: { id },
            data: {
                ...rest,
                ...(password && {
                    passwordHash: await bcrypt.hash(password, 10),
                }),
            },
            select: userSelectConstant,
        });
    }

    async remove(id: number): Promise<ResponseUserDto> {
        return await this.prisma.user.delete({
            where: { id },
            select: userSelectConstant,
        });
    }
}
