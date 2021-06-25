import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { AppError } from '../errors/AppError';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories);
    if (!email) {
      throw new AppError('Email incorrect');
    }

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });
    await userRepository.save(user);
    delete user.password;
    return user;
  }
}

export { CreateUserService };
