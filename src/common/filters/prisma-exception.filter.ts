import {
    Catch,
    ExceptionFilter,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError) {
        switch (exception.code) {
            case 'P2002':
                throw new ConflictException('User already exists');

            case 'P2025':
                throw new NotFoundException('User not found');

            // case 'P2003':
            //     throw new BadRequestException('Invalid relation');

            default:
                throw new BadRequestException('Database error');
        }
    }
}
