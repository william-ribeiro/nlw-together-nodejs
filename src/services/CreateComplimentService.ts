import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories,
    );
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new AppError('Incorrect User Receiver');
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);
    if (!userReceiverExists) {
      throw new AppError('User Receiver does not exists');
    }

    const compliment = complimentsRepositories.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
