import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginUserDto } from './dto/login-user-dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { EntityNotFoundError, Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GoogleLoginDto } from './dto/google-login.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const fetchedUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if(fetchedUser) throw new ConflictException('User already exist')
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    const payload = { username: savedUser.username, id: savedUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async me(req: Request): Promise<{ message: string; user: any }> {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('No token found in cookies');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return {
        message: 'Profile fetched successfully',
        user: payload,
      };
    } catch (error) {
      throw new UnauthorizedException('Session expired or invalid token');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    try {
      const email = loginUserDto.email;
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });

      const isValidUser = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      console.log('Is Valid User', isValidUser);
      if (!isValidUser) {
        throw new UnauthorizedException('Invalid Credentials');
      }

      const payload = { username: user.username, id: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  
  async googleLogin (googleLoginDto :GoogleLoginDto) {
    let user = await this.userRepository.findOne({
      where: {
        email: googleLoginDto.email,
      },
    });

    if (!user) {
      const userData = this.userRepository.create({
      ...googleLoginDto,
      password: "Google Auth",
    });
      user = await this.userRepository.save(userData);
    }
    const payload = { username: user.username, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
