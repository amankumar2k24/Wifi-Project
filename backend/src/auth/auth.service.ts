import { Injectable, UnauthorizedException, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
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
import { Role, Status } from 'src/users/user.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        // console.log("email==>", email, password)
        try {
            const user = await this.userModel.findOne({ where: { email: email } });

            if (!user) {
                console.error("User not found");
                throw new UnauthorizedException(MESSAGE.INVALID_CREDENTIALS);
            }

            console.log("Fetched user:", user.toJSON());
            console.log("user.password (actual type):", typeof user.password);
            console.log("user.password (value):", user.password);

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.error("Invalid password");
                throw new UnauthorizedException(MESSAGE.INVALID_CREDENTIALS);
            }

            const payload = { sub: user.id, email: user.email, role: user.role };
            const access_token = this.jwtService.sign(payload, { secret: JWT_SECRET });

            return {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
                access_token,
            };

        } catch (err) {
            console.error("Login error:", err);
            throw new InternalServerErrorException('Login failed');
        }
    }

    async register(registerDto: RegisterDto) {
        try {
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const user = await this.userModel.create({
                email: registerDto.email,
                name: registerDto.name,
                password: hashedPassword,
                role: registerDto.role || Role.USER,
                status: Status.ACTIVE,
            } as any);

            const { id, email, name, role } = user.get({ plain: true });
            return { id, email, name, role };
        } catch (error) {
            console.error("Register error:", error)
            throw new InternalServerErrorException('Register failed');
        }
    }

    async forgotPassword(email: string) {
        try {
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

            return {
                message: `Password reset link sent to your email ${email}`,
            }
        } catch (error) {
            console.error("Forgot password error:", error)
            throw new InternalServerErrorException('Forgot password failed');
        }
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        try {
            const payload = this.jwtService.verify(resetPasswordDto.token, { secret: JWT_SECRET });
            const user = await this.userModel.findByPk(payload.sub);
            if (!user) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);
    
            const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
            await user.update({ password: hashedPassword });

            return {
                message: 'Password reset successfully',
            }
        } catch (error) {
            console.error("Reset password error:", error)
            throw new InternalServerErrorException('Reset password failed');
        }
    }
}