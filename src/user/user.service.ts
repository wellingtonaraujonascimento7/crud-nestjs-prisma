import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const { password, ...rest } = createUserDto;

        const passwordHash = await bcrypt.hash(password, 10);

        return await this.prisma.user.create({
            data: { ...rest, passwordHash },
        });
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const { password, ...rest } = updateUserDto;

        return await this.prisma.user.update({
            where: { id },
            data: {
                ...rest,
                ...(password && {
                    passwordHash: await bcrypt.hash(password, 10),
                }),
            },
        });
    }

    async remove(id: number) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
}
