import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        email: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const pass = await bcrypt.compare(password, user?.passwordHash);
        if (!pass) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id };

        return { access_token: await this.jwtService.signAsync(payload) };
    }
}
