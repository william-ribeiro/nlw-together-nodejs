import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new AppError('Email/Password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email/Password incorrect');
    }

    const token = sign(
      {
        email: user.email,
      },
      '827ccb0eea8a706c4c34a16891f84e7b',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return token;
  }
}

export { AuthenticateUserService };
