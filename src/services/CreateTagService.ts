import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { TagsRepositories } from '../repositories/TagsRepositories';

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRequest) {
    const tagRepository = getCustomRepository(TagsRepositories);
    if (!name) {
      throw new AppError('Incorrect name');
    }

    const tagAlreadyExists = await tagRepository.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new AppError('Tag already exists!');
    }

    const tag = tagRepository.create({
      name,
    });
    await tagRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
