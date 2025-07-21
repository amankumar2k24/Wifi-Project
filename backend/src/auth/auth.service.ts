import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { MESSAGE } from '../config/messages';
import * as nodemailer from 'nodemailer';
import { JWT_SECRET } from '../constants';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.userModel.findOne({ where: { email: loginDto.email } });
        if (!user) throw new UnauthorizedException(MESSAGE.INVALID_CREDENTIALS);

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException(MESSAGE.INVALID_CREDENTIALS);

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            access_token: this.jwtService.sign(payload, { secret: JWT_SECRET }),
        };
    }

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.userModel.create({
            ...registerDto,
            password: hashedPassword,
            role: 'USER',
        });
        return { id: user.id, email: user.email, name: user.name, role: user.role };
    }

    async forgotPassword(email: string) {
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);

        const token = this.jwtService.sign({ sub: user.id }, { secret: JWT_SECRET, expiresIn: '1h' });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            text: `Click this link to reset your password: ${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`,
        });
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const payload = this.jwtService.verify(resetPasswordDto.token, { secret: JWT_SECRET });
        const user = await this.userModel.findByPk(payload.sub);
        if (!user) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);

        const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
        await user.update({ password: hashedPassword });
    }
}